import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import RegBook from './RegBook'
import BorrowBookUi from './BorrowBookUi'
import ManageMember from './ManageMember'
import ReturnBook from './ReturnBook'
import E_Book from './E_Book'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>MENU
        </div>
        <div className='right'>
          <ons-icon size="25px"  icon="ion-person"/>&nbsp;
          {this.props.Username}
          &nbsp;
          <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)} >
            <ons-icon size="25px"  icon="ion-power"/>
          </Ons.Button>
          &nbsp;&nbsp;

        </div>
      </Ons.Toolbar>
    );
  }
  logOut() {
    window.location.reload()
  }
  //Sprint1
  handleClickRegBook(){
    this.props.navigator.pushPage({ component: RegBook,
      props: { key: 'RegBook' , Username:this.state.Username
      } });
  }
  handleClickBorrowBookUi(){
    this.props.navigator.pushPage({ component: BorrowBookUi,
      props: { key: 'BorrowBookUi' , Username:this.state.Username
      } });
  }
  handleClickManageMember(){
    this.props.navigator.pushPage({ component: ManageMember,
      props: { key: 'ManageMember' , Username:this.state.Username
      } });
  }
  //Sprint2
  handleClickReturnBook(){
    this.props.navigator.pushPage({ component: ReturnBook,
      props: { key: 'ReturnBook' , Username:this.state.Username
      } });
  }
  handleClickE_Book(){
    this.props.navigator.pushPage({ component: E_Book,
      props: { key: 'E_Book' , Username:this.state.Username
      } });
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}>
          <p>
            <Ons.Button onClick={this.handleClickRegBook.bind(this)} style={{backgroundColor: '#8769aa'}} >
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ลงทะเบียนหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickBorrowBookUi.bind(this)} style={{backgroundColor: '#399dd9'}} >
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ยืมหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickManageMember.bind(this)} style={{backgroundColor: '#ce535a'}} >
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จัดการสมาชิก </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickReturnBook.bind(this)} style={{backgroundColor: '#8769aa'}} >  
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;คืนหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickE_Book.bind(this)} style={{backgroundColor: '#ce535a'}} > 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;เพิ่ม E-Book </Ons.Button>
          </p>

          <hr />




        </div>
      </Ons.Page>
    );
  }
}

class MenuLib extends React.Component {
  constructor(props) {
    super(props);
    this.loadPage = this.loadPage.bind(this);
    this.state = {

    }
  }

  loadPage(page) {
    this.navigator.resetPage({ component: page, props: { key: page } }, { animation: 'fade' });
  }

  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.Username = this.props.Username;

    return React.createElement(route.component, route.props);
  }

  render() {
    return (
      <Ons.Navigator initialRoute={{ component: Home, props: { key: 'Home'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default MenuLib
