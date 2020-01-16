import React, { Component } from 'react';
import './style.less';
import { SiderNav, HeaderBar } from '../../../component';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter'

// import screenfull from 'screenfull'
// Badge,
const { Content, Footer, Sider } = Layout;
@withRouter
class index extends Component {
  state = {
    collapsed: false,
    openKeys: [],
    selectedKeys: []
  }

  toggle = () => {
    // console.log(this)  //状态提升后，到底是谁调用的它
    // console.log('1',this.state.collapsed)
    this.setState({
      collapsed: !this.state.collapsed,
      openKeys: [],
    })
    if (this.state.collapsed) {
      this.openKeysSelected()
    }
    // console.log('2',this.state.collapsed)
  }

  componentDidMount() {
    this.openKeysSelected()
  }

  // componentWillReceiveProps(nextProps) {
  //   //当点击面包屑导航时，侧边栏要同步响应
  //   const pathname = nextProps.location.pathname
  //   console.log('nextProps', pathname, this.props.location.pathname)
  //   if (this.props.location.pathname !== pathname) {
  //     this.setState({
  //       selectedKeys: [pathname],
  //     })
  //   }
  // }
  // componentDidUpdate(prevProps) {
  //   const pathname = prevProps.location.pathname
  //   console.log('componentDidUpdate', pathname, prevProps)

  //   if (prevProps.location.pathname !== this.props.location.pathname) {
  //     this.setState({
  //       selectedKeys: [pathname],
  //     })
  //   }
  // }
  openKeysSelected() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname
    //获取当前所在的目录层级
    const rank = pathname.split('/')
    switch (rank.length) {
      case 2:  //一级目录
        this.setState({
          selectedKeys: [pathname]
        })
        break;
      case 4: //三级目录，要展开两个subMenu
        this.setState({
          selectedKeys: [pathname],
          openKeys: [rank.slice(0, 2).join('/'), rank.slice(0, 3).join('/')]
        })
        break;
      default:
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
        })
    }
  }

  onOpenChange = (openKeys) => {
    // console.log('onOpenChange openKeys', openKeys)
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      return
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1]
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }

  onClick = (key) => {
    console.log('onClick', key.key)
    if (key.key) {
      this.setState({ selectedKeys: [key.key] })
    } else {
      this.setState({ selectedKeys: ['/home'] })
    }
  }

  render() {
    // console.log('onClick render()', this.state.selectedKeys)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible
          trigger={null}
          collapsed={this.state.collapsed}>
          <SiderNav collapsed={this.state.collapsed} selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys} onClick={this.onClick} onOpenChange={this.onOpenChange} />
        </Sider>
        <Layout>
          <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle} onClick={this.onClick}></HeaderBar>
          <Content className="content-container">
            <div onClick={this.onClick}>{this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>React admin ©2020 Created by Pass Party</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default index