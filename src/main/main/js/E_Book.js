import React, {Component} from "react";
import ReactDOM from "react-dom";

var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';

import RegBook from './RegBook'
import BorrowBookUi from './BorrowBookUi'
import ManageMember from './ManageMember'
import ReturnBook from './ReturnBook'

var products = [];

class E_BookPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url1: '',
            url2: '',
            book: '',
            user: '',
            books: [],
            librarian: props.Username,
            st: 'คุณ กรอกข้อมูลไม่ครบ!'
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'>
                </div>
                <div className='center'>เพิ่มE-Book
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

    handleClickManageMember() {
        this.props.navigator.pushPage({
            component: ManageMember,
            props: {
                key: 'ManageMember', Username: this.state.Username
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


    pushPage() {
        this.props.navigator.pushPage({component: E_BookPage2, props: {key: 'E_BookPage2'}});

    }


    handleClick(url1, url2, book, librarian, st) {
        if (url1 != '' && url2 != '' && book != '') {
            st = 'book ต้องเป็นตัวเลข id'
        }
        if (url1 != '' && url2 != '' && (book >= 1 && book <= 999)) {
            st = 'เพิ่ม E-Book สำเร็จ!'
        }
        return function () {
            client({
                method: 'GET',
                path: '/url1/' + url1 + '/url2/' + url2 + '/book/' + book + '/librarian/' + librarian
            }).done(
                ons.notification.alert(st)
            )
        }
    }


    showMenu() {
        this.props.showMenu();
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/books'}).done(response => {
            this.setState({books: response.entity._embedded.books});
        });
    }

    addProducts(quantity) {
        products = [];

        const startId = products.length;
        for (var i = 0; i < quantity; i++) {
            const id = startId + i;
            products.push({
                id: i + 1,
                name: this.state.books[i].name,
                image: this.state.books[i].image,
                isbn: this.state.books[i].isbn,
                author: this.state.books[i].author,
                language: this.state.books[i].language
            });
        }
    }

    imageFormatter3(cell, row) {
        return "<img src='" + row.image + "'/>";
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
                        <Ons.Button onClick={this.handleClickManageMember.bind(this)}
                                    style={{backgroundColor: '#ce535a'}}>
                            <ons-icon icon="ion-arrow-right-b"/>
                            &nbsp;จัดการสมาชิก </Ons.Button>
                        &nbsp;&nbsp;
                        <Ons.Button onClick={this.handleClickReturnBook.bind(this)}
                                    style={{backgroundColor: '#8769aa'}}>
                            <ons-icon icon="ion-arrow-right-b"/>
                            &nbsp;คืนหนังสือ </Ons.Button>
                        &nbsp;&nbsp;
                        <Ons.Button style={{backgroundColor: '#cccccc'}}>
                            <ons-icon icon="ion-arrow-right-b" style={{color: '#ce535a'}}/>
                            &nbsp;เพิ่ม E-Book </Ons.Button>
                    </p>
                    <hr/>

                    <Ons.Card>
                        <section>
                            <div style={{
                                width: '25em',
                                height: '20.5em',
                                margin: '0 auto',
                                backgroundColor: 'grey',
                            }}>
                                <img src={"images/ebook.jpg"}
                                     alt="Onsen UI" style={{width: '100%', height: '20em'}}/>
                                <Ons.Ripple color='rgba(51, 150, 204, 0.4)'/>
                            </div>
                        </section>

                        <div className="content">
                            <section style={{textAlign: 'center'}}>
                                <div style={{color: '#3399CC'}}><h3>จัดการ E-Book</h3></div>
                                <p>
                                    <Ons.Icon style={{color: '#3399CC'}} icon='ion-ios-book'/>&nbsp;&nbsp;
                                    <Ons.Input
                                        modifier="underbar"
                                        placeholder="Book ID"
                                        float
                                        onChange={evt => this.setState({book: evt.target.value})}>
                                    </Ons.Input>
                                </p>
                                <p>
                                    <Ons.Icon style={{color: '#3399CC'}} icon='ion-link'/>&nbsp;&nbsp;
                                    <Ons.Input
                                        modifier="underbar"
                                        placeholder="URL E-Book"
                                        float
                                        onChange={evt => this.setState({url1: evt.target.value})}>
                                    </Ons.Input>
                                </p>

                                <p>
                                    <Ons.Icon style={{color: '#3399CC'}} icon='ion-link'/>&nbsp;&nbsp;
                                    <Ons.Input
                                        modifier="underbar"
                                        placeholder="URL E-Book Backup"
                                        float
                                        onChange={evt => this.setState({url2: evt.target.value})}>
                                    </Ons.Input>
                                </p>

                                <p>
                                    <Ons.Button
                                        onClick={this.handleClick(this.state.url1, this.state.url2, this.state.book, this.state.librarian, this.state.st)}>Add
                                        E-Book</Ons.Button>
                                </p>


                                <Ons.Button modifier='cta' onClick={this.pushPage.bind(this)}>ดู E-Book</Ons.Button>

                                <p></p><p></p><p></p><p></p>
                                <p>
                                    รายชื่อหนังสือจริง
                                </p>

                                {this.addProducts(this.state.books.length)}
                                <BootstrapTable data={products} search>
                                    <TableHeaderColumn
                                        dataField='id' isKey
                                        dataAlign="center" headerAlign='center'
                                        width="100"
                                    >Product ID
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="image"
                                        dataFormat={this.imageFormatter3}
                                        dataAlign="center" headerAlign='center'
                                        width="140"
                                    >ปกหนังสือ
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='name'
                                        dataAlign="center" headerAlign='center'
                                        width="300"
                                    >name
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='isbn'
                                        dataAlign="center" headerAlign='center'
                                        width="200"
                                    >ISBN
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='author'
                                        dataAlign="center" headerAlign='center'
                                        width="200"
                                    >ผู้แต่ง
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='language'
                                        dataAlign="center" headerAlign='center'
                                        width="200"
                                    >ภาษา
                                    </TableHeaderColumn>
                                </BootstrapTable>

                            </section>

                        </div>
                    </Ons.Card>


                </div>
            </Ons.Page>
        );
    }
}


class E_BookPage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ebooks: [],
        };
    }

    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
                <div className='center'>อ่าน E-Book Online
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

    componentDidMount() {
        client({method: 'GET', path: '/api/ebooks'}).done(response => {
            this.setState({ebooks: response.entity._embedded.ebooks});
        });

    }

    addProducts(quantity) {
        products = [];

        const startId = products.length;
        for (var i = 0; i < quantity; i++) {
            const id = startId + i;
            products.push({
                id: i + 1,
                url1: this.state.ebooks[i].url1,
                url2: this.state.ebooks[i].url2,
                dateandtime: this.state.ebooks[i].dateandtime,
                name: this.state.ebooks[i]._embedded.book.name,
                image: this.state.ebooks[i]._embedded.book.image,
                librarian: this.state.ebooks[i]._embedded.librarian.firstName + " " + this.state.ebooks[i]._embedded.librarian.lastName

            });
        }
    }

    indexN(cell, row, enumObject, index) {
        g
        return (<div>{index + 1}</div>)
    }

    imageFormatter(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <a href={row.url1}>อ่าน E-Book</a>
            </div>
        )
    }

    imageFormatter2(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <a href={row.url2}>E-Book ไฟล์สำรอง</a>
            </div>
        )
    }

    imageFormatter3(cell, row) {
        return "<img src='" + row.image + "'/>";
    }

    convertDate(cell, row, enumObject, index) {
        return (
            <div>
                {new Date(row.dateandtime).getDate()}/
                {new Date(row.dateandtime).getMonth() + 1}/
                {new Date(row.dateandtime).getFullYear()}
            </div>
        )
    }

    render() {
        return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

                {this.addProducts(this.state.ebooks.length)}
                <BootstrapTable data={products} search>
                    <TableHeaderColumn
                        dataField='id' isKey
                        dataAlign="center" headerAlign='center'
                        width="100"
                    >Product ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="image"
                        dataFormat={this.imageFormatter3}
                        dataAlign="center" headerAlign='center'
                        width="140"
                    >ปกหนังสือ
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='name'
                        dataAlign="center" headerAlign='center'
                        width="300"
                    >name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="url1"
                        dataFormat={this.imageFormatter}
                        dataAlign="center" headerAlign='center'
                        width="120"
                    >E-Book
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="url2"
                        dataFormat={this.imageFormatter2}
                        dataAlign="center" headerAlign='center'
                        width="160"
                    >E-Book Backup
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='librarian'
                        dataAlign="center" headerAlign='center'
                        width="200"
                    >บรรณารักษ์
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='dateandtime' width='140' headerAlign='center'
                        dataFormat={this.convertDate.bind(this)}
                    >วันที่เพิ่ม E-Book</TableHeaderColumn>

                </BootstrapTable>
            </Ons.Page>
        )
    }
}

class E_Book extends React.Component {
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
            <Ons.Navigator initialRoute={{component: E_BookPage1, props: {key: 'E_BookPage1'}}}
                           renderPage={this.renderPage.bind(this)} ref={(navigator) => {
                this.navigator = navigator;
            }}/>
        );
    }
}

export default E_Book