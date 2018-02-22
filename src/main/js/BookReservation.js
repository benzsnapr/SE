import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BootstrapTable, TableHeaderColumn ,SearchField } from 'react-bootstrap-table';
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import Examresource from './Examresource'
import Bookstore from './Bookstore'
import Extended_TimeBook from  './Extended_TimeBook'
import RoomReservation from './RoomReservation'
import ComReservationUI from './ComReservationUI'
import InterLibrary_Loan from './InterLibrary_Loan'
class SelectBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book_id:null,
      book_isbn:null,
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>ระบบจองหนังสือ
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

  componentDidMount() {
    client({method: 'GET', path: '/api/books'}).done(response => {
      this.setState({books: response.entity._embedded.books});
    });
  }

  imageFormatter(cell, row){
    return "<img src='"+cell+"'/>";
  }

  handleClick(cell, row){
    this.state.book_id = row.id;
    this.state.book_isbn = row.isbn;
      this.props.navigator.pushPage({ component: SelectCopy, 
        props: { key: 'SelectCopy' ,
        book_id: this.state.book_id,
        book_isbn: this.state.book_isbn,
    } });
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return ( 
      <Ons.Button 
        onClick={() => this.handleClick(cell, row)}>
          จอง
      </Ons.Button>
    );
  }

  BookDetail(cell, row, enumObject, rowIndex) {
    return (
      <div>
        <h2>{ row.name }</h2>
        &emsp;&emsp;{ row.description }
        <li>ISBN : { row.isbn }</li>
        <li>ผู้แต่ง : { row.author }</li>
        <li>เผยแพร่เมื่อ : { row.published }</li>
        <li>ภาษา : { row.language }</li>
      </div>
    )
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={ { color: 'gray' } }>
        แสดง { start } ถึง { to }, จากทั้งหมด { total }
      </p>
    );
  }

  render() {
    const options = {
      searchField: (props) => (<MySearchField { ...props }/>),
        page: 1,  // which page you want to show as default
        sizePerPage: 5,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
        paginationPosition: 'bottom',  // default is bottom, top and both is all available
        hideSizePerPage: true //> You can hide the dropdown for sizePerPage
    }
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}> 
          <p>
            <Ons.Button style={{backgroundColor: '#cccccc'}}> 
            <ons-icon icon="ion-arrow-right-b" style={{color: '#f16794'}}/>&nbsp;จองหนังสือ </Ons.Button>
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

          <div style={{textAlign:'center', color:'red'}}>
            <b>ระบบจะสำรองหนังสือเป็นเวลา 3 วันหลังจากวันคืนหนังสือ</b>
          </div>

          <BootstrapTable 
            data={ this.state.books } 
            hover ={ true } 
            search={ true } 
            pagination={ true } 
            options={ options }
            searchPlaceholder='Search delay 500ms'
            >
            <TableHeaderColumn 
                dataField='id' 
                isKey={ true } 
                searchable={ false }
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
                dataFormat={this.BookDetail.bind(this)}
                headerAlign='center' 
                tdStyle={ { whiteSpace: 'normal' } }
                >รายละเอียด </TableHeaderColumn>

            <TableHeaderColumn 
                dataField='button' 
                dataFormat={this.cellButton.bind(this)} 
                dataAlign="center" headerAlign='center'
                width="150" 
                > จองหนังสือ </TableHeaderColumn>

            <TableHeaderColumn dataField='name' hidden={true} >Name</TableHeaderColumn>
            <TableHeaderColumn dataField='isbn' hidden={true} >isbn</TableHeaderColumn>
            <TableHeaderColumn dataField='author' hidden={true} >author</TableHeaderColumn>
            <TableHeaderColumn dataField='published' hidden={true} >published</TableHeaderColumn>
            <TableHeaderColumn dataField='description' hidden={true} >Description</TableHeaderColumn>
            <TableHeaderColumn dataField='language' hidden={true} >language</TableHeaderColumn>
            <TableHeaderColumn dataField='image' hidden={true} >image</TableHeaderColumn>
            
          </BootstrapTable>
        </div>
      </Ons.Page>
    );
  }
}

class MySearchField extends React.Component {
  // It's necessary to implement getValue
  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }
  // It's necessary to implement setValue
  setValue(value) {
    ReactDOM.findDOMNode(this).value = value;
  }

  render() {
    return (
      <Ons.SearchInput 
        className={`form-control`}
        defaultValue={ this.props.defaultValue }
        placeholder={ 'ค้นหาหนังสือ ?'||this.props.placeholder }
        onKeyUp={ this.props.search }/>
    );
  }
}

class SelectCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copies:[],
      books:[],
      bookReservations:[],
      book_id:props.book_id,
      book_isbn:props.book_isbn,
      dialogShown: false,
      dialogShown2: false,
      booksName:'',
      booksImage:'',
      Username:this.props.Username,
      temp:null
    };
    this.renderRow = this.renderRow.bind(this);
    this.handleClickSelected = this.handleClickSelected.bind(this);
    this.handleClickSelectedHold = this.handleClickSelectedHold.bind(this);
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ระบบจองหนังสือ
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

  popPage() {
    this.props.navigator.popPage();
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/copies'}).done(response => {
      this.setState({copies: response.entity._embedded.copies});
    });
    client({method: 'GET', path: '/api/books'}).done(response => {
      this.setState({books: response.entity._embedded.books});
      this.setState({booksName: response.entity._embedded.books[this.state.book_id-1].name});
      this.setState({booksImage: response.entity._embedded.books[this.state.book_id-1].image});
    });
    client({method: 'GET', path: '/api/bookReservations'}).done(response => {
      this.setState({bookReservations: response.entity._embedded.bookReservations});
    });
  }

  showDialog() {
    this.setState({dialogShown: true});
  }
  showDialog2() {
    this.setState({dialogShown2: true});
  }

  hideDialog() {
    this.setState({dialogShown: false});
    this.props.navigator.pushPage({ component: PrintReservation, 
      props: { key: 'PrintReservation' ,
        book_id: this.state.book_id,
        book_isbn: this.state.book_isbn
      } });
  }
  hideDialog2() {
    this.setState({dialogShown2: false});
  }

  handleClickSelected(copy, index, Username,dialogShown) {
    var that = this;
    return function () {
      client({method: 'GET', path: '/copybook/'+index+'/member/'+Username}).done(
        function() {
          that.setState({ //the error happens here
            dialogShown: true
          });
        }
      )
    }
  }

  handleClickSelectedHold(copy, index, Username,dialogShown,dialogShown2) {
    var that = this;
    var i=0;
    var j=0;
    for(var i=0 ; i<this.state.bookReservations.length ; i++){
      if(this.state.bookReservations[i]._embedded.member.user.username === Username){
        return function () {
          that.setState({ //the error happens here
            dialogShown2: true
          });
        }
        break;
      }
      else{
        j++;
        if( j > 0 && i === this.state.bookReservations.length-1){
          return function () {
            client({method: 'GET', path: '/copybook/'+index+'/member/'+Username}).done(
              function() {
                that.setState({ //the error happens here
                  dialogShown: true
                });
              }
            )
          }
          j = 0;
        }
      }
    }
  }



  renderButton(row, index){
    if(row.status.status === 'Borrowed'){
      return (
        <div>
          <Ons.Button onClick={this.handleClickSelected(row, index,this.state.Username,this.state.dialogShown)}> จอง </Ons.Button>
        </div>
      )
    }
    else if(row.status.status === 'Hold'){
      return (
        <div>
          <Ons.Button onClick={this.handleClickSelectedHold(row, index,this.props.Username,this.state.dialogShown,this.state.dialogShown2)} > จอง </Ons.Button>
        </div>
      )
    }
  }

  renderStatus(row, index){
    if(row.status.status === 'Borrowed' || row.status.status === 'Hold'){
      return (
        <div>
          {row.book.name}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Ons.Icon style={{color: 'blue'}} icon='ion-ios-book' /> &nbsp;&nbsp;
          {row.note}
        </div>
      )
    }else{
      return (
        <div>
          {row.book.name}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Ons.Icon  icon='ion-ios-book' /> &nbsp;&nbsp;
          {row.note}
        </div>

      )
    }
  }

  renderRow(row, index) {
    if(this.state.book_isbn === row.book.isbn){
      return(
        <Ons.ListItem 
          key={row._links.self.href}
          data={row}
          renderStatus={this.renderStatus(row, index)}
          renderButton={this.renderButton(row, index)}
          >
          <div className='left' >
            เล่มที่ {index+1} &nbsp;&nbsp;&nbsp;
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

  render() {
    return(
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{ textAlign: 'center', paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}> 
          <p>ต้องการจอง <b>{this.state.booksName}</b></p>   
          <p><img src={this.state.booksImage}/></p> 
          <center>
          <Ons.List
            style={{width: '900px'}}
            dataSource={this.state.copies}
            renderRow={this.renderRow.bind(this)}
            renderStatus={this.renderStatus}
            renderButton={this.renderButton}
            />
          </center>
        </div>
        <Ons.Dialog
          isOpen={this.state.dialogShown}
          >
          <div style={{textAlign: 'center', margin: '20px'}}>
            <p>บันทึกการจอง {this.state.booksName}</p>
            <Ons.Button onClick={this.hideDialog.bind(this)}>แสดงรายการจอง</Ons.Button>
          </div>
        </Ons.Dialog>
        <Ons.Dialog
          isOpen={this.state.dialogShown2}
          >
          <div style={{textAlign: 'center', margin: '20px'}}>
            <p>คุณจองหนังสือเล่มนี้ไปแล้ว ไม่สามารถจองซ้ำได้</p>
            <Ons.Button onClick={this.hideDialog2.bind(this)}>ตกลง</Ons.Button>
          </div>
        </Ons.Dialog>
      </Ons.Page>	
    )
  }
}

class PrintReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copies:[],
      books:[],
      bookReservations:[],
      book_id:props.book_id,
      book_isbn:props.book_isbn,
      bookName:'',
      bookCheck:'',
      CheckName: this.props.Username,
      memberFirstName: '',
      memberLastName:''
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
          <Ons.Button modifier='quiet' onClick={this.backToSelectBookPage.bind(this)} >
            <ons-icon size="30px"  icon="ion-ios-arrow-back"/>&nbsp;Back
          </Ons.Button>
        </div>
        <div className='center'>ระบบจองหนังสือ
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

  backToSelectBookPage(){
    this.props.navigator.resetPage({
      component: BookReservation,
      key: 'BookReservation',
    },{ animation: 'fade' }); 
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/books'}).done(response => {
      this.setState({books: response.entity._embedded.books});
      this.setState({bookName: response.entity._embedded.books[this.state.book_id-1].name});
    });
    client({method: 'GET', path: '/api/copies'}).done(response => {
      this.setState({copies: response.entity._embedded.copies});
    });
    client({method: 'GET', path: '/api/bookReservations'}).done(response => {
      this.setState({bookReservations: response.entity._embedded.bookReservations});
      this.setState({memberFirstName: response.entity._embedded.bookReservations[this.state.bookReservations.length-1]._embedded.member.firstName});
      this.setState({memberLastName: response.entity._embedded.bookReservations[this.state.bookReservations.length-1]._embedded.member.lastName});
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
  findBookName(cell, row, enumObject, rowIndex) {
    return ( row._embedded.copy.book.name )
  }
  findReserver(cell, row, enumObject) {
    return row._embedded.member.user.username;
  }
  
	render() {
    var temp = this.props.username;
		return(
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}> 
      <p>รายการจองหนังสือของ : <b>{this.state.memberFirstName}  {this.state.memberLastName}</b></p> 

        <BootstrapTable data={ this.state.bookReservations }>
          <TableHeaderColumn isKey dataField="any" width='50' 
            dataAlign="center" dataAlign="center" headerAlign='center' 
            dataFormat={this.indexN.bind(this)}>ลำดับที่</TableHeaderColumn>
          <TableHeaderColumn dataField='reserveDate' width='140' headerAlign='center' dataAlign="center"
            dataFormat={this.convertReserveD.bind(this)} >วันที่ทำการจอง</TableHeaderColumn>
          <TableHeaderColumn 
            dataField='findBookName' 
            width='250'
            headerAlign='center' 
            dataFormat={this.findBookName.bind(this)} >
            ชื่อหนังสือ</TableHeaderColumn>
          <TableHeaderColumn dataField='startDate' width='140' headerAlign='center' dataAlign="center"
            dataFormat={this.convertStartD.bind(this)} >รับหนังสือภายในวันที่</TableHeaderColumn>
          <TableHeaderColumn dataField='endDate' width='140' headerAlign='center' dataAlign="center"
            dataFormat={this.convertEndD.bind(this)} >หมดเวลาจอง</TableHeaderColumn>

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

class BookReservation extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: SelectBook, props: { key: 'SelectBook'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default BookReservation