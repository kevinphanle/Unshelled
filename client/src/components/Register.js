import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
import SessionCSS from "../Session.css"

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: "",
            firstName: "",
            lastName: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        console.log(data);
        // here we can write directly to our cache with our returned mutation data
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn }
        });
    }

    render() {
        return (
            <Mutation
                mutation={Mutations.REGISTER_USER}
                onCompleted={data => {
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {registerUser => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                registerUser({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password,
                                        username: this.state.username,
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                    }
                                });
                            }}
                        >
                            <input
                                value={this.state.username}
                                onChange={this.update("username")}
                                placeholder="Username"
                            />
                            <input
                                value={this.state.firstName}
                                onChange={this.update("firstName")}
                                placeholder="First Name"
                            />
                            <input
                                value={this.state.lastName}
                                onChange={this.update("lastName")}
                                placeholder="Last Name"
                            />
                            <input
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email"
                            />
                            <input
                                value={this.state.password}
                                onChange={this.update("password")}
                                type="password"
                                placeholder="Password"
                            />
                            <button type="submit">Register</button>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    }
}
