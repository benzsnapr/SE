import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import BookReservation from './BookReservation'
import Examresource from './Examresource'
import Bookstore from './Bookstore'
import Extended_TimeBook from  './Extended_TimeBook'
import RoomReservation from './RoomReservation'
import ComReservationUI from './ComReservationUI'
import InterLibrary_Loan from './InterLibrary_Loan'

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
  handleClickBookReservation(){
    this.props.navigator.pushPage({ component: BookReservation, 
      props: { key: 'BookReservation' , Username:this.state.Username
      } });
  }
  handleClickExamresource(){
    this.props.navigator.pushPage({ component: Examresource, 
      props: { key: 'Examresource' , Username:this.state.Username
      } });
  }
  handleClickBookstore(){
    this.props.navigator.pushPage({ component: Bookstore, 
      props: { key: 'Bookstore' , Username:this.state.Username
      } });
  }
  //Sprint2
  handleClickExtended_TimeBook(){
    this.props.navigator.pushPage({ component: Extended_TimeBook, 
      props: { key: 'Extended_TimeBook' , Username:this.state.Username
      } });
  }
  handleClickRoomReservation(){
    this.props.navigator.pushPage({ component: RoomReservation, 
      props: { key: 'RoomReservation' , Username:this.state.Username
      } });
  }
  handleClickComReservationUI(){
    this.props.navigator.pushPage({ component: ComReservationUI, 
      props: { key: 'ComReservationUI' , Username:this.state.Username
      } });
  }
  handleClickInterLibrary_Loan(){
    this.props.navigator.pushPage({ component: InterLibrary_Loan, 
      props: { key: 'InterLibrary_Loan' , Username:this.state.Username
      } });
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}> 
          <p>
            <Ons.Button onClick={this.handleClickBookReservation.bind(this)} style={{backgroundColor: '#f16794'}} > 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จองหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickExamresource.bind(this)} style={{backgroundColor: '#7eb74b'}} > 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;คลังข้อสอบ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickBookstore.bind(this)} style={{backgroundColor: '#f7ac33'}} > 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จำหน่ายหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickExtended_TimeBook.bind(this)} style={{backgroundColor: '#f7ac33'}}> 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ขยายเวลาคืนหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickRoomReservation.bind(this)} style={{backgroundColor: '#f16794'}}> 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จองห้องค้นคว้า </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickComReservationUI.bind(this)} style={{backgroundColor: '#399dd9'}} >  
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จองเครื่องดูวิดีโอ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickInterLibrary_Loan.bind(this)} style={{backgroundColor: '#7eb74b'}}> 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ยืมระหว่างห้องสมุด </Ons.Button>
          </p>
          
          <hr />

          


        </div>
      </Ons.Page>
    );
  }
}

class Menu extends React.Component {
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

export default Menu