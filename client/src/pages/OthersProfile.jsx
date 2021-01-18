import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class OthersProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const currUser = AuthService.getCurrentUser();
    if (currUser && this.props.match.params.name === currUser.data.username) {
      window.location.href = "/profile";
    }
    if (!currUser) {
      window.location.href = "/login";
    }
  }
  render() {
    return <>ahi</>;
  }
}
