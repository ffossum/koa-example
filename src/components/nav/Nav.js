import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import GamesDropdown from './GamesDropdown';
import Gravatar from 'components/common/Gravatar';
import _ from 'lodash';

import styles from './nav.css';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut(e) {
    e.preventDefault();
    this.props.logOut();
  }
  render() {
    const { user, games } = this.props;

    return (
      <nav role="navigation" className={styles.navbar}>
        <ul className={styles.navgroup}>
          <li>
            <IndexLink
              to="/"
              className={styles.navlink}
            >Main</IndexLink>
          </li>
          <li>
            <Link
              to="/play"
              activeClassName={styles.active}
              className={styles.navlink}
            >Play</Link>
          </li>
          <li>
            <Link
              to="/about"
              activeClassName={styles.active}
              className={styles.navlink}
            >About</Link>
          </li>
        </ul>

        {
          user ?
            <ul className={styles.navgroup}>
              {
                games && !_.isEmpty(games) &&
                  <li><GamesDropdown games={games} /></li>
              }
              <li className={styles.user}>
                <Gravatar inline emailHash={user.emailHash} name={user.username} />{user.username}
              </li>
              <li><a className={styles.navlink} href="" onClick={this.handleLogOut}>Log out</a></li>
            </ul>
          :
            <ul className={styles.navgroup}>
              <li><Link className={styles.navlink} to="/login">Log in</Link></li>
              <li><Link className={styles.navlink} to="/register">Register</Link></li>
            </ul>
        }
      </nav>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    emailHash: PropTypes.string.isRequired,
  }),
  games: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};
