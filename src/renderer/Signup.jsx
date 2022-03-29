import React from "react";
import { Link } from "react-router";

export default class Signup extends React.Component {
    render() {
        return (
            <div>
                <h2>Sigup</h2>
                <Link to="/rooms">Create new account</Link> <br />
                <Link to="/login">cancel</Link> <br />
            </div>
        )
    }
}