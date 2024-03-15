
import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";

import APIAuthentication from "./APIAuthentication";
import Header from "./Header";
import Footer from "./Footer";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            phone: "",
            email: "",
            error: ""
        };
    }
    handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    registerUser = (event) => {
        event.preventDefault();
        APIAuthentication.register(this.state.username, this.state.email, this.state.phone, this.state.password)
            .then(
                () => {
                    console.log("User Registered");
                    alert("Kindly use your credentials to Login");
                    this.props.history.push('/login');
                },
                error => {
                    this.setState({ error: "Incorrect Credentials" })
                }
            );
        console.log(this.state.username);
    }
    render() {
        return (
            <>
                <Header />
                <div id="loginForm">
                    <h2 id="headerTitle">Register</h2>
                    <form onSubmit={this.registerUser}>
                        <div class="row">
                            <input type="text" id="username" value={this.state.username} placeholder="Enter username" onChange={this.handleChange} required />
                            &nbsp;&nbsp;
                            <input type="password" id="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} required />
                            &nbsp;&nbsp;
                            <input type="tel" id="phone" value={this.state.phone} placeholder="Phone" onChange={this.handleChange} required />
                            &nbsp;&nbsp;
                            <input type="email" id="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} required />
                            &nbsp;&nbsp;
                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                            <a href="/login">Sign In</a>
                            {
                                this.state.error && (
                                    <Alert variant="danger">
                                        {this.state.error}
                                    </Alert>
                                )
                            }
                        </div>
                    </form>
                </div>
                <Footer />
            </>
        );
    }
}