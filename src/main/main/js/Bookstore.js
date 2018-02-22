import React, { Component } from "react";
import ReactDOM from "react-dom";
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var today = new Date();
var hour = today.getHours();
var min = today.getMinutes();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();


if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

yyyy = yyyy + 543
today = dd + '-' + mm + '-' + yyyy + ' ' + hour + ':' + min;
import BookReservation from './BookReservation'
import Examresource from './Examresource'
import Extended_TimeBook from './Extended_TimeBook'
import RoomReservation from './RoomReservation'
import ComReservationUI from './ComReservationUI'
import InterLibrary_Loan from './InterLibrary_Loan'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bookstores: [] };
        this.state = {
            bid: '',
            amount: '',
            mid: this.props.Username,
            kk: 'ป้อนข้อมูลไม่ครบ',
        }
    }
    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'>
                </div>
                <div className='center'>จำหน่ายหนังสือ
        </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person" />&nbsp;
          {this.props.Username}
                    &nbsp;
          <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)} >
                        <ons-icon size="25px" icon="ion-power" />
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
    handleClickBookReservation() {
        this.props.navigator.pushPage({
            component: BookReservation,
            props: {
                key: 'BookReservation', Username: this.state.Username
            }
        });
    }
    handleClickExamresource() {
        this.props.navigator.pushPage({
            component: Examresource,
            props: {
                key: 'Examresource', Username: this.state.Username
            }
        });
    }
    //Sprint2
    handleClickExtended_TimeBook() {
        this.props.navigator.pushPage({
            component: Extended_TimeBook,
            props: {
                key: 'Extended_TimeBook', Username: this.state.Username
            }
        });
    }
    handleClickRoomReservation() {
        this.props.navigator.pushPage({
            component: RoomReservation,
            props: {
                key: 'RoomReservation', Username: this.state.Username
            }
        });
    }
    handleClickComReservationUI() {
        this.props.navigator.pushPage({
            component: ComReservationUI,
            props: {
                key: 'ComReservationUI', Username: this.state.Username
            }
        });
    }
    handleClickInterLibrary_Loan() {
        this.props.navigator.pushPage({
            component: InterLibrary_Loan,
            props: {
                key: 'InterLibrary_Loan', Username: this.state.Username
            }
        });
    }

    componentDidMount() {
        client({ method: 'GET', path: '/api/bookstores' }).done(response => {
            this.setState({ bookstores: response.entity._embedded.bookstores });
        });
    }

    pushPage() {
        this.props.navigator.pushPage({ component: Page1, props: { key: 'Page1' } });

    }
    renderRow(row, index) {
        return (
            <Ons.ListItem
                key={row._links.self.href}
                data={row}>

                &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {row.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {row.price}&nbsp;บาท
          </Ons.ListItem>
        )
    }
    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <div style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                    <p>
                        <Ons.Button onClick={this.handleClickBookReservation.bind(this)} style={{ backgroundColor: '#f16794' }} >
                            <ons-icon icon="ion-arrow-right-b" />&nbsp;จองหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickExamresource.bind(this)} style={{ backgroundColor: '#7eb74b' }} >
                            <ons-icon icon="ion-arrow-right-b" />&nbsp;คลังข้อสอบ </Ons.Button>
                        &nbsp;&nbsp;
            <Ons.Button style={{ backgroundColor: '#cccccc' }}>
                            <ons-icon icon="ion-arrow-right-b" style={{ color: '#f7ac33' }} />&nbsp;จำหน่ายหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickExtended_TimeBook.bind(this)} style={{ backgroundColor: '#f7ac33' }}>
                            <ons-icon icon="ion-arrow-right-b" />&nbsp;ขยายเวลาคืนหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickRoomReservation.bind(this)} style={{ backgroundColor: '#f16794' }}>
                            <ons-icon icon="ion-arrow-right-b" />&nbsp;จองห้องค้นคว้า </Ons.Button>
                        &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickComReservationUI.bind(this)} style={{ backgroundColor: '#399dd9' }} >
                            <ons-icon icon="ion-arrow-right-b" />&nbsp;จองเครื่องดูวิดีโอ </Ons.Button>
                        &nbsp;&nbsp;
            <Ons.Button onClick={this.handleClickInterLibrary_Loan.bind(this)} style={{ backgroundColor: '#7eb74b' }}>
                            <ons-icon icon="ion-arrow-right-b" />&nbsp;ยืมระหว่างห้องสมุด </Ons.Button>
                    </p>
                </div>
                <hr />

                <div style={{ textAlign: 'center' }}>
                    <img src={"images/bs.jpg"} alt="Onsen UI" style={{ width: '40%' }} />


                    <h3>
                        ลำดับ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ชื่อหนังสือ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ราคา</h3>


                    <Ons.List
                        dataSource={this.state.bookstores}
                        renderRow={this.renderRow} />


                    <p>
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" ป้อนลำดับหนังสือ "
                            float
                            onChange={evt => this.setState({ bid: evt.target.value })}>
                        </Ons.Input>
                    </p>
                    <p>
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" จำนวน "
                            float
                            onChange={evt => this.setState({ amount: evt.target.value })}>
                        </Ons.Input>
                    </p>
                    <p>
                        <Ons.Button onClick={this.handleClick(this.state.bid, this.state.amount, this.state.mid, this.state.kk)}>ซื้อหนังสือ</Ons.Button>
                    </p>
                    <p>
                        <Ons.Button onClick={this.pushPage.bind(this)}>พิมพ์ใบเสร็จ</Ons.Button>

                    </p>
                </div>
            </Ons.Page>
        );
    }

    handleClick(bid, amount, mid, kk) {
        if (bid != '' && amount != '') {
            if (bid == '1' || bid == '2' || bid == '3' || bid == '4' || bid == '5')
                kk = 'สั่งซื้อสำเร็จ'
            else
                kk = 'ไม่พบหนังสือ'
        } else {
            kk = 'ป้อนข้อมูลไม่ครบ'
        }
        return function () {
            client({
                method: 'GET', path: '/bid/' + bid + '/amount/' + amount + '/mid/' + mid + '/date/' + today
            }).done(ons.notification.alert(kk)
                )
        }
    }
}

class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: null,
            name: '',
            price: '',
            amount: '',
            totalprice: '',
            dateandtime: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: ''
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>ใบเสร็จ
        </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person" />&nbsp;
          {this.props.Username}
                    &nbsp;
          <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)} >
                        <ons-icon size="25px" icon="ion-power" />
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
        client({ method: 'GET', path: '/api/receipts' }).done(response => {
            this.setState({ length: response.entity._embedded.receipts.length });
            this.setState({ name: response.entity._embedded.receipts[this.state.length - 1]._embedded.bookstore.name });
            this.setState({ price: response.entity._embedded.receipts[this.state.length - 1]._embedded.bookstore.price });
            this.setState({ amount: response.entity._embedded.receipts[this.state.length - 1].amount });
            this.setState({ totalprice: response.entity._embedded.receipts[this.state.length - 1].totalprice });
            this.setState({ dateandtime: response.entity._embedded.receipts[this.state.length - 1].dateandtime });
            this.setState({ firstname: response.entity._embedded.receipts[this.state.length - 1]._embedded.member.firstName });
            this.setState({ lastname: response.entity._embedded.receipts[this.state.length - 1]._embedded.member.lastName });
            this.setState({ address: response.entity._embedded.receipts[this.state.length - 1]._embedded.member.address });
            this.setState({ phone: response.entity._embedded.receipts[this.state.length - 1]._embedded.member.phone });
        });
    }
    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <div>
                    <center>
                        <table>
                            <tbody>
                                <tr>
                                    <td>วันที่และเวลา</td><td>ชื่อหนังสือ</td><td>ราคา</td><td>จำนวน</td>
                                    <td>ราคารวม</td><td>ชื่อสมาชิก</td><td>เบอร์โทร</td><td>ที่อยู่</td>
                                </tr>
                                <tr>
                                    <td>{this.state.dateandtime}</td>
                                    <td>{this.state.name}</td><td>{this.state.price}</td>
                                    <td>{this.state.amount}</td><td>{this.state.totalprice}</td>
                                    <td>{this.state.firstname}&nbsp;&nbsp;{this.state.lastname}</td>
                                    <td>{this.state.phone}</td><td>{this.state.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
            </Ons.Page>
        )
    }
}

class Bookstore extends React.Component {
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
            <Ons.Navigator initialRoute={{ component: Home, props: { key: 'Home' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
        );
    }
}

export default Bookstore
