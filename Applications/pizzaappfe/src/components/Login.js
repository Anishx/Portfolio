import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";
import APIAuthentication from "./APIAuthentication";
import Header from "./Header";
import Footer from "./Footer";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        };
    }
    handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    FormHeader = (props) => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    userLogin = (event) => {
        event.preventDefault();
        APIAuthentication
            .signin(this.state.username, this.state.password)
            .then(() => {
                console.log("Logged In successfully");
                this.props.history.push('/home');
            },
                error => {
                    this.setState({ error: "Invalid Credentials!" })
                }
            );
        console.log(this.state.username);
    }

    render() {
        return (
            <>
                <Header />
                <div id="loginForm">
                    <form onSubmit={this.userLogin}>
                        <h2 id="headerTitle">Login</h2>
                        <div class="row">
                            <input type="text" name="username" id="username" value={this.state.username} placeholder="Enter username" onChange={this.handleChange} required />
                            &nbsp;&nbsp;
                            <input type="password" name="password" id="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} required />
                            &nbsp;&nbsp;
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                            <a href="/register">Create an Account</a>
                        </div>
                        {
                            this.state.error && (
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            )
                        }
                    </form>

                </div>
                <Footer />
            </>
        );
    }
}