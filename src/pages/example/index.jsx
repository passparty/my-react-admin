import React, { Component } from 'react';
import './style.less';
import { Card, Button } from 'antd';
import { connect } from 'dva';
import CustomBreadcrumb from '../compontent/customBreadcrumb'

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
  const cardList = state[namespace].data;
  return {
    cardList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd: (newCard) => {
      const action = {
        type: `${namespace}/addNewCard`,
        payload: newCard,
      };
      dispatch(action);
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)

class Exa extends Component {
  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['列表']} />
        <div className="container">
          {
            this.props.cardList.map(card => {
              return (
                <Card key={card.id}>
                  <div>Q: {card.setup}</div>
                  <div>
                    <strong>A: {card.punchline}</strong>
                  </div>
                </Card>
              );
            })
          }
          <div>
            <Button onClick={() => this.props.onClickAdd({
              setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              punchline: 'here we use dva',
            })}> 添加卡片 </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Exa
