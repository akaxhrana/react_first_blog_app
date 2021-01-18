import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import "../styles/css/forms.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  componentDidMount() {
    if (AuthService.getCurrentUser()) {
      window.location.href = "/profile";
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          window.location.href = "/profile";
        },
        (error) => {
          setTimeout(function () {
            window.location.reload();
          }, 1000);

          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="container-fluid ">
        <div className="row  justify-content-md-center">
          <div id="form-header-log" className="col-md-4 m-5 pt-5 shadow ">
            <div className="mb-5 text-center">
              <h2>
                <strong id="form-heading">Log In</strong>
              </h2>
            </div>

            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="row text-center justify-content-center">
                <label className="col-md-12" htmlFor="username">
                  Username
                </label>

                <Input
                  type="text"
                  id="input-field-form"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  required
                />
              </div>

              <div className="row text-center justify-content-center">
                <label className="col-md-12" htmlFor="password">
                  Password
                </label>
                <Input
                  type="password"
                  id="input-field-form"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </div>

              <div className="row justify-content-center">
                <button
                  id="form-button"
                  className="btn btn-primary btn-block "
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
