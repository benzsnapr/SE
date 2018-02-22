import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BootstrapTable, TableHeaderColumn ,SearchField } from 'react-bootstrap-table';
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import BookReservation from './BookReservation'
import Examresource from './Examresource'
import Bookstore from './Bookstore'
import Extended_TimeBook from  './Extended_TimeBook'
import ComReservationUI from './ComReservationUI'
import InterLibrary_Loan from './InterLibrary_Loan'

class SelectRoomPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms:[],
      roomSchedules:[],
      room_name:null,
      memberID:0,
      memberlength:null,
      Username: props.Username,
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>จองห้องค้นคว้า
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

  /////
  componentDidMount() {
    client({method: 'GET', path: '/api/rooms'}).done(response => {
      this.setState({rooms: response.entity._embedded.rooms});
    });
    client({method: 'GET', path: '/api/members'}).done(response => {
      this.setState({members: response.entity._embedded.members});
      this.setState({memberlength: response.entity._embedded.members.length});
    });
  }

  handleClickSelectedRoom(row) {
    var i=0;
    var j=0;
    for(i=0 ; i<this.state.memberlength ; i++){
      if(this.state.members[i].user.username === this.state.Username ){
        this.state.memberID = i+1;
        break;
      }else{
        j++;
        if(j>0 && i=== this.state.memberlength-1){
          j = 0;
        }
      }
    }
    this.state.room_name = row.name
    this.props.navigator.pushPage({ component: SelectTimePage, props: { 
      key: 'SelectTimePage',
      room_name: this.state.room_name,
      memberID: this.state.memberID
    } });
  }
  handleClickPrintReservation(){
    this.props.navigator.pushPage({ component: PrintReservation, 
      props: { key: 'PrintReservation'
      } });
  }

  renderRow(row, index) {
    var NameTest = row.name;
    if(NameTest.match(/(\bS\S+\b)/ig)){
    return(
      <Ons.ListItem 
        key={row._links.self.href}
        data={row}
        renderButton={this.renderButton(row, index)}
        >
        <div className='left' >
          <ons-icon icon="ion-ios-person" size="25px"/>&nbsp;&nbsp;
          {index+1} &nbsp;&nbsp;
        </div>
        <div className="center">
          ห้องค้นคว้าเดี่ยว : {row.name} 
        </div>
        <div className="right">
          {this.renderButton(row, index)}
        </div>
      </Ons.ListItem>
    )
  }
  }
  
  renderRowG(row, index) {
    var NameTest = row.name;
    if(NameTest.match(/(\bG\S+\b)/ig)){
    return(
      <Ons.ListItem 
        key={row._links.self.href}
        data={row}
        renderButton={this.renderButton(row, index)}
        >
        <div className='left' >
          <ons-icon icon="ion-ios-people" size="25px"/>&nbsp;&nbsp;
          {index+1} &nbsp;&nbsp;
        </div>
        <div className="center">
          ห้องค้นคว้ากลุ่ม : {row.name}
        </div>
        <div className="right">
          {this.renderButton(row, index)}
        </div>
      </Ons.ListItem>
    )
  }
  }

  renderButton(row, index){
    return (
      <div>
        <Ons.Button onClick={this.handleClickSelectedRoom.bind(this,row)}> จอง </Ons.Button>
      </div>
    )
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
            <Ons.Button style={{backgroundColor: '#cccccc'}}>
            <ons-icon icon="ion-arrow-right-b" style={{color: '#f16794'}}/>&nbsp;จองห้องค้นคว้า </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickComReservationUI.bind(this)} style={{backgroundColor: '#399dd9'}} >  
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;จองเครื่องดูวิดีโอ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickInterLibrary_Loan.bind(this)} style={{backgroundColor: '#7eb74b'}}> 
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ยืมระหว่างห้องสมุด </Ons.Button>
          </p>

          <hr />
          <div style={{ textAlign: 'right' , paddingBottom:'15px'}}>
            <Ons.Button onClick={this.handleClickPrintReservation.bind(this)} style={{backgroundColor: '#ff5050'}}>
              <Ons.Icon icon='ion-clipboard' size="25px"/>&nbsp;&nbsp;แสดงรายการจองห้องค้นคว้า</Ons.Button>
          </div>
          <div style={{textAlign:'center', color:'red'}}>
            <b>สมาชิกสามารถจองห้องค้นคว้าได้สูงสุด 3 ชั่วโมง/วัน</b>
          </div>
          <center>
          <Ons.List
            style={{width: '700px'}}
            dataSource={this.state.rooms}
            renderRow={this.renderRow.bind(this)}
            //renderStatus={this.renderStatus}
            renderButton={this.renderButton}
            renderHeader={() => <Ons.ListHeader>ห้องค้นคว้าเดี่ยว</Ons.ListHeader>}
            />
            <br />
            <Ons.List
            style={{width: '700px'}}
            dataSource={this.state.rooms}
            renderRow={this.renderRowG.bind(this)}
            //renderStatus={this.renderStatus}
            renderButton={this.renderButton}
            renderHeader={() => <Ons.ListHeader>ห้องค้นคว้ากลุ่ม</Ons.ListHeader>}
            />
          </center>

        </div>
      </Ons.Page>
    );
  }
}

class SelectTimePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomSchedules:[],
      members:[],
      room_name: props.room_name,
      dialogShown: false,
      dialogShown2: false,
      Username: props.Username,
      UserId:'',
      memberID: props.memberID,
      count:props.count,
      selectTimeShow:''
    };
    this.handleClickSelectedTime = this.handleClickSelectedTime.bind(this);
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>จองห้องค้นคว้า
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

  componentDidMount() {
    client({method: 'GET', path: '/api/roomSchedules'}).done(response => {
      this.setState({roomSchedules: response.entity._embedded.roomSchedules});
    });
    fetch('http://localhost:8080/api/roomReservations/search/countByMemberId?'+
      'countM=' + this.state.memberID)
        .then((response)=> response.json()).then((responseJson) => {
          this.setState({count : responseJson});
    })
  }

  showDialog() {
    this.setState({dialogShown: true}); 
  }
  showDialog2() {
    this.setState({dialogShown2: true});
  }

  hideDialog() {
    this.setState({dialogShown: false});
    this.props.navigator.popPage({ animation: 'fade' })
  }
  hideDialog2() {
    this.setState({dialogShown2: false});
  }


  handleClickSelectedTime(row, index, Username, dialogShown,dialogShown2, count, selectTimeShow) {
    if( count < 3 ){
      var that = this;
      return function () {
        client({method: 'GET', path: '/timeSlot/'+index+'/member/'+Username}).done(
          function() {
            that.setState({ //the error happens here
              dialogShown: true
            });
            that.setState({ //the error happens here
              selectTimeShow: row.timeSlot
            });
          }
        )
      }
    }else{
      var that = this;
      return function () {
        that.setState({ //the error happens here
          dialogShown2: true
        });
      }
    }
  }

  renderStatus(row, index){
    if(row.roomStatus.status == 'Ready'){
      return (
        <div style={{ color: 'green' }}>
          <Ons.Icon icon='ion-ios-unlocked' /> &nbsp;&nbsp;ห้องว่าง
        </div>
      )
    }else if(row.roomStatus.status == 'Hold'){
      return (
        <div style={{ color: 'red'}} >
          <Ons.Icon icon='ion-ios-locked' /> &nbsp;&nbsp;ห้องไม่ว่าง
        </div>
      )
    }else if(row.roomStatus.status == 'Time_out'){
      return (
        <div style={{ color: 'gray'  }}>
          <Ons.Icon icon='ion-android-alert' /> &nbsp;&nbsp;หมดเวลา
        </div>
      )
    }
  }

  renderRow(row, index) {
    var TimeShow = '';
    if(row.timeSlot == 0){        TimeShow = '08.30-09.30'
    }else if(row.timeSlot == 1){  TimeShow = '09.30-10.30'
    }else if(row.timeSlot == 2){  TimeShow = '10.30-11.30'
    }else if(row.timeSlot == 3){  TimeShow = '11.30-12.30'
    }else if(row.timeSlot == 4){  TimeShow = '12.30-13.30'
    }else if(row.timeSlot == 5){  TimeShow = '13.30-14.30'
    }else if(row.timeSlot == 6){  TimeShow = '14.30-15.30'
    }else if(row.timeSlot == 7){  TimeShow = '15.30-16.30'
    }else if(row.timeSlot == 8){  TimeShow = '16.30-17.30'
    }else{                        TimeShow = 'ทดสอบระบบ'  }
    if(this.state.room_name === row.room.name){
      return(
        <Ons.ListItem 
          key={row._links.self.href}
          data={row}
          renderStatus={this.renderStatus(row, index)}
          renderButton={this.renderButton(row, index)}
          >
          <div className='left' >
            <Ons.Icon icon='ion-ios-time'/>&nbsp;&nbsp; เวลา {TimeShow}
          </div>
          <div className="center">
            {this.renderStatus(row, index)}
          </div>
          <div className="right">
            {this.renderButton(row, index)}
          </div>
        </Ons.ListItem>
      )
    }
  }

  renderButton(row, index){
    if(row.roomStatus.status === 'Ready'){
      return (
        <div>
          <Ons.Button onClick={this.handleClickSelectedTime(row, index, this.state.Username, this.state.dialogShown, this.state.dialogShown2, this.state.count, this.state.selectTimeShow)}> จอง </Ons.Button>
        </div>
      )
    }
  }

  render() {
    var TimeShowPop='';
    if(this.state.selectTimeShow == 0){        TimeShowPop = '08.30-09.30'
    }else if(this.state.selectTimeShow == 1){  TimeShowPop = '09.30-10.30'
    }else if(this.state.selectTimeShow == 2){  TimeShowPop = '10.30-11.30'
    }else if(this.state.selectTimeShow == 3){  TimeShowPop = '11.30-12.30'
    }else if(this.state.selectTimeShow == 4){  TimeShowPop = '12.30-13.30'
    }else if(this.state.selectTimeShow == 5){  TimeShowPop = '13.30-14.30'
    }else if(this.state.selectTimeShow == 6){  TimeShowPop = '14.30-15.30'
    }else if(this.state.selectTimeShow == 7){  TimeShowPop = '15.30-16.30'
    }else if(this.state.selectTimeShow == 8){  TimeShowPop = '16.30-17.30'
    }else{                                     TimeShowPop = 'ทดสอบระบบ'  }
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}> 
        <p style={{ textAlign: 'center' }}> ห้อง : {this.state.room_name} </p>
        <center>
        <Ons.List
          style={{width: '700px'}}
          dataSource={this.state.roomSchedules}
          renderRow={this.renderRow.bind(this)}
          renderStatus={this.renderStatus}
          renderButton={this.renderButton}
          renderHeader={() => <Ons.ListHeader>เลือกเวลาที่ต้องการจอง</Ons.ListHeader>}
          />
        </center>
        <Ons.Dialog
          isOpen={this.state.dialogShown}
          >
          <div style={{textAlign: 'center', margin: '20px'}}>
            <p>บันทึกการจองห้อง {this.state.room_name} เวลา {TimeShowPop}</p>
            <Ons.Button onClick={this.hideDialog.bind(this)}>ตกลง</Ons.Button>
          </div>
        </Ons.Dialog>
        <Ons.Dialog
          isOpen={this.state.dialogShown2}
          >
          <div style={{textAlign: 'center', margin: '20px'}}>
            <p>ไม่สามารถจองห้องค้นคว้าได้ สมาชิกสามารถจองห้องค้นคว้าได้สูงสุด 3 ชั่วโมง/วัน</p>
            <Ons.Button onClick={this.hideDialog2.bind(this)}>ตกลง</Ons.Button>
          </div>
        </Ons.Dialog>
      </div>
      </Ons.Page>	
    )
  }
}

class PrintReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomReservations:[],
      CheckName: this.props.Username,
      memberFirstName: '',
      memberLastName:''
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>แสดงรายการ จองห้องค้นคว้า
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

  componentDidMount() {
    client({method: 'GET', path: '/api/roomReservations'}).done(response => {
      this.setState({roomReservations: response.entity._embedded.roomReservations});
      this.setState({memberFirstName: response.entity._embedded.roomReservations[this.state.roomReservations.length-1]._embedded.member.firstName});
      this.setState({memberLastName: response.entity._embedded.roomReservations[this.state.roomReservations.length-1]._embedded.member.lastName});    
    });
  }

  indexN(cell, row, enumObject, index) {
    return ( index+1 ) 
  }
  convertReserveD(cell, row, enumObject, index) {
    return (
      <div>
        {new Date(row.reserveDate).getDate()}/ 
        {new Date(row.reserveDate).getMonth()+1}/ 
        {new Date(row.reserveDate).getFullYear()}
      </div>
    )
  }
  findRoomName(cell, row, enumObject, rowIndex) {
    return ( row._embedded.roomSchedule.room.name )
  }
  findTimeSlot(cell, row, enumObject, rowIndex) {
    var TimeShow = '';
    if(row._embedded.roomSchedule.timeSlot == 0){        TimeShow = '08.30-09.30'
    }else if(row._embedded.roomSchedule.timeSlot == 1){  TimeShow = '09.30-10.30'
    }else if(row._embedded.roomSchedule.timeSlot == 2){  TimeShow = '10.30-11.30'
    }else if(row._embedded.roomSchedule.timeSlot == 3){  TimeShow = '11.30-12.30'
    }else if(row._embedded.roomSchedule.timeSlot == 4){  TimeShow = '12.30-13.30'
    }else if(row._embedded.roomSchedule.timeSlot == 5){  TimeShow = '13.30-14.30'
    }else if(row._embedded.roomSchedule.timeSlot == 6){  TimeShow = '14.30-15.30'
    }else if(row._embedded.roomSchedule.timeSlot == 7){  TimeShow = '15.30-16.30'
    }else if(row._embedded.roomSchedule.timeSlot == 8){  TimeShow = '16.30-17.30'
    }else{                                               TimeShow = 'ทดสอบระบบ'  }
    return ( TimeShow )
  }
  findReserver(cell, row, enumObject) {
    return row._embedded.member.user.username;
  }

  render() {
    var temp = this.props.username;
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}> 
      <p>รายการจองห้องค้นคว้าของ : <b>{this.state.memberFirstName}  {this.state.memberLastName}</b></p> 

        <BootstrapTable data={ this.state.roomReservations }>
          <TableHeaderColumn isKey dataField="any" width='50' 
            dataAlign="center" dataAlign="center" headerAlign='center' 
            dataFormat={this.indexN.bind(this)}>ที่</TableHeaderColumn>
          <TableHeaderColumn dataField='reserveDate' width='140' headerAlign='center' 
            dataAlign="center"
            dataFormat={this.convertReserveD.bind(this)} >วันที่ทำการจอง</TableHeaderColumn>
          <TableHeaderColumn 
            dataField='findRoomName' 
            width='250'
            headerAlign='center' dataAlign="center"
            dataFormat={this.findRoomName.bind(this)} >
            ห้อง</TableHeaderColumn>
          <TableHeaderColumn 
            dataField='findTimeSlot' 
            width='250'
            headerAlign='center' dataAlign="center"
            dataFormat={this.findTimeSlot.bind(this)} >
            เวลา</TableHeaderColumn>
          <TableHeaderColumn 
            dataField='temp' 
            width='250'
            hidden={true} headerAlign='center'  
            filterFormatted
            dataFormat={this.findReserver.bind(this)} 
            filter={ { type: 'TextFilter', options: temp ,defaultValue: this.state.CheckName}}
            >ผู้ยืม </TableHeaderColumn>

        </BootstrapTable>
      </div>
      </Ons.Page>	
    )
  }
}


class RoomReservation extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: SelectRoomPage, props: { key: 'SelectRoomPage'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default RoomReservation