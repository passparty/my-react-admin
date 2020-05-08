import React, { Component } from 'react';
import './style.less';

export default class extends Component {
  //Clock构造函数
  constructor(props) {
    super(props);
    this.state = {
      srcUrl: '',
      srcList: ['https://www.oschina.net/', 'https://pro.bfops.cn/zentao/my/', 'http://192.168.23.232/#/home', 'http://localhost:8080/#/userAnalysis?key=year_action'],
    };
  }
  //插入DOM前的回调函数
  componentDidMount() {
    this.getData()
  }
  //组件销毁前的回调
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  getData() {
    this.setState({ srcUrl: this.state.srcList[0] });
    let index = 1
    this.timerID = setInterval(() => {
      this.tick(index)
      index++
      if (index === this.state.srcList.length) index = 0
    }, 10000)
  }
  tick(index) {
    // console.log("tick", index, this.timerID)
    this.setState({ srcUrl: this.state.srcList[index] });
  }
  render() {
    return (
      <div>
        <iframe className="iframeCss" title="Inline Frame Example" src={this.state.srcUrl}>
        </iframe>
      </div>
    );
  }
}