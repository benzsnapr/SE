import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import BookReservation from './BookReservation'
import Bookstore from './Bookstore'
import Extended_TimeBook from  './Extended_TimeBook'
import RoomReservation from './RoomReservation'
import ComReservationUI from './ComReservationUI'
import InterLibrary_Loan from './InterLibrary_Loan'

class Exam1 extends React.Component {
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
        <div className='center'>คลังข้อสอบ
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

  pushPage(event) {
    this.props.navigator.pushPage({ component: Exam1_2, props: { key: 'Exam1_2',} });
  }
  pushPageadd(event) {
    this.props.navigator.pushPage({ component: Exam1_1, props: { key: 'Exam1_1', } });
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}>
         <p>
            <Ons.Button onClick={this.handleClickBookReservation.bind(this)} style={{backgroundColor: '#f16794'}} > 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จองหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button style={{backgroundColor: '#cccccc'}}> 
            <ons-icon icon="ion-arrow-right-b" style={{color: '#7eb74b'}}/>&nbsp;คลังข้อสอบ </Ons.Button>
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

          <Ons.Card>
          <h2>Choose</h2>
          	<div style={{ textAlign: 'center' }}>
            <img src={"http://p3.isanook.com/ca/0/ud/274/1370935/exam_pics.jpg"} alt="Onsen UI" style={{ width: '50%' }} />
            </div>
               <div style={{ textAlign: 'center' }}>
          <Ons.Button style={{margin: '6px'}} modifier='outline' onClick={this.pushPageadd.bind(this)}> Add ExamResousrce</Ons.Button>
          <Ons.Button style={{margin: '6px'}} modifier='outline' onClick={this.pushPage.bind(this)}>ExamResource</Ons.Button>
          </div>
          </Ons.Card>
          <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
            ExamResources!
          </p>

        </div>
      </Ons.Page>
    );
  }
}
class Exam1_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nametest: null,
      size:null,
      link:null,
      mid: this.props.Username,
      name:"error null check plz!"
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>Add ExamResources
        </div>
        <div className='right'>
          <ons-icon size="25px" icon="ion-person"/>&nbsp;
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
  pushPage() {
      this.props.navigator.popPage({ component: Exam1, props: { key: 'Exam1' } });
    }
    handleClickSave(nametest,size,mid,link) {
        return function () {
           if (nametest != null && size != null) {
            name = "Save!"
          } 
          client({method: 'GET', path: '/link/'+link+'/nametest/'+nametest+'/size/'+size+'/mid/'+mid}).done(
               ons.notification.alert(name)
          )}
     }
  render() {
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <h2>ExamResources</h2>
            <Ons.Card >
            <br/><br/>
              <div style={{ textAlign: 'center' ,
               margin: '0 auto',
               backgroundColor: '#CCCCCC',
               width: '50%'
             }}>
             <p>
               </p>
      
        <p>
          <Ons.Icon style={{color: 'blue'}} icon='ion-plus-circled' />&nbsp;&nbsp;
            <Ons.Input
          
            modifier="underbar"
            placeholder="https://www.dropbox.com/s/5a28dpey6bi5l6j/ add link"
            float
            onChange={evt => this.setState({ 	nametest: evt.target.value })} >
          </Ons.Input>
        </p>
         <p>
          <Ons.Icon style={{color: 'blue'}} icon='ion-plus-circled' />&nbsp;&nbsp;
          <Ons.Input
            modifier="underbar"
            placeholder="add size"
            float
            onChange={evt => this.setState({ 	size: evt.target.value })} >
          </Ons.Input>
          </p>
          <p>
           <Ons.Button onClick={this.handleClickSave(this.state.nametest,this.state.size,this.state.mid,this.state.link,this.state.name)}>save!  </Ons.Button>
          </p>
         </div>
         <br/><br/>
         </Ons.Card>
      <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
        ExamResources!
      </p>
      </Ons.Page>
    )
  }
}
class Exam1_2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {exam: []};
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>Test Story
        </div>
        <div className='right'>
          <ons-icon size="25px" icon="ion-person"/>&nbsp;
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
  componentDidMount() {
  client({method: 'GET', path: '/api/examResources'}).done(response => {
     this.setState({exam: response.entity._embedded.examResources});});
  }
  handleClick() {
    
  }
  render() {
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <Ons.Card>
       <div style={{ textAlign: 'center',
           margin: '0 auto',
           backgroundColor: '#CCCCCC' }}>
           <p>
             ExamResource
            </p>
           <div>
       <img src={"http://www.webythebrain.com/wp-content/uploads/2017/10/7-%E0%B9%81%E0%B8%99%E0%B8%A7%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%9APAT1.jpg"}
       alt="Onsen UI" style={{ width: '45%' }} />
        </div>
   </div>
       <Ons.ListTitle>Tests Story</Ons.ListTitle>
      <div>
      <Ons.List
        dataSource={this.state.exam}
        renderRow={this.renderRow}
        
        />
      </div>

      </Ons.Card>
      <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
        ExamResources!
      </p>
      </Ons.Page>
    )
  }
  renderRow(row, index) {
    return(
      <ons-list modifier="inset">
      <Ons.ListItem modifier="chevron" 
          key={row._links.self.href}
          data={row}
          >
          <div>
              <a href= {row.link} download> {row.nametest}</a> &nbsp; &nbsp; &nbsp;size &nbsp;:&nbsp;{row.size} MB &nbsp;&nbsp;member:&nbsp;
              {row._embedded.member.firstName}
         </div>
      </Ons.ListItem>
       </ons-list>
    )
  }
}
class Examresource extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: Exam1, props: { key: 'Exam1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default Examresource
