import React from "react";
import "./App.css";
import MainContainer from "./containers/MainContainer";
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component{

  state ={
    loggedInUser: {}
  }

    //Sigup

    handleSignUp = (userData) => {

      userData.credibility = 100

      console.log(userData)

  
      fetch('http://localhost:3000/users', {
        method: 'Post',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(userData)
      })
        .then(res => res.json())
        .then(resp => {
          this.setState({
            loggedInUser: resp
          })
          localStorage.setItem('token', resp.token)
        })
      
    }

    componentDidMount(){

      let token = localStorage.getItem('token')
      if (token){
        fetch('http://localhost:3000/user_profile',{
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            accepts: 'application/json',
            Authorization: `${token}`
          }
        })
        .then(resp => resp.json())
        .then(res => {
          this.setState({
            loggedInUser: res['user']
          })
        })
      }
      
    }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <MainContainer loggedInUser={this.state.loggedInUser} handleSignUp={this.handleSignUp}/>
        </div>
      </BrowserRouter>
    );
  }

  
}

export default App;
