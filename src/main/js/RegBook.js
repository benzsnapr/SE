import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import BorrowBookUi from './BorrowBookUi'
import ManageMember from './ManageMember'
import ReturnBook from './ReturnBook'
import E_Book from './E_Book'

class RegBookPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: '',
      isbn: '',
      author: '',
      published: '',
      description: 'null',
      amount: '',
      language:'Thai',
	    mid: this.props.Username,
      st: 'กรุณากรอกข้อมูลให้ครบ!'
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>ลงทะเบียนหนังสือ
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
            <Ons.Button style={{backgroundColor: '#cccccc'}}>
            <ons-icon icon="ion-arrow-right-b" style={{color: '#8769aa'}}/>&nbsp;ลงทะเบียนหนังสือ </Ons.Button>
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

        <Ons.Card>
          <section>
          <div style={{
            width: '25em',
            height: '20.5em',
            margin: '0 auto',
            backgroundColor: 'grey',
          }}>
           <img src={"https://i.pinimg.com/564x/a9/ff/02/a9ff027115ed0ce7922b9f29c4a8d88a.jpg"} alt="Onsen UI" style={{width: '100%',height: '20.5em'}} />
            <Ons.Ripple color='rgba(225, 225, 208, 0.4)'  />
          </div>
            </section>

              <div className="content">
                <section style={{textAlign: 'center'}}>
          <div style={{color: '#afaf83'}} ><h3>กรอกข้อมูลหนังสือ   </h3></div>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-ios-book' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Input
              modifier="underbar"
              placeholder="ชื่อหนังสือ"
              float
              onChange={evt => this.setState({ bookname: evt.target.value })} >
            </Ons.Input>&nbsp;<Ons.Icon style={{color: 'red'}} icon='ion-asterisk' />
          </p>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-ios-book' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Input
              modifier="underbar"
              placeholder="ISBN"
              float
              onChange={evt => this.setState({ isbn: evt.target.value })} >
            </Ons.Input>&nbsp;<Ons.Icon style={{color: 'red'}} icon='ion-asterisk' />
          </p>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-person' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Input
              modifier="underbar"
              placeholder="ชื่อผู้แต่ง"
              float
              onChange={evt => this.setState({ author: evt.target.value })} >
            </Ons.Input>&nbsp;<Ons.Icon style={{color: 'red'}} icon='ion-asterisk' />
          </p>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-ribbon-b' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Input
              modifier="underbar"
              placeholder="ปีที่เผยแพร่"
              float
              onChange={evt => this.setState({ published: evt.target.value })} >
            </Ons.Input>&nbsp;<Ons.Icon style={{color: 'red'}} icon='ion-asterisk' />
          </p>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-chatbox-working' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Input
              modifier="underbar"
              placeholder="Description"
              float
              onChange={evt => this.setState({ description: evt.target.value })} >
            </Ons.Input>&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-ios-book' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Input
              modifier="underbar"
              placeholder="จำนวน"
              float
              onChange={evt => this.setState({ 	amount: evt.target.value })} >
            </Ons.Input>&nbsp;<Ons.Icon style={{color: 'red'}} icon='ion-asterisk' />
          </p>
          <p>
            <Ons.Icon style={{color: '#afaf83'}} icon='ion-ios-world' />&nbsp;&nbsp;&nbsp;&nbsp;
            <Ons.Select id="choose-sel" value={this.state.language} modifier={this.state.language}
                        onChange={evt => this.setState({language: event.target.value})}>
              <option value="Thai">&nbsp;ภาษาไทย&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
              <option value="English">&nbsp;ภาษาอังกฤษ</option>
            </Ons.Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p>
            <Ons.Button onClick={this.handleClickSave(this.state.bookname,this.state.isbn,this.state.author
              ,this.state.published,this.state.description,this.state.language,
              this.state.amount,this.state.mid,this.state.st)}>ลงทะเบียนหนังสือ   </Ons.Button>
          </p>
          <p>
            <Ons.Button onClick={this.pushPage.bind(this)}>หนังสือที่ลงทะเบียนแล้ว</Ons.Button>
          </p>
        </section>
          </div>
        </Ons.Card>
        </div>
      </Ons.Page>
    );
  }
  pushPage() {
        this.props.navigator.pushPage({ component: RegBookPage2, props: { key: 'RegBookPage2' } });
  }
  handleClickSave(bookname,isbn,author,published,description,language,amount,mid,st) {
        if(bookname != '' && isbn != '' && author != '' && published != '' && amount != ''){
          st = 'ลงทะเบียนสำเร็จ!'
        }
        return function () {
          client({method: 'GET', path: '/bookname/'+bookname+'/bookisbn/'+isbn+'/bookauthor/'+author+
            '/bookpublished/'+published+'/bookdescription/'+description+'/booklanguage/'+
            language+'/amount/'+amount+'/mid/'+mid}).done(
                ons.notification.alert(st)
          )}
  }

}

class RegBookPage2 extends React.Component {
  constructor(props) {
   super(props);
   this.state = {regbooks: []};
 }

 componentDidMount() {
  client({method: 'GET', path: '/api/regbooks'}).done(response => {
     this.setState({regbooks: response.entity._embedded.regbooks});
  });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>หนังสือที่ลงทะเบียนแล้ว
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
  convertD(cell,row,enumObject,index){
    return(
      <div>
        {new Date(row.date).getDate()}/
        {new Date(row.date).getMonth()+1}/
        {new Date(row.date).getFullYear()}
      </div>
    )
  }
  findbookname(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.book.name}</div>)
  }
  findbookisbn(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.book.isbn}</div>)
  }
  findbookauthor(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.book.author}</div>)
  }
  findbookpublished(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.book.published}</div>)
  }
  findbooklanguage(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.book.language}</div>)
  }
  findlibrarian(cell,row,enumObject, rowIndex){
    return(<div>{row._embedded.librarian.firstName}&nbsp; {row._embedded.librarian.lastName}</div>)
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{paddingTop:'20px',paddingLeft:'100px',paddingRight:'100px'}}>
      <BootstrapTable data={this.state.regbooks} >
          <TableHeaderColumn isKey dataField='any' dataAlign="center" width='50'
            dataFormat={this.indexnum.bind(this)}>ลำดับ</TableHeaderColumn>
          <TableHeaderColumn dataField="date" headerAlign="center" width='100'
            dataFormat={this.convertD.bind(this)}>วันที่ลงทะเบียน</TableHeaderColumn>
          <TableHeaderColumn dataField="findbookname" headerAlign="center" width='150'
            dataFormat={this.findbookname.bind(this)}>ชื่อหนังสือ</TableHeaderColumn>
          <TableHeaderColumn dataField="findbookisbn" headerAlign="center" width='100'
            dataFormat={this.findbookisbn.bind(this)}>ISBN่</TableHeaderColumn>
          <TableHeaderColumn dataField="findbookauthor" headerAlign="center" width='150'
            dataFormat={this.findbookauthor.bind(this)}>ผู้เขียน</TableHeaderColumn>
          <TableHeaderColumn dataField="findbookpublished"  dataAlign="center" width='80'
            dataFormat={this.findbookpublished.bind(this)}>ปีที่เผยแพร่</TableHeaderColumn>
          <TableHeaderColumn dataField="findbooklanguage" dataAlign="center" width='80'
            dataFormat={this.findbooklanguage.bind(this)}>ภาษา</TableHeaderColumn>
          <TableHeaderColumn dataField="amount" dataAlign="center" width='80'>จำนวน(เล่ม)</TableHeaderColumn>
          <TableHeaderColumn dataField="findbooklanguage" dataAlign="center" width='150'
            dataFormat={this.findlibrarian.bind(this)}>ผู้ลงทะเบียน</TableHeaderColumn>
      </BootstrapTable>
      <br/><div><center>
        <img src={"https://png.icons8.com/color/528/000000/book-shelf.png"} style={{ width: '15%' }} />
      </center></div>
      </div>
      </Ons.Page>
    );
  }
}

class RegBook extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: RegBookPage1, props: { key: 'RegBookPage1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default RegBook
