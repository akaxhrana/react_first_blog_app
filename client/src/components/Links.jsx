import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import "react-router";
import AuthService from "../services/auth.service";

const Collapse = styled.div.attrs({
  className: "collapse navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "collapse navbar-collapse ml-3",
})``;

class Links extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: "",
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user.data.username,
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.location.href = "/login";
  }
  render() {
    return (
      <React.Fragment>
        <Link to="/" className="navbar-brand">
          Blogs
        </Link>

        <Collapse>
          <List>
            <Item>
              <Link to="/posts/list" className="nav-link">
                All Posts
              </Link>
            </Item>
            {this.state.currentUser && (
              <Item>
                <Link to="/posts/create" className="nav-link">
                  New Post
                </Link>
              </Item>
            )}
            <Item>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </Item>
            <Item>
              <Link to="/contactUS" className="nav-link">
                Contact Us
              </Link>
            </Item>
          </List>
        </Collapse>

        <List>
          {!this.state.currentUser && this.props.location.pathname !== "/" && (
            <>
              <Link to="/Login" className="nav-link">
                <button
                  style={{ outline: "none" }}
                  className="btn btn-secondary btn-sm"
                >
                  Log In
                </button>
              </Link>

              <Link to="/register" className="nav-link">
                <button
                  style={{ outline: "none" }}
                  className="btn btn-warning btn-sm"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {!this.state.currentUser && this.props.location.pathname === "/" && (
            <>
              <h6 className="text-secondary m-1">Hi! Welcome</h6>
            </>
          )}

          {this.state.currentUser && (
            <div className="">
              <p className=" m-2 d-inline ">
                Logged in as:{" "}
                <a className="text-light text-decoration-none" href="/profile">
                  {this.state.currentUser}
                </a>
                &nbsp;
              </p>

              <button className="btn btn-danger btn-sm" onClick={this.logOut}>
                Log Out
              </button>
            </div>
          )}
        </List>
      </React.Fragment>
    );
  }
}

export default withRouter(Links);
