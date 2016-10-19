/* globals apiUrl */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchUserInfo } from 'store/user'

import './Header.scss'
import toiletPaperImage from './images/toilet-paper.svg'
import logoutImage from './images/logout.svg'
import addImage from './images/add.svg'
import avatarImage from './images/avatar.svg'

export class Header extends Component {

  componentDidMount () {
    const { fetchUserInfo } = this.props

    fetchUserInfo()
  }

  render () {
    const { user } = this.props

    return (
      <div className='top-bar'>
        <div className='logo-and-brand vertically-centered-content'>
          <img className='logo' src={toiletPaperImage} />
          <span className='brand'>Peldikusein</span>
        </div>

        <div className='controls'>
          {user
            ? <span>
              <Link className='link vertically-centered-content add' to='/upload'>
                <img src={addImage} />
                <span className='text'>add</span>
              </Link>
              <button className='link vertically-centered-content username'>
                <img src={logoutImage} />
                <span className='text'>{user.username}</span>
              </button>
            </span>
            : <a className='link vertically-centered-content login ' href={apiUrl + '/authenticate'}>
              <img src={avatarImage} />
              <span className='text'>login</span>
            </a>}
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  fetchUserInfo: React.PropTypes.func.isRequired,
  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.null
  ])
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  fetchUserInfo
}

export default connect(mapStateToProps, mapActionsToProps)(Header)
