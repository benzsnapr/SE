import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
import { BootstrapTable, TableHeaderColumn ,SearchField } from 'react-bootstrap-table';
import RegBook from './RegBook'
import BorrowBookUi from './BorrowBookUi'
import ManageMember from './ManageMember'
import E_Book from './E_Book'

class ReturnBookPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.Username,
      borrowbooks: [],
      dialogShown: false
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>คืนหนังสือ
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
  handleClickE_Book(){
    this.props.navigator.pushPage({ component: E_Book,
      props: { key: 'E_Book' , Username:this.state.Username
      } });
  }

  pushPage() {
    this.props.navigator.pushPage({ component: ReturnBookPage2, props: {
      key: 'ReturnBookPage2'
    } });
  }
  componentDidMount() {
      client({method: 'GET', path: '/api/borrowbooks'}).done(response => {
        this.setState({borrowbooks: response.entity._embedded.borrowbooks});
      });
    }
    showDialog() {
        this.setState({dialogShown: true});
    }

    hideDialog() {
        this.setState({dialogShown: false});
        client({method: 'GET', path: '/api/borrowbooks'}).done(response => {
            this.setState({borrowbooks: response.entity._embedded.borrowbooks});
        });
    }
    indexnum(cell,row,enumObject,index){
      return(<div>{index+1}</div>)
    }
  findcopyid(cell,row,enumObject, rowIndex){

      return(<div>{row._embedded.copy.id}</div>)
  }
  findbookname(cell,row,enumObject, rowIndex){

      return(<div>{row._embedded.copy.book.name}</div>)
  }
  findstatus(cell,row,enumObject, rowIndex){

      return(<div>{row._embedded.copy.status.status}</div>)
  }
  findborrowername(cell,row,enumObject, rowIndex){

      return(<div>{row._embedded.member.firstName} {row._embedded.member.lastName}</div>)
  }
  imageFormatter(cell, row){

      return "<img src='"+row._embedded.copy.book.image+"'/>";
  }
  convertStartD(cell, row, enumObject, index) {

    return (
      <div>
        {new Date(row.startDate).getDate()}/
        {new Date(row.startDate).getMonth()+1}/
        {new Date(row.startDate).getFullYear()}
      </div>
    )
  }
  convertEndD(cell, row, enumObject, index) {

    return (
      <div>
        {new Date(row.endDate).getDate()}/
        {new Date(row.endDate).getMonth()+1}/
        {new Date(row.endDate).getFullYear()}
      </div>
    )
  }
  cellButton(cell, row, enumObject, rowIndex) {

    return (
      <Ons.Button  onClick={this.handleClickSave(row._embedded.copy.id,this.state.user,row.endDate,row._embedded.copy.status.status,this.state.dialogShown)}>
            คืนหนังสือ
      </Ons.Button>
    );
  }
  handleClickSave(cid,user,endDate,status,dialogShown) {
        var that = this;
        return function () {
          client({method: 'GET', path: '/cid/'+cid+'/user/'+user}).done(
            function(){
              that.setState({dialogShown: true});
            }
          )}
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
            <Ons.Button style={{backgroundColor: '#cccccc'}}>
            <ons-icon icon="ion-arrow-right-b" style={{color: '#8769aa'}}/>&nbsp;คืนหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickE_Book.bind(this)} style={{backgroundColor: '#ce535a'}} >
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;เพิ่ม E-Book </Ons.Button>
          </p>

          <hr />

          <Ons.Card>

            <div className="content">
            <section style={{textAlign: 'center'}}>
            <p>
              <Ons.Icon style={{color: 'red'}} icon='ion-asterisk' /> หากคืนเกินกำหนดต้องเสียค่าปรับวันละ 5 บาท
            </p>
            <p>
              <Ons.Button onClick={this.pushPage.bind(this)}>ดูประวัติการคืน</Ons.Button>
            </p>

          <div style={{paddingTop:'20px',paddingLeft:'100px',paddingRight:'100px'}}>
          <BootstrapTable data={this.state.borrowbooks}>
          <TableHeaderColumn isKey dataField='any' dataAlign="center" width='50'
            dataFormat={this.indexnum.bind(this)}>ลำดับ</TableHeaderColumn>
            <TableHeaderColumn dataField='findcopyid' dataAlign="center" width='50'
              dataFormat={this.findcopyid.bind(this)}>CopyID</TableHeaderColumn>
            <TableHeaderColumn dataField="findbookname" headerAlign="center" width='180'
              dataFormat={this.findbookname.bind(this)}>ชื่อหนังสือ</TableHeaderColumn>

            <TableHeaderColumn
              dataField="image"
              dataFormat={this.imageFormatter}
              dataAlign="center" headerAlign='center'
              width="100"
              >รูปภาพ</TableHeaderColumn>
            <TableHeaderColumn dataField='findstatus' width='80' dataAlign="center" width='70'
              dataFormat={this.findstatus.bind(this)}>สถานะ</TableHeaderColumn>
            <TableHeaderColumn dataField='convertStartD' width='80' dataAlign="center" width='70'
              dataFormat={this.convertStartD.bind(this)}>วันที่ยืม</TableHeaderColumn>
            <TableHeaderColumn dataField='convertEndD' width='80' dataAlign="center" width='70'
              dataFormat={this.convertEndD.bind(this)}>กำหนดคืน</TableHeaderColumn>
            <TableHeaderColumn dataField="findborrowername" dataAlign="center" width='120'
              dataFormat={this.findborrowername.bind(this)}>ผู้ยืม</TableHeaderColumn>
            <TableHeaderColumn
              dataField='button'
              dataFormat={this.cellButton.bind(this)}
              dataAlign="center" headerAlign='center'
              width="100"
              >คืนหนังสือ</TableHeaderColumn>
            </BootstrapTable>
            </div>
          </section>
            </div>
          </Ons.Card>

          <Ons.Dialog
              isOpen={this.state.dialogShown}
          >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p>คืนเรียบร้อยแล้ว</p>
              <Ons.Button onClick={this.hideDialog.bind(this)}>ตกลง</Ons.Button>
            </div>
          </Ons.Dialog>

        </div>
      </Ons.Page>
    );
  }
}

class ReturnBookPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {returnBooks: []};
  }
  componentDidMount() {
   client({method: 'GET', path: '/api/returnBooks'}).done(response => {
      this.setState({returnBooks: response.entity._embedded.returnBooks});
   });
   }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ประวัติการคืนหนังสือ
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
  indexnum(cell,row,enumObject,index){
    return(<div>{index+1}</div>)
  }
  convertEndD(cell,row,enumObject,index){
    return(
      <div>
        {new Date(row.endDate).getDate()}/
        {new Date(row.endDate).getMonth()+1}/
        {new Date(row.endDate).getFullYear()}
      </div>
    )
  }
  convertReturnD(cell,row,enumObject,index){
    return(
      <div>
        {new Date(row.returnDate).getDate()}/
        {new Date(row.returnDate).getMonth()+1}/
        {new Date(row.returnDate).getFullYear()}
      </div>
    )
  }
  findcopyid(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.copy.id}</div>)
  }
  findbookname(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.copy.book.name}</div>)
  }
  findlibrarian(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.librarian.firstName}&nbsp; {row._embedded.librarian.lastName}</div>)
  }
  render() {
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{paddingTop:'20px',paddingLeft:'200px',paddingRight:'200px'}}>
      <BootstrapTable data={this.state.returnBooks} >
          <TableHeaderColumn isKey dataField='any' dataAlign="center" width='50'
            dataFormat={this.indexnum.bind(this)}>ลำดับ</TableHeaderColumn>
          <TableHeaderColumn dataField='findcopyid' dataAlign="center" width='50'
            dataFormat={this.findcopyid.bind(this)}>copyID</TableHeaderColumn>
          <TableHeaderColumn dataField="findbookname" headerAlign="center" width='180'
            dataFormat={this.findbookname.bind(this)}>ชื่อหนังสือ</TableHeaderColumn>
          <TableHeaderColumn dataField="endDate" dataAlign="center" width='60'
            dataFormat={this.convertEndD.bind(this)}>กำหนดคืน</TableHeaderColumn>
          <TableHeaderColumn dataField="returnDate" dataAlign="center" width='60'
            dataFormat={this.convertReturnD.bind(this)}>วันที่คืน</TableHeaderColumn>
          <TableHeaderColumn dataField="fine" dataAlign="center" width='80'>ค่าปรับ(บาท)</TableHeaderColumn>
          <TableHeaderColumn dataField="findlibrarian" dataAlign="center" width='150'
            dataFormat={this.findlibrarian.bind(this)}>บรรณารักษ์</TableHeaderColumn>
      </BootstrapTable>
      <br/><div><center>
        <img src={"https://png.icons8.com/color/528/000000/book-shelf.png"} style={{ width: '15%' }} />
      </center></div>
      </div>
      </Ons.Page>
    )
  }
}

class ReturnBook extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: ReturnBookPage1, props: { key: 'ReturnBookPage1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default ReturnBook
