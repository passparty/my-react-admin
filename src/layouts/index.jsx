/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Party
 * @Date: 2019-11-18 17:44:50
 * @LastEditors: Party
 * @LastEditTime: 2019-12-12 17:55:45
 */
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import React from 'react';
import { Logged, Login } from './layout';

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  getToken = () => {
    return window.localStorage.getItem('token')
  }

  render() {
    const Container = (this.getToken() && window.location.pathname.indexOf('/login') === -1) ? Logged : Login;
    // console.log(window.location.pathname, this.props)
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export default withRouter(connect()(BasicLayout));
