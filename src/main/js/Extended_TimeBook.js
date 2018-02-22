import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
import { BootstrapTable, TableHeaderColumn ,SearchField } from 'react-bootstrap-table';
import BookReservation from './BookReservation'
import Examresource from './Examresource'
import Bookstore from './Bookstore'
import RoomReservation from './RoomReservation'
import ComReservationUI from './ComReservationUI'
import InterLibrary_Loan from './InterLibrary_Loan'

class Extended_TimeBookPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        CheckName: this.props.Username,
        dialogShown: false,
        status:'บันทึกการขยายเวลายืมหนังสือ  สำเร็จ'
    };
    this.handleClickSave = this.handleClickSave.bind(this);
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>ขยายเวลาคืนหนังสือ
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

    showDialog() {
        this.setState({dialogShown: true});
    }

    hideDialog() {
        this.setState({dialogShown: false});
        client({method: 'GET', path: '/api/borrowbooks'}).done(response => {
            this.setState({borrowbooks: response.entity._embedded.borrowbooks});
        });
    }


    componentDidMount() {
        client({method: 'GET', path: '/api/borrowbooks'}).done(response => {
            this.setState({borrowbooks: response.entity._embedded.borrowbooks});
        });
    }

    indexnum(cell,row,enumObject,index){
        return(<div>{index+1}</div>)
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
    renderRow(index,row) {
            return(
                <Ons.ListItem
                    data={[3, 5, 7]}
                    tappable
                    onClick={this.handleClickSave(index,this.props.Username,row,this.state.dialogShown)}
                >
                  <div className="center">
                    <Ons.Icon icon='ion-ios-calendar-outline' /> &nbsp;&nbsp; {row} วัน
                  </div>
                </Ons.ListItem>
            )
        }
    selectDay(cell, row, enumObject, index) {
        console.log(row._embedded.copy.id);
        if(row._embedded.copy.status.status == 'Borrowed+Extend'){
            return (
                'ขยายเวลาไปแล้ว'
            );
        }else{
            return (
                <Ons.List
                    style={{width: '140px'}}
                    dataSource={[3, 5, 7]}
                    renderRow={this.renderRow.bind(this, row._embedded.copy.id)}
                />
            );
        }


    }
    findReserver(cell, row, enumObject) {
        return row._embedded.member.user.username;
    }

    handleClickSave(index,Username,day,dialogShown) {
      var that = this;
        return function () {
            client({method: 'GET', path: '/copy/'+index+'/user/'+Username+'/day/'+day}).done(
                function(){
                  that.setState({dialogShown: true});
                }
            )}
    }

  render() {
      var temp = this.props.username;
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
            <Ons.Button style={{backgroundColor: '#cccccc'}}>
            <ons-icon icon="ion-arrow-right-b" style={{color: '#f7ac33'}}/>&nbsp;ขยายเวลาคืนหนังสือ </Ons.Button>
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

          <div className="content">
            <section style={{textAlign: 'center'}}>

              <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}>
                <BootstrapTable data={this.state.borrowbooks}>
                  <TableHeaderColumn isKey dataField='any' dataAlign="center" width='50'
                                     dataFormat={this.indexnum.bind(this)}>ลำดับ</TableHeaderColumn>
                  <TableHeaderColumn dataField="findbookname" headerAlign="center" width='180'
                                     dataFormat={this.findbookname.bind(this)}>ชื่อหนังสือ</TableHeaderColumn>

                  <TableHeaderColumn
                      dataField="image"
                      dataFormat={this.imageFormatter}
                      dataAlign="center" headerAlign='center'
                      width="100"
                  >รูปภาพ</TableHeaderColumn>
                  <TableHeaderColumn dataField='findstatus' width='80' dataAlign="center" width='70' hidden={true}
                                     dataFormat={this.findstatus.bind(this)}>สถานะ</TableHeaderColumn>
                  <TableHeaderColumn dataField='convertStartD' width='80' dataAlign="center" width='70'
                                     dataFormat={this.convertStartD.bind(this)}>วันที่ยืม</TableHeaderColumn>
                  <TableHeaderColumn dataField='convertEndD' width='80' dataAlign="center" width='70'
                                     dataFormat={this.convertEndD.bind(this)}>กำหนดคืน</TableHeaderColumn>
                  <TableHeaderColumn dataField="findborrowername" dataAlign="center" width='100'
                                     dataFormat={this.findborrowername.bind(this)}>ผู้ยืม</TableHeaderColumn>
                  <TableHeaderColumn
                      dataField='button'
                      dataFormat={this.selectDay.bind(this)}
                      dataAlign="center" headerAlign='center'
                      width="120"
                  >เลือกจำนวนวันที่ต้องการ</TableHeaderColumn>
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
            </section>
          </div>

          <Ons.Dialog
              isOpen={this.state.dialogShown}
          >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p>{this.state.status}</p>
              <Ons.Button onClick={this.hideDialog.bind(this)}>ตกลง</Ons.Button>
            </div>
          </Ons.Dialog>



        </div>
      </Ons.Page>
    );
  }
}

class Extended_TimeBook extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: Extended_TimeBookPage1, props: { key: 'Extended_TimeBookPage1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default Extended_TimeBook