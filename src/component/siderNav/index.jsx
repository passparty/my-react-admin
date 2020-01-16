import React, { Component } from 'react';
import Link from 'umi/link';
import withRouter from 'umi/withRouter'
import { Icon, Menu } from 'antd';
import './style.less';

const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '基本',
    icon: 'laptop',
    key: '/laptop',
    subs: [
      { key: '/laptop/list', title: '列表', icon: 'desktop', },
      { key: '/laptop/gobang', title: '五子棋', icon: 'user', },
    ]
  },
  {
    title: '组件',
    icon: 'edit',
    key: '/edit',
    subs: [
      {
        key: '/edit/form',
        title: '表单',
        icon: '',
        subs: [
          { key: '/edit/form/adminform', title: '基础表单', icon: '' },
          { key: '/edit/form/stepform', title: '分步表单', icon: '' }
        ]
      },
      { key: '/edit/admin', title: '上传', icon: '' },
    ]
  },
  // {
  //   title: '显示组件',
  //   icon: 'desktop',
  //   key: '/4',
  //   subs: [
  //     { key: '/home/display/carousel', title: '轮播图', icon: '' },
  //     { key: '/home/display/collapse', title: '折叠面板', icon: '' },
  //     { key: '/home/display/list', title: '列表', icon: '' },
  //     { key: '/home/display/table', title: '表格', icon: '' },
  //     { key: '/home/display/tabs', title: '标签页', icon: '', },
  //   ]
  // },
  // {
  //   title: '反馈组件',
  //   icon: 'message',
  //   key: '/home/feedback',
  //   subs: [
  //     { key: '/home/feedback/modal', title: '对话框', icon: '', },
  //     { key: '/home/feedback/notification', title: '通知提醒框', icon: '' },
  //     { key: '/home/feedback/spin', title: '加载中', icon: '', }
  //   ]
  // },
  // {
  //   title: '其它',
  //   icon: 'bulb',
  //   key: '/home/other',
  //   subs: [
  //     { key: '/home/other/animation', title: '动画', icon: '', },
  //     { key: '/home/other/gallery', title: '画廊', icon: '', },
  //     { key: '/home/other/draft', title: '富文本', icon: '' },
  //     { key: '/home/other/chart', title: '图表', icon: '' },
  //     { key: '/home/other/loading', title: '加载动画', icon: '' },
  //     { key: '/home/other/404', title: '404', icon: '' },
  //     { key: '/home/other/springText', title: '弹性文字', icon: '' },
  //   ]
  // },
  {
    title: '关于',
    icon: 'info-circle-o',
    key: '/admin'
  }
]

@withRouter
class SiderNav extends Component {

  renderMenuItem = ({ key, icon, title, }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({ key, icon, title, subs }) => {
    return (
      <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
        {
          subs && subs.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
          })
        }
      </Menu.SubMenu>
    )
  }

  render() {
    return (
      <div className="sider-container" >
        <div className={`logo ${this.props.collapsed?"imageMin":"image"}`}/>
        <Menu
          onOpenChange={this.props.onOpenChange}
          onClick={this.props.onClick}
          openKeys={this.props.openKeys}
          selectedKeys={this.props.selectedKeys}
          theme={this.props.theme ? this.props.theme : 'dark'}
          mode='inline'>
          {
            menus && menus.map(item => {
              return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
            })
          }
        </Menu>
      </div>
    );
  }
}
export default SiderNav


