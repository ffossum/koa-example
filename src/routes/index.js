import React from 'react';
import {IndexRoute, Route} from 'react-router';
import MainPage from 'containers/MainPage';
import Play from 'components/Play';
import About from 'components/About';
import LoginForm from 'containers/forms/LoginForm';
import RegisterUserForm from 'containers/forms/RegisterUserForm';
import Nav from 'containers/Nav';

import styles from 'client/client.css';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={MainPage} />
    <Route path="play" component={Play} />
    <Route path="about" component={About} />

    <Route path="login" component={LoginForm} />
    <Route path="register" component={RegisterUserForm} />
  </Route>
);
