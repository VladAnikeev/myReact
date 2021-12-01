import React from "react";
import Login from "./login";
import firebase from "firebase/app";
import { firebaseApp } from "../base";

class SignIn extends React.Component {
    state = {
        user: ""
    };

    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {//пользователь вошел, записоваем в user
                    this.authHandler({ user });
                };
            });
    };

    //извлекаем почту и записоваем 
    authHandler = async (authData) => {
        const { email } = authData.user;
        this.setState({ user: email });
    };
    //получаем регистрацию пользователя
    authenticate = () => {
        const authProvider = new firebase.auth["GithubAuthProvider"]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    render() {
        if (!this.state.user) {//если не зарегистрирован
            return <Login authenticate={this.authenticate} />
        };//если да, то загружаем контент
        return this.props.children;
    };
};

export default SignIn;