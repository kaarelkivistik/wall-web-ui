import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import './Header.scss';
import toiletPaperImage from './images/toilet-paper.svg';
import logoutImage from './images/logout.svg';
import addImage from './images/add.svg';
import avatarImage from './images/avatar.svg';

export class Header extends Component {
	render() {
		const { user, onClickAddButton } = this.props;

		return (
			<div className="top-bar">
					<div className="logo-and-brand">
            <img className="logo" src={toiletPaperImage}/>
            <div className="brand">Peldikusein</div>
					</div>

					<div className="controls">
						{user ? 
              <span>
                <button className="link username">
                  <img src={logoutImage}/>
                  <span className="text">{user.username}</span>
                </button> 
                <Link className="link add" to="/upload">
                  <img src={addImage}/>
                  <span className="text">add</span>
                </Link>
              </span>: 
              <a className="link login" href={apiUrl + "/authenticate"}>
                <img src={avatarImage}/>
                <span className="text">login</span>
              </a>}
					</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(Header);
