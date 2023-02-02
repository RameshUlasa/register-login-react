import React, { Component } from "react";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    // console.log(email, password);
    fetch("https://apple-wiry-elf.glitch.me/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./Home";
        } else if (
          data.error === "Invalid Password" ||
          data.error === "User Not found"
        ) {
          this.setState({ error: "Invalid UserName or Password" });
        }
      });
  };

  render() {
    const { email, password, error } = this.state;
    const isFormValid = email.length > 0 && password.length > 0;

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.onSubmit}>
            <h3>Sign In</h3>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="btn-container">
              <button
                type="submit"
                className="sign-in-btn"
                disabled={!isFormValid}
              >
                Login
              </button>
            </div>
            <p className="forgot-password text-right">
              Don't have an account <a href="/sign-up">Register now</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
