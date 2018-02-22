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
import InterLibrary_Loan from './InterLibrary_Loan'

var productsa = [] ;
var products = [] ;

class ComReservationUIPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        librarian: props.Username,
        computers: [],
        member: ''
    };
  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        </div>
        <div className='center'>จองเครื่องดูวิดีโอ
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
  handleClickInterLibrary_Loan(){
    this.props.navigator.pushPage({ component: InterLibrary_Loan,
      props: { key: 'InterLibrary_Loan' , Username:this.state.Username
      } });
  }

  pushPage() {
    this.props.navigator.pushPage({ component: ComReservationUIPage2, props: {
      key: 'ComReservationUIPage2'
    } });
  }



  componentDidMount(){
    client({method: 'GET', path: '/api/computers'}).done(response => {
      this.setState({computers: response.entity._embedded.computers});
    });
  }

 addProductsa(quantity) {
        productsa = [] ;

      const startId = productsa.length;
      for (var i = 0 ; i < quantity; i++) {
        const id = startId + i;

        productsa.push({
          id: this.state.computers[i].id,
          comnumber: this.state.computers[i].comnumber,
          note: this.state.computers[i].note,
          status: this.state.computers[i].status.status

        });

      }
  }

  indexN(cell, row, enumObject, index) {
           return (<div>{index+1}</div>)
         }



  cellButton(cell, row, enumObject, rowIndex) {
              if(row.status=='Empty'){
                  return (
                    <Ons.Button
                      onClick={this.handleClick2(row.id,this.state.librarian,row.comnumber)}>
                        จองเครื่องดูวิดีโอ
                    </Ons.Button>
                  );
              }else{
                  return (

                        <Ons.Button modifier='outline'
                         onClick={this.pushPage2.bind(this)}>
                             จองแล้ว
                         </Ons.Button>
                );
        }
   }

    pushPage2() {
          ons.notification.alert("เครื่องดูVideo ได้ถูกจองไปแล้ว");

        }

         handleClick2(comid,member,aa) {

            return function (){
              client({method: 'GET', path: '/comid/'+comid+'/member/'+member}).done(
                  ons.notification.alert('สมาชิก : '+member+' ได้จองเครื่อง '+aa+' เรียบร้อยแล้วครับ')
              )}

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
            <Ons.Button style={{backgroundColor: '#cccccc'}}>
            <ons-icon icon="ion-arrow-right-b" style={{color: '#399dd9'}}/>&nbsp;จองเครื่องดูวิดีโอ </Ons.Button>
            &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickInterLibrary_Loan.bind(this)} style={{backgroundColor: '#7eb74b'}}>
            <ons-icon icon="ion-arrow-right-b"/>&nbsp;ยืมระหว่างห้องสมุด </Ons.Button>
          </p>

          <hr/>

            <Ons.Card>
                 <div className="content">
                       <section style={{textAlign: 'center'}}>

                 <img className="content" src={"https://bevouliin.com/wp-content/uploads/2014/02/video-television-tv-movie-logo-template-preview-bevouliin.jpg"} alt="Onsen UI" style={{width: '20em',height: '20em'}} />

                 <div style={{color: '#3399CC'}} ><h2>จองเครื่องดูวิดีโอ</h2></div>




                   <Ons.Button modifier='cta' onClick={this.pushPage.bind(this)}>ดูประวัติการจองเครื่องดูวิดีโอ</Ons.Button>

            {this.addProductsa(this.state.computers.length)}

            <div>
                    <BootstrapTable
                      data={ productsa }
                      search>
                      <TableHeaderColumn dataAlign="center" headerAlign='center'width="140" dataField='id' isKey> ลำดับ </TableHeaderColumn>
                      <TableHeaderColumn dataAlign="center" headerAlign='center'width="140" dataField='comnumber' > หมายเลขเครื่อง </TableHeaderColumn>
                      <TableHeaderColumn dataField='status' dataAlign="center" headerAlign='center' width="140" > สถานะเครื่อง </TableHeaderColumn>
                      <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} dataAlign="center" headerAlign='center'width="180">จองเครื่องดูวิดีโอ</TableHeaderColumn>
                    </BootstrapTable>
            </div>

             </section>

                             </div>
                        </Ons.Card>

        </div>
      </Ons.Page>
    );
  }
}

class ComReservationUIPage2 extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
     comReservations: [],

     };
   }

   renderToolbar() {
     return (
       <Ons.Toolbar>
         <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
         <div className='center'>จองเครื่องดูวิดีโอ
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

   pushPage() {
       this.props.navigator.pushPage({ component: ComReservationUIPage3, props: {
         key: 'ComReservationUIPage3'
       } });
     }


     componentDidMount(){
         client({method: 'GET', path: '/api/comReservations'}).done(response => {
           this.setState({comReservations: response.entity._embedded.comReservations});
         });
       }

    addProducts(quantity) {
            products = [] ;

          const startId = products.length;
          for (var j = 0 ; j < quantity; j++) {
            const id = startId + j;
            products.push({
              id: j+1,
              user: this.state.comReservations[j]._embedded.member.user.username,
              name: this.state.comReservations[j]._embedded.member.firstName+"  "+this.state.comReservations[j]._embedded.member.lastName,
              comnumber: this.state.comReservations[j]._embedded.computer.comnumber,
              date: this.state.comReservations[j].date,
              dateEnd: this.state.comReservations[j].dateEnd

            });
          }
          }

convertStartD(cell, row, enumObject, index) {
    return (
      <div>
        {new Date(row.date).getDate()}/
        {new Date(row.date).getMonth()+1}/
        {new Date(row.date).getFullYear()}

        &nbsp;&nbsp;-&nbsp;&nbsp;

        {new Date(row.dateEnd).getDate()}/
        {new Date(row.dateEnd).getMonth()+1}/
        {new Date(row.dateEnd).getFullYear()}
      </div>
    )
  }



   render() {
     return(
       <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>


            <Ons.Card>
                 <div className="content">
                       <section style={{textAlign: 'center'}}>

                 <img className="content" src={"https://bevouliin.com/wp-content/uploads/2014/02/video-television-tv-movie-logo-template-preview-bevouliin.jpg"} alt="Onsen UI" style={{width: '20em',height: '20em'}} />

                 <div style={{color: '#3399CC'}} ><h1>ประวัติจองเครื่องดูวิดีโอ</h1></div>









          {this.addProducts(this.state.comReservations.length)}

          <BootstrapTable data={ products } search >
                  <TableHeaderColumn dataField='id' isKey> ลำดับ</TableHeaderColumn>
                  <TableHeaderColumn dataField='user'> user ผู้จอง</TableHeaderColumn>
                  <TableHeaderColumn dataField='name'> ชื่อผู้จอง</TableHeaderColumn>
                  <TableHeaderColumn dataField='comnumber'> เครื่องที่จอง</TableHeaderColumn>
                  <TableHeaderColumn dataField='date' width='260' dataFormat={this.convertStartD.bind(this)} >วันที่จอง</TableHeaderColumn>


          </BootstrapTable>

        </section>

        </div>
        </Ons.Card>


       </Ons.Page>
     )
   }
 }

 class ComReservationUIPage3 extends React.Component {
   constructor(props) {
     super(props);
     this.state = {

     };
   }

   renderToolbar() {
     return (
       <Ons.Toolbar>
         <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
         <div className='center'>จองเครื่องดูวิดีโอ
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

   render() {
     return(
       <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
         หน้าที่ 3
       </Ons.Page>
     )
   }
 }

class ComReservationUI extends React.Component {
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
      <Ons.Navigator initialRoute={{ component: ComReservationUIPage1, props: { key: 'ComReservationUIPage1'} }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
    );
  }
}

export default ComReservationUI
