import React from 'react';
import APIAuthentication from "./APIAuthentication";

export default class Home extends React.Component {

    /*  logOut = (event) => {
         event.preventDefault();
         APIAuthentication.signOut()
             .then(() => {
                 console.log("Logged Out successfully");
                 this.props.history.push('/login');
             },
                 error => {
                     this.setState({ error: "Invalid Credentials!" })
                 }
             );
         console.log(this.state.username);
     } */

    logOut = () => {
        APIAuthentication.signOut();
        this.props.history.push('/');
        window.location.reload();
    }

    render() {
        return (
            <>
                <div style={{ color: "white" }}>
                    <h1>HOME</h1>
                    <button onClick={this.logOut} style={{ color: "white" }}>Log Out</button>
                </div>
            </>
        );
    }
}