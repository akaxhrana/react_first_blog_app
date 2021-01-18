import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "" };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ username: user.data.username });
    }
  }
  render() {
    return <>{this.state.username}</>;
  }
}
