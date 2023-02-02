// import { render } from "@testing-library/react";
import React, { Component } from "react";
import Comments from "./Comments";

export default class Home extends Component {
  state = {
    userData: "",
  };

  componentDidMount() {
    fetch("https://apple-wiry-elf.glitch.me/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

  render() {
    // const { name, email } = this.state;
    // console.log(name);
    return (
      <>
        <nav className="shadow navbar navbar-light bg-light fixed-top p-3 mr-5 ml-5">
          <div className="container-fluid">
            <a href="/home" className="navbar-brand logo-style">
              COMMENT
            </a>

            <div className="d-flex"></div>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-dark">
                <li className="name">{this.state.userData.name}</li>
                <li className="email">{this.state.userData.email}</li>
                <li className="text-center">
                  <button type="button" className="btnn">
                    <a className="anchor-logout" href="/sign-in">
                      Log out
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Comments />
      </>
    );
  }
}
