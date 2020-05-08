import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import './style.less';

import screenfull from 'screenfull'
// 
import { Layout, Icon, Dropdown, Menu, Modal } from 'antd';
const { Header } = Layout;

export default class extends Component {
  state = {
    icon: 'arrows-alt',
    visible: false,
    isLogin: window.localStorage.getItem('token') ? true : false,
    avatar: require('@/assets/img/defaultUser.jpg')
  }

  componentDidMount() {
    screenfull.onchange(() => {
      this.setState({
        icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
      })
    })
  }
  toggle = () => {
    console.log(222)
    this.props.onToggle()
  }
  screenfullToggle = () => {
    console.log(111, screenfull)
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }
  logout = () => {
    window.localStorage.removeItem('token')
    router.push('/home');
  }

  render() {
    //  
    const { visible, avatar, isLogin, icon } = this.state
    const notLogin = (
      <div>
        <Link to={{ pathname: '/home' }} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>请登录</Link>&nbsp;
      </div>
    )
    const menu = (
      <Menu className='menu'>
        <Menu.ItemGroup className='menu-group'>
          <Menu.Item onClick={() => router.push('/home')}>首页</Menu.Item>
          <Menu.Item onClick={() => router.push('/admin')}>设置</Menu.Item>
          <Menu.Item><span onClick={this.logout}>退出</span></Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    )
    const login = (
      <Dropdown overlay={menu}>
        <img onClick={() => this.setState({ visible: true })} src={avatar} alt="" />
      </Dropdown>
    )
    return (
      <Header className="header-container" >
        <span className='header-p'>后台管理系统</span>
        <div className='header-div'>
          <ul className='header-ul'>
            <li><Icon style={{ fontSize: '14px' }} type={icon} onClick={this.screenfullToggle} /></li>
            <li>
              {isLogin ? login : notLogin}
            </li>
          </ul>
        </div>
        <Modal
          footer={null} closable={false}
          visible={visible}
          wrapClassName="vertical-center-modal"
          onCancel={() => this.setState({ visible: false })}>
          <img src={avatar} alt="" width='100%' />
        </Modal>
      </Header>
    );
  }
}



