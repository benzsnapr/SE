import React, {Component} from "react";
import ReactDOM from "react-dom";

var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';

import RegBook from './RegBook'
import BorrowBookUi from './BorrowBookUi'
import ReturnBook from './ReturnBook'
import E_Book from './E_Book'

var products = [];


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'>
                </div>
                <div className='center'>จัดการสมาชิก
                </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person"/>
                    &nbsp;
                    {this.props.Username}
                    &nbsp;
                    <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)}>
                        <ons-icon size="25px" icon="ion-power"/>
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
    handleClickRegBook() {
        this.props.navigator.pushPage({
            component: RegBook,
            props: {
                key: 'RegBook', Username: this.state.Username
            }
        });
    }

    handleClickBorrowBookUi() {
        this.props.navigator.pushPage({
            component: BorrowBookUi,
            props: {
                key: 'BorrowBookUi', Username: this.state.Username
            }
        });
    }

    //Sprint2
    handleClickReturnBook() {
        this.props.navigator.pushPage({
            component: ReturnBook,
            props: {
                key: 'ReturnBook', Username: this.state.Username
            }
        });
    }

    handleClickE_Book() {
        this.props.navigator.pushPage({
            component: E_Book,
            props: {
                key: 'E_Book', Username: this.state.Username
            }
        });
    }

    pushPage1() {
        this.props.navigator.pushPage({component: PageNav1, props: {key: 'pageNav1'}});
    }

    pushPage2() {
        this.props.navigator.pushPage({component: PageNav2, props: {key: 'pageNav2'}});
    }

    pushPage3() {
        this.props.navigator.pushPage({component: PageNav3, props: {key: 'pageNav3'}});
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/members'}).done(response => {
            this.setState({members: response.entity._embedded.members});
        });

    }

    addProducts(quantity) {
        products = [];

        const startId = products.length;
        for (var i = 0; i < quantity; i++) {
            const id = startId + i;
            products.push({
                id: i + 1,
                firstName: this.state.members[i].firstName,
                lastName: this.state.members[i].lastName,
                phone: this.state.members[i].phone,
                address: this.state.members[i].address,
                username : this.state.members[i].user.username,
                password : this.state.members[i].user.password,
            });
        }
    }

    indexN(cell, row, enumObject, index) {g
        return (<div>{index + 1}</div>)
    }

    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <div style={{paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <p>
                        <Ons.Button onClick={this.handleClickRegBook.bind(this)} style={{backgroundColor: '#8769aa'}}>
                            <ons-icon icon="ion-arrow-right-b"/>
                            &nbsp;ลงทะเบียนหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
                        <Ons.Button onClick={this.handleClickBorrowBookUi.bind(this)}
                                    style={{backgroundColor: '#399dd9'}}>
                            <ons-icon icon="ion-arrow-right-b"/>
                            &nbsp;ยืมหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
                        <Ons.Button style={{backgroundColor: '#cccccc'}}>
                            <ons-icon icon="ion-arrow-right-b" style={{color: '#ce535a'}}/>
                            &nbsp;จัดการสมาชิก </Ons.Button>
                        &nbsp;&nbsp;
                        <Ons.Button onClick={this.handleClickReturnBook.bind(this)}
                                    style={{backgroundColor: '#8769aa'}}>
                            <ons-icon icon="ion-arrow-right-b"/>
                            &nbsp;คืนหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
                        <Ons.Button onClick={this.handleClickE_Book.bind(this)} style={{backgroundColor: '#ce535a'}}>
                            <ons-icon icon="ion-arrow-right-b"/>
                            &nbsp;เพิ่ม E-Book </Ons.Button>
                    </p>

                    <hr/>

                    <section>
                        <div style={{
                            width: '40em',
                            height: '20.5em',
                            margin: '0 auto',
                            backgroundColor: 'grey',
                        }}>
                            <img src={"images/manage.jpg"}
                                 alt="Onsen UI" style={{width: '40em', height: '20em'}}/>
                            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                        </div>
                    </section>

                    <div style={{textAlign: 'center'}}>
                        <h2>Manage Members</h2>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <br/>
                        <Ons.Button onClick={this.pushPage1.bind(this)}>
                            Register Member
                        </Ons.Button>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <br/>
                        <Ons.Button onClick={this.pushPage2.bind(this)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Edit Member&nbsp;&nbsp;&nbsp;
                        </Ons.Button>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <br/>
                        <Ons.Button onClick={this.pushPage3.bind(this)}>
                            &nbsp;&nbsp;Delete Member&nbsp;
                        </Ons.Button>
                    </div>

                    <p style={{textAlign: 'center', opacity: '0.6', paddingTop: '20px'}}>
                        รายชื่อ Member
                    </p>

                    {this.addProducts(this.state.members.length)}
                    <BootstrapTable data={products} search>
                        <TableHeaderColumn
                            dataField='id' isKey
                            dataAlign="center" headerAlign='center'
                            width="100"
                        >Product ID
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='username'
                            dataAlign="center" headerAlign='center'
                            width="150"
                        >Username
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='password'
                            dataAlign="center" headerAlign='center'
                            width="150"
                        >Password
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='firstName'
                            dataAlign="center" headerAlign='center'
                            width="150"
                        >FirstName
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='lastName'
                            dataAlign="center" headerAlign='center'
                            width="150"
                        >LastName
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='phone'
                            dataAlign="center" headerAlign='center'
                            width="100"
                        >Phone
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='address'
                            dataAlign="center" headerAlign='center'
                            width="220"
                        >Address
                        </TableHeaderColumn>
                    </BootstrapTable>

                </div>
            </Ons.Page>
        );
    }
}

var username1 = '';
var data1 = [];

class PageNav1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : 'Register Member',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            phone: '',
            address: '',
            type: 'member',
            st: 'คุณ กรอกข้อมูลไม่ครบหรือกรอกข้อมูลผิดรูปแบบ!'
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>จัดการสมาชิก
                </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person"/>
                    &nbsp;
                    {this.props.Username}
                    &nbsp;
                    <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)}>
                        <ons-icon size="25px" icon="ion-power"/>
                    </Ons.Button>
                    &nbsp;&nbsp;

                </div>
            </Ons.Toolbar>
        );

    }

    logOut() {
        window.location.reload()
    }

    handleClick(username, password, firstname, lastname, phone, address, type, st) {
        if(username != '' && firstname != '' && lastname != '' && (phone >= 100000000 && phone <= 999999999) && address != ''){
            st = 'สมัครสมาชิกสำเร็จ'
        }
        return function () {
            client({
                method: 'GET',
                path: '/username/' + username + '/password/' + password + '/firstname/' + firstname + '/lastname/' + lastname + '/phone/' + phone + '/address/' + address + '/type/' + type
            }).done(
                ons.notification.alert(st)
            )
        }
    }

    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <div style={{textAlign: 'center'}}>

                    <section>
                        <div style={{
                            width: '45em',
                            height: '20.5em',
                            margin: '0 auto',
                            backgroundColor: 'grey',
                        }}>
                            <img src={"images/manage.jpg"}
                                 alt="Onsen UI" style={{width: '100%', height: '20em'}}/>
                            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                        </div>
                    </section>

                    <h1>Register Member</h1>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-android-people'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" Username "
                            float
                            onChange={evt => this.setState({username: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-android-people'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            type='password'
                            placeholder=" Password "
                            float
                            onChange={evt => this.setState({password: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" Firstname "
                            float
                            onChange={evt => this.setState({firstname: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" Lastname "
                            float
                            onChange={evt => this.setState({lastname: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-iphone'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" Phone "
                            float
                            onChange={evt => this.setState({phone: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-location'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" Address "
                            float
                            onChange={evt => this.setState({address: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Button
                            onClick={this.handleClick(this.state.username, this.state.password, this.state.firstname, this.state.lastname, this.state.phone, this.state.address, this.state.type, this.state.st)}>Register</Ons.Button>
                    </p>

                </div>
            </Ons.Page>
        );
    }
}

//เสร็จแล้ว

class PageNav2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : 'Edit Member',
            username: '',
            firstName: ''
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>จัดการสมาชิก
                </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person"/>
                    &nbsp;
                    {this.props.Username}
                    &nbsp;
                    <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)}>
                        <ons-icon size="25px" icon="ion-power"/>
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
        fetch('http://localhost:8080/api/members/search/findByFirstName?' + 'firstName=' + this.state.firstName)
            .then((response) => response.json()).then((responseJson) => {
            data1 = responseJson;
            //firstName1 = this.state.firstName;
            this.props.navigator.pushPage({
                component: PageNav22,
                props: {key: 'PageNav22', firstName: this.state.firstName}
            });
        })
            .catch((error) => {
                ons.notification.alert('ไม่พบข้อมูล');
            });
    }

    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <div style={{textAlign: 'center'}}>

                    <section>
                        <div style={{
                            width: '45em',
                            height: '20.5em',
                            margin: '0 auto',
                            backgroundColor: 'grey',
                        }}>
                            <img src={"images/manage.jpg"}
                                 alt="Onsen UI" style={{width: '100%', height: '20em'}}/>
                            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                        </div>
                    </section>

                    <h1>Search Member ที่ต้องการแก้ไข</h1>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" FirstName "
                            float
                            onChange={evt => this.setState({firstName: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Button style={{margin: '6px'}} modifier='cta'
                                    onClick={this.pushPage.bind(this)}>Search</Ons.Button>
                    </p>

                </div>
            </Ons.Page>
        );
    }
}

//
class PageNav22 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            newfirstname: '',
            newlastname: '',
            phone: '',
            address: '',
            st: 'คุณ กรอกข้อมูลไม่ครบหรือกรอกข้อมูลผิดรูปแบบ!'
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>จัดการสมาชิก
                </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person"/>
                    &nbsp;
                    {this.props.Username}
                    &nbsp;
                    <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)}>
                        <ons-icon size="25px" icon="ion-power"/>
                    </Ons.Button>
                    &nbsp;&nbsp;

                </div>
            </Ons.Toolbar>
        );
    }

    logOut() {
        window.location.reload()
    }

    handleClick(firstname, newfirstname, newlastname, phone, address, st) {
        if(newfirstname != '' && (phone >= 100000000 && phone <= 999999999) && newlastname != '' && address != ''){
            st = 'แก้ไขข้อมูลสมาชิกสำเร็จ!'
        }
        return function () {
            client({
                method: 'GET',
                path: '/firstname/' + firstname + '/newfirstname/' + newfirstname + '/newlastname/' + newlastname + '/phone/' + phone + '/address/' + address
            }).done(
                ons.notification.alert(st)
            );
        }
    }

//1
    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <center>

                    <section>
                        <div style={{
                            width: '45em',
                            height: '20.5em',
                            margin: '0 auto',
                            backgroundColor: 'grey',
                        }}>
                            <img src={"images/manage.jpg"}
                                 alt="Onsen UI" style={{width: '100%', height: '20em'}}/>
                            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                        </div>
                    </section>

                    Edit Member

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-close-circled'/>&nbsp;&nbsp;
                        <Ons.Input
                            value={data1.firstName}
                            modifier="underbar"
                            //placeholder= {data1.firstName}
                            float
                            onChange={evt => this.setState({firstname: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            //value= {data1.lastname}
                            modifier="underbar"
                            placeholder="New FirstName"
                            float
                            onChange={evt => this.setState({newfirstname: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            //value= {data1.lastname}
                            modifier="underbar"
                            placeholder="New lastname"
                            onChange={evt => this.setState({newlastname: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-iphone'/>&nbsp;&nbsp;
                        <Ons.Input
                            //value= {data1.phone}
                            modifier="underbar"
                            placeholder="New Phone"
                            float
                            onChange={evt => this.setState({phone: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-location'/>&nbsp;&nbsp;
                        <Ons.Input
                            //value= {data1.address}
                            modifier="underbar"
                            placeholder="New Address"
                            float
                            onChange={evt => this.setState({address: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Button style={{margin: '6px'}}
                                    onClick={this.handleClick(data1.firstName, this.state.newfirstname, this.state.newlastname, this.state.phone, this.state.address, this.state.st).bind(this)}>Save</Ons.Button>
                    </p>
                </center>
            </Ons.Page>
        );
    }
}

//

class PageNav3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : 'Delete Member',
            username: '',
            firstName: ''
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>จัดการสมาชิก
                </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person"/>
                    &nbsp;
                    {this.props.Username}
                    &nbsp;
                    <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)}>
                        <ons-icon size="25px" icon="ion-power"/>
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
        fetch('http://localhost:8080/api/members/search/findByFirstName?' + 'firstName=' + this.state.firstName)
            .then((response) => response.json()).then((responseJson) => {
            data1 = responseJson;
            //firstName1 = this.state.firstName;
            this.props.navigator.pushPage({
                component: PageNav32,
                props: {key: 'PageNav32', firstName: this.state.firstName}
            });
        })
            .catch((error) => {
                ons.notification.alert('ไม่พบข้อมูล');
            });
    }

    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <div style={{textAlign: 'center'}}>

                    <section>
                        <div style={{
                            width: '45em',
                            height: '20.5em',
                            margin: '0 auto',
                            backgroundColor: 'grey',
                        }}>
                            <img src={"images/manage.jpg"}
                                 alt="Onsen UI" style={{width: '100%', height: '20em'}}/>
                            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                        </div>
                    </section>

                    <h1>Search Member ที่ต้องการลบ</h1>

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            modifier="underbar"
                            placeholder=" FirstName "
                            float
                            onChange={evt => this.setState({firstName: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Button style={{margin: '6px'}} modifier='cta'
                                    onClick={this.pushPage.bind(this)}>Search</Ons.Button>
                    </p>

                </div>
            </Ons.Page>
        );
    }
}

//

class PageNav32 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>จัดการสมาชิก
                </div>
                <div className='right'>
                    <ons-icon size="25px" icon="ion-person"/>
                    &nbsp;
                    {this.props.Username}
                    &nbsp;
                    <Ons.Button modifier='quiet' onClick={this.logOut.bind(this)}>
                        <ons-icon size="25px" icon="ion-power"/>
                    </Ons.Button>
                    &nbsp;&nbsp;

                </div>
            </Ons.Toolbar>
        );
    }

    logOut() {
        window.location.reload()
    }

    handleClick(firstname) {
        return function () {
            client({method: 'GET', path: '/firstname/' + firstname}).done(
                ons.notification.alert("ลบสมาชิกสำเร็จ"));
        }
    }

    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
                <center>

                    <section>
                        <div style={{
                            width: '45em',
                            height: '20.5em',
                            margin: '0 auto',
                            backgroundColor: 'grey',
                        }}>
                            <img src={"images/manage.jpg"}
                                 alt="Onsen UI" style={{width: '100%', height: '20em'}}/>
                            <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                        </div>
                    </section>

                    Delete Member

                    <p>
                        <Ons.Icon style={{color: '#afaf83'}} icon='ion-person'/>&nbsp;&nbsp;
                        <Ons.Input
                            value={data1.firstName}
                            modifier="underbar"
                            //placeholder= {data1.firstName}
                            float
                            onChange={evt => this.setState({firstname: evt.target.value})}>
                        </Ons.Input>
                    </p>

                    <p>
                        <Ons.Button style={{margin: '6px'}}
                                    onClick={this.handleClick(data1.firstName).bind(this)}>Delete</Ons.Button>
                    </p>
                </center>
            </Ons.Page>
        );
    }
}

class ManageMember extends React.Component {
    constructor(props) {
        super(props);
        this.loadPage = this.loadPage.bind(this);
        this.state = {}
    }

    loadPage(page) {
        this.navigator.resetPage({component: page, props: {key: page}}, {animation: 'fade'});
    }

    renderPage(route, navigator) {
        route.props = route.props || {};
        route.props.navigator = navigator;
        route.props.Username = this.props.Username;

        return React.createElement(route.component, route.props);
    }

    render() {
        return (
            <Ons.Navigator initialRoute={{component: Home, props: {key: 'Home'}}}
                           renderPage={this.renderPage.bind(this)} ref={(navigator) => {
                this.navigator = navigator;
            }}/>
        );
    }
}

export default ManageMember