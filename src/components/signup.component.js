import React, { Component } from "react";

export default class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: null,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    // console.log(name, email, password);
    fetch("https://apple-wiry-elf.glitch.me/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow_Origon": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data, "User Registered");
        if (data.status === "ok") {
          window.location.href = "/sign-in";
        } else if (data.error === "User exists") {
          this.setState({ error: "User Already Exists" });
        }
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.onSubmit}>
            <h3>Sign Up</h3>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label>Name</label>
              <input
                value={this.state.name}
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                value={this.state.email}
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                value={this.state.password}
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="btn-container">
              <button type="submit" className="sign-in-btn">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
