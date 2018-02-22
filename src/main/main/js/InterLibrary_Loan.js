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
import RoomReservation from './RoomReservation'
import ComReservationUI from './ComReservationUI'

class InterLibrary_LoanPage1 extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      user: this.props.Username,
     Sbook : '',
     name :null,
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>ยืมระหว่างห้องสมุด
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

   pushPage() {
     fetch('http://localhost:8080/api/otherBooks/search/findByName?'+
     'name=' + this.state.Sbook)
     .then((response)=> response.json()).then((responseJson) => {
        console.log(responseJson)
          ons.notification.alert("Found "+this.state.Sbook );
          this.props.navigator.pushPage({ component: InterLibrary_LoanPage2, 
            props: { key: 'InterLibrary_LoanPage2',
            Sbook : this.state.Sbook,
            user : this.state.user
          } });
        
      }).catch((error) => {
        ons.notification.alert("Not found "+this.state.Sbook);
      });
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/otherBooks'}).done(response => {
      this.setState({name: response.entity._embedded.otherBooks});
    });
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
            <Ons.Button style={{backgroundColor: '#cccccc'}}>
            <ons-icon icon="ion-arrow-right-b" style={{color: '#7eb74b'}}/>&nbsp;ยืมระหว่างห้องสมุด </Ons.Button>
          </p>

          <hr />
          <center>
            <Ons.Card style={{width: '400px', backgroundColor: '#33cc33'}}>
           <h2>Home</h2>
           <Ons.Card style={{ backgroundColor: '#d6f5d6'}}>
        <div style={{ textAlign: 'center' }}>
          <br />
           <p>
            <Ons.SearchInput
              value={this.state.Sbook}
              onChange={evt => this.setState({Sbook: evt.target.value})}
              float
              placeholder='Search Here!' />
          </p>
           <div style={{ textAlign: 'rigth' }}>
          <Ons.Button onClick={this.pushPage.bind(this)}>
            Find!
          </Ons.Button>
          </div>
        </div>
        </Ons.Card>
         </Ons.Card>
       </center>
        <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
          Swipe left to open the menu!
        </p>

        </div>
       
      </Ons.Page>
    );
  }
}

class InterLibrary_LoanPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      otherbooks: [],
      image:"",
      Sbook:props.Sbook
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>{this.state.Sbook}</div>
       
      </Ons.Toolbar>
    );
  }

  showMenu() {
    this.props.showMenu();
  }

 
  componentDidMount() {
    client({method: 'GET', path: '/api/otherBooks'}).done(response => {
      this.setState({otherbooks: response.entity._embedded.otherBooks});
    });
  }
  handleClick(user,name,otherlibery){
      return function () {
      client({method: 'GET', path: '/user/'+user+'/name/'+name+'/otherlibery/'+otherlibery}).done(
          ons.notification.alert("ยื่นคำร้องสำเร็จ!")
      )}
    }
    
  

  BookDetail(cell, row, enumObject, rowIndex) {
    return (
      <div>
        <h2>{ row.name }</h2>
        <li>ผู้แต่ง : { row.author }</li>
        <li>ภาษา : { row.language }</li>
        <li>ห้องสมุดสาขา: { row._embedded.otherlibery.otherlibery }</li>
        
      </div>
    )
  }
   
  imageFormatter(cell, row){
    return "<img src='"+cell+" 'width='70%' height='70%'/>";
  }
    cellButton(cell, row, enumObject, rowIndex) {
    return ( 
      <Ons.Button 
        onClick={this.handleClick( this.state.user,row.name,row._embedded.otherlibery.otherlibery)}>
          คลิก
      </Ons.Button>
    );
  }
   indexN(cell, row, enumObject, index) {
    return ( index+1 ) 
  }
  pushPage(){
    this.props.navigator.pushPage({ component: InterLibrary_LoanPage3, 
            props: { key: 'InterLibrary_LoanPage3'      } });
}
  

  render() {
    const options = {
      defaultSearch: this.state.Sbook
    }
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <h2>Data of {this.state.Sbook} </h2>
        <Ons.Button style ={{textAlign: 'center', margin: '20px'}} 
        onClick={this.pushPage.bind(this)}>
          ดูประวัติยื่นคำร้องของยื่ม
       </Ons.Button>
          <BootstrapTable 
            data={ this.state.otherbooks} 
            search={ true } 
            options={options}
            //filter={{type: 'TextFilter', defaultValue:'Harry'}}
            searchPlaceholder='ค้นหาหนังสือ'
            >
            <TableHeaderColumn 
                dataField='id' 
                dataFormat={this.indexN.bind(this)} 
                dataAlign="center" headerAlign='center'
                width="45" 
                >ที่</TableHeaderColumn>

            <TableHeaderColumn 
                dataField="image" 
                dataFormat={this.imageFormatter} 
                dataAlign="center" headerAlign='center'
                width="140"
                >รูปภาพ</TableHeaderColumn>

            <TableHeaderColumn 
                dataField='bookdetail' 
                isKey={ true } 
                searchable={ false }
                dataFormat={this.BookDetail.bind(this)}
                headerAlign='center' 
                tdStyle={ { whiteSpace: 'normal' } }
                
                >รายละเอียด </TableHeaderColumn>

            <TableHeaderColumn 
                dataField='button' 
                dataFormat={this.cellButton.bind(this)} 
                dataAlign="center" headerAlign='center'
                width="150" 
                > ยื่นคำร้องของยืม </TableHeaderColumn>
            
            <TableHeaderColumn dataField='name' 
                hidden={true} >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='otherlibery' 
                hidden={true} >otherlibery</TableHeaderColumn>

              

            
          </BootstrapTable>
        <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
          Swipe left to open the menu!
        </p>
      </Ons.Page>
    );
  }
}

class InterLibrary_LoanPage3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    CheckName: this.props.Username,
    interlibery : []
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ยืมระหว่างห้องสมุด
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
    client({method: 'GET', path: '/api/interlibery_loans'}).done(response => {
      this.setState({interlibery: response.entity._embedded.interlibery_loans});
    });
  }
   
  indexN(cell, row, enumObject, index) {
    return ( index+1 ) 
  }
  convertReserveD(cell, row, enumObject, index) {
    return (
      <div>
        {new Date(row.date).getDate()}/ 
        {new Date(row.date).getMonth()+1}/ 
        {new Date(row.date).getFullYear()}
      </div>
    )
  }
   namebook(cell, row, enumObject, rowIndex) {
    return (row.name)
  }
  nameuser(cell, row, enumObject) {
    return (row._embedded.member.firstName);
  }
  liberyname(cell, row, enumObject) {
    return (row._embedded.otherlibery.otherlibery) ;
  }
  
  render() {
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

        <BootstrapTable data={ this.state.interlibery}>
          <TableHeaderColumn isKey dataField="any" width='50' 
            dataAlign="center" dataAlign="center" headerAlign='center' 
            dataFormat={this.indexN.bind(this)}>ลำดับที่</TableHeaderColumn>
            
            <TableHeaderColumn dataField='reserveDate' width='140' headerAlign='center' dataAlign="center"
            dataFormat={this.convertReserveD.bind(this)} >วันที่ทำการจอง</TableHeaderColumn>

            <TableHeaderColumn 
            dataField='namebook' 
            width='200'
            headerAlign='center' 
            dataFormat={this.namebook.bind(this)} >
            ชื่อหนังสือ</TableHeaderColumn>

            <TableHeaderColumn 
            dataField='nameuser' 
            width='200'
            headerAlign='center' 
            dataFormat={this.nameuser.bind(this)} >
            ชื่อผู้ยืม</TableHeaderColumn>

             <TableHeaderColumn 
            dataField='liberyname' 
            width='200'
            headerAlign='center' 
            dataFormat={this.liberyname.bind(this)} >
            ห้องสมุดในสาขา</TableHeaderColumn>
            
             
        
            </BootstrapTable>
      </Ons.Page>	
    )
  }
}



class InterLibrary_Loan extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: InterLibrary_LoanPage1, props: { key: 'InterLibrary_LoanPage1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default InterLibrary_Loan