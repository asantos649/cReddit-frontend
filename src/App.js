import React from "react";
import "./App.css";
import MainContainer from "./containers/MainContainer";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    loggedInUser: {}
  };

  handleSignUp = userData => {
    userData.credibility = 100;

    fetch("http://localhost:3000/users", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: userData })
    })
      .then(res => res.json())
      .then(resp => {
        if (resp.code !== 69) {
          this.setState({
            loggedInUser: resp
          });
        } else if (resp.code === 69) {
          alert("This Username has already been taken.");
        }
        return resp;
      })
      .then(resp => {
        if (resp.code !== 69) {
          localStorage.setItem("token", resp.token);
          this.props.history.push("/");
        }
      });
  };

  handleLogin = userData => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: userData })
    })
      .then(res => res.json())
      .then(resp => {
        this.setState({
          loggedInUser: resp["user"]
        });
        localStorage.setItem("token", resp.token);
      })
      .then(() => {
        this.props.history.push("/");
      });
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/user_profile", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          accepts: "application/json",
          Authorization: `${token}`
        }
      })
        .then(resp => resp.json())
        .then(res => {
          this.setState({
            loggedInUser: res["user"]
          });
        });

      this.props.history.push(this.props.location.pathname);
    } else if (this.props.location.pathname === "/signup") {
      return null;
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="App">
        <MainContainer
          loggedInUser={this.state.loggedInUser}
          handleSignUp={this.handleSignUp}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

export default withRouter(App);
