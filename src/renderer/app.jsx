import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";
import firebase from "firebase/firebase-browser";

// Routing 정의하기
const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path='login' component={Login} />
            <Route path='Signup' component={Signup} />
            <Route path='Rooms' component={Rooms}>
                <Route path=':roomId' component={Room} />
            </Route>
        </Route>
    </Router>
);

// Routing 초기화하기
if(!location.hash.length){
    location.hash = "#/login";
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvDbVto3gUZq72fcY-Wb1_u2a-_96Chng",
    authDomain: "electron-chat-5e4d7.firebaseapp.com",
    projectId: "electron-chat-5e4d7",
    storageBucket: "electron-chat-5e4d7.appspot.com",
    messagingSenderId: "220209157179",
    appId: "1:220209157179:web:32090a81760c21693af81e",
    measurementId: "G-SZLBJ2Y07Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Application 렌더링하기
render(appRouting, document.getElementById("app"));