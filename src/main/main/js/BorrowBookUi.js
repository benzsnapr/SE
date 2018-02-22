import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
import { BootstrapTable, TableHeaderColumn ,SearchField } from 'react-bootstrap-table';

import RegBook from './RegBook'
import ManageMember from './ManageMember'
import ReturnBook from './ReturnBook'
import E_Book from './E_Book'

//const products = [];
//var i = 0;
var products = [] ;

class BorrowBookPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: '1',
      user: '',
      copies: [],
      status: '',
      librarian: props.Username
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>ยืมหนังสือ
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
      client({method: 'GET', path: '/api/copies'}).done(response => {
        this.setState({copies: response.entity._embedded.copies});
      });
    }
  //Sprint1
  handleClickRegBook(){
    this.props.navigator.pushPage({ component: RegBook,
      props: { key: 'RegBook' , Username:this.state.Username
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

  pushPage() {
    this.props.navigator.pushPage({ component: BorrowBookPage2, props: { key: 'BorrowBookPage2' } });

  }
   pushPage2() {
      ons.notification.alert("หนังสือถูกยืมไปแล้ว");

    }

  handleClick2(book,user,librarian) {
        if(user == ''){
        return function (){
               ons.notification.alert('กรุณาใส่ member')
            }
        }else{
    return function (){
      client({method: 'GET', path: '/book/'+book+'/user/'+user+'/librarian/'+librarian}).done(
          ons.notification.alert('บันทึกการยิมเรียบร้อนแล้วครับ')
      )}
      }
   }


     indexN(cell, row, enumObject, index) {
         return (<div>{index+1}</div>)
       }
       findBookName(cell, row, enumObject, rowIndex) {
         return (
           <div>
             { row.book.name }
           </div>
         )
       }


           imageFormatter(cell, row){
             return "<img src='"+row.image+"'/>";
           }

           imageFormatter2(cell, row){
                        return <Ons.Button modifier='cta' onClick={this.pushPage.bind(this)}>ต่อไป</Ons.Button>;
            }
            cellButton(cell, row, enumObject, rowIndex) {
            if(row.ssst=='OnShelf'){
                return (
                  <Ons.Button
                    onClick={this.handleClick2(row.id,this.state.user,this.state.librarian)}>
                      ยืมหนังสือ
                  </Ons.Button>
                );
            }else{
                return (

                                  <Ons.Button
                                    onClick={this.pushPage2.bind(this)}>
                                      ยืมหนังสือ
                                  </Ons.Button>
                );
               }
              }

    addProducts(quantity) {
        products = [] ;

      const startId = products.length;
      for (var i = 0 ; i < quantity; i++) {
        const id = startId + i;
        products.push({
          id: i+1,
          ssst: this.state.copies[i].status.status,
          name:  this.state.copies[i].book.name,
          image: this.state.copies[i].book.image
        });
      }
      }



  showMenu() {
    this.props.showMenu();
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}>
          <p>
            <Ons.Button onClick={this.handleClickRegBook.bind(this)} style={{backgroundColor: '#8769aa'}} >
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ลงทะเบียนหนังสือ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button style={{backgroundColor: '#cccccc'}} >
            <ons-icon icon="ion-arrow-right-b" style={{color: '#399dd9'}}/>&nbsp;ยืมหนังสือ </Ons.Button>
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

          <Ons.Card>
          <section>
          <div style={{
            width: '25em',
            height: '20.5em',
            margin: '0 auto',
            backgroundColor: 'grey',
          }}>
           <img src={"https://i.pinimg.com/564x/0f/e8/40/0fe84054c9b17122c5dc706b2eade730.jpg"} alt="Onsen UI" style={{width: '100%',height: '20em'}} />
            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'  />
          </div>
            </section>

              <div className="content">
                <section style={{textAlign: 'center'}}>
          <div style={{color: '#3399CC'}} ><h3>BorrowBook</h3></div>
          <p>
                      <Ons.Icon style={{color: '#3399CC'}} icon='ion-person' />&nbsp;&nbsp;
                      <Ons.Input
                        modifier="underbar"
                        placeholder="ID - ผู้ยืม"
                        float
                        onChange={evt => this.setState({ user: evt.target.value })} >
                      </Ons.Input>
          </p>





            <Ons.Button modifier='cta' onClick={this.pushPage.bind(this)}>ดูประวัติการยืมหนังสือ</Ons.Button>

        {this.addProducts(this.state.copies.length)}


        <BootstrapTable data={ products } search >
        <TableHeaderColumn dataField='id' isKey={ true }>ลำดับที่</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>ชื่อหนังสือ</TableHeaderColumn>
        <TableHeaderColumn dataField='ssst'>สถานะหนังสือ</TableHeaderColumn>
        <TableHeaderColumn
                                    dataField="image"
                                    dataFormat={this.imageFormatter}
                                    dataAlign="center" headerAlign='center'
                                    width="140"
                                    >รูปภาพ</TableHeaderColumn>

                                                                       <TableHeaderColumn
                                                                       dataField='button'
                                                                       dataFormat={this.cellButton.bind(this)}
                                                                        dataAlign="center" headerAlign='center'
                                                                        width="140"
                                                                        >ยืมหนังสือ</TableHeaderColumn>
      </BootstrapTable>

        </section>

          </div>
        </Ons.Card>



        </div>
      </Ons.Page>
    );
  }
}



class BorrowBookPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowbooks:[],
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ยืมหนังสือ
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
      client({method: 'GET', path: '/api/borrowbookhistories'}).done(response => {
        this.setState({borrowbooks: response.entity._embedded.borrowbookhistories});
      });
    }

  indexN(cell, row, enumObject, index) {
    return (<div>{index+1}</div>)
  }
  findBookName(cell, row, enumObject, rowIndex) {
    return (
      <div>
        { row._embedded.copy.book.name }
      </div>
    )
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
  findBorrowerUser(cell, row, enumObject, rowIndex) {
    return (
      <div>
        { row._embedded.member.user.username }
      </div>
    )
  }
  findBorrowerName(cell, row, enumObject, rowIndex) {
    return (
      <div>
        { row._embedded.member.firstName }  { row._embedded.member.lastName }
      </div>
    )
  }
  findBorrowerlibrarian(cell, row, enumObject, rowIndex) {
      return (
        <div>
          { row._embedded.librarian.firstName }  { row._embedded.librarian.lastName }
        </div>
      )
    }
      imageFormatter(cell, row){
        return "<img src='"+row._embedded.copy.book.image+"'/>";
      }

  render() {
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

        <BootstrapTable data={ this.state.borrowbooks }  >
          <TableHeaderColumn isKey dataField="any" width='80'
            dataAlign="center" headerAlign="center"  dataFormat={this.indexN.bind(this)}>ลำดับที่</TableHeaderColumn>
          <TableHeaderColumn
            dataField='findBookName'
            width='250'
            dataFormat={this.findBookName.bind(this)} >
            ชื่อหนังสือ</TableHeaderColumn>
          <TableHeaderColumn dataField='startDate' width='140' dataFormat={this.convertStartD.bind(this)} >วันที่ยืมหนังสือ</TableHeaderColumn>
          <TableHeaderColumn dataField='endDate' width='140' dataFormat={this.convertEndD.bind(this)} >วันที่คืนหนังสือ</TableHeaderColumn>
          <TableHeaderColumn
            dataField='findBorrowerUser'
            width='150'
            dataFormat={this.findBorrowerUser.bind(this)}
            >รหัส ผู้ยืม</TableHeaderColumn>
          <TableHeaderColumn
            dataField='findBorrowerName'
            width='250'
            dataFormat={this.findBorrowerName.bind(this)}
            >ชื่อ ผู้ยืม</TableHeaderColumn>
            <TableHeaderColumn
                        dataField='findBorrowerlibrarian'
                        width='250'
                        dataFormat={this.findBorrowerlibrarian.bind(this)}
                        >บรรณารักษ์</TableHeaderColumn>
            <TableHeaderColumn
                            dataField="image"
                            dataFormat={this.imageFormatter}
                            dataAlign="center" headerAlign='center'
                            width="140"
                            >รูปภาพ</TableHeaderColumn>
        </BootstrapTable>
      </Ons.Page>
    )
  }
}

class BorrowBookUi extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: BorrowBookPage1, props: { key: 'BorrowBookPage1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default BorrowBookUi
