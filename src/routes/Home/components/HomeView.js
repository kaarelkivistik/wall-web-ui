import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setToken, fetchUserInfo } from 'store/user';

export class HomeView extends Component {

  componentDidMount() {
    const { newToken, setToken, fetchUserInfo } = this.props;

    if(newToken) {
      setToken(newToken)
      fetchUserInfo()
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        hello, {user ? user.name : "stranger"}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newToken: state.location.query.token,
    user: state.user,
  }
}

const mapActionsToProps = {
  setToken,
  fetchUserInfo,
}

export default connect(mapStateToProps, mapActionsToProps)(HomeView);
