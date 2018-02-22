var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

import Menu from './Menu'
import MenuLib from './MenuLib'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
    };
  }

  handleClickSignIn() {
    fetch('http://localhost:8080/api/users/search/findByUsernameAndPassword?'+
     'username=' + this.state.Username + '&password=' + this.state.Password)
     .then((response)=> response.json()).then((responseJson) => {
        console.log(responseJson._embedded.type.type)
        if(responseJson._embedded.type.type == 'member'){
          ons.notification.alert('สมาชิก : ' + this.state.Username + ' เข้าสู่ระบบ' );
          this.props.navigator.pushPage({ component: Menu,
              props: { key: 'Menu' , Username:this.state.Username
              } });
        }else{
          ons.notification.alert('บรรณารักษ์  : ' + this.state.Username + ' เข้าสู่ระบบ');
          this.props.navigator.pushPage({ component: MenuLib,
            props: { key: 'MenuLib' , Username:this.state.Username
            } });
        }
      }).catch((error) => {
        ons.notification.alert('Username or password incorrect!');
      });
  }


      renderToolbar() {
        return (
          <Ons.Toolbar>
            <div className='left'>
            </div>
            <div className='center'>ระบบห้องสมุด
            </div>
            <div className='right'>
            </div>
          </Ons.Toolbar>
        );
      }

      showMenu() {
        this.props.showMenu();
      }


      render() {
        return (
          <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
            <div style={{paddingTop:'55px',paddingLeft:'20px',paddingRight:'20px'}}>
            <center>
            <Ons.Card style={{width: '400px', backgroundColor: '#4385cd'}}>
            <h2>เข้าสู่ระบบ</h2>
            <Ons.Card>
            <section style={{textAlign: 'center'}}>

              <p><ons-icon size="30px"  icon="ion-person" style={{color: '#4385cd'}} />&nbsp;&nbsp;
                <Ons.Input
                  value={this.state.Username}
                  onChange={evt => this.setState({Username: evt.target.value})}
                  modifier='underbar'
                  float
                  placeholder='Username' />
              </p>
              <p><ons-icon size="30px"  icon="ion-key" style={{color: '#4385cd'}} />&nbsp;&nbsp;
                <Ons.Input
                  value={this.state.Password}
                  onChange={evt => this.setState({Password: evt.target.value})}
                  modifier='underbar'
                  type='password'
                  float
                  placeholder='Password' />
              </p>
              <p>
                <Ons.Button onClick={this.handleClickSignIn.bind(this)}>Sign in</Ons.Button>
              </p>
            </section>
            </Ons.Card>
            </Ons.Card>
            </center>
            </div>
          </Ons.Page>
        );
      }
    }

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
      this.loadPage = this.loadPage.bind(this);
    }

    hide() {
      this.setState({ isOpen: false });
    }

    show() {
      this.setState({ isOpen: true });
    }

    loadPage(page) {
      this.hide();
      this.navigator.resetPage({ component: page, props: { key: page } }, { animation: 'fade' });
    }

    renderPage(route, navigator) {
      route.props = route.props || {};
      route.props.navigator = navigator;
      route.props.showMenu = this.show.bind(this);

      return React.createElement(route.component, route.props);
    }

    render() {
      return (
        <Ons.Splitter>
          <Ons.SplitterContent>
            <Ons.Navigator initialRoute={{ component: HomePage, props: { key: 'HomePage' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
          </Ons.SplitterContent>
        </Ons.Splitter>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('react'));
