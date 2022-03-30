import React from "react";
import { Link } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";
import { hashHistory } from "react-router";

const FROM_STYLE = {
    margin: "0 auto",
    padding: 30
}

const SIGNUP_LINK_STYLE = {
    display: "inline-block",
    marginLeft: 10
}

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: localStorage.userEmail || "",
            password: localStorage.userPassword || "",
            errors: [],
        };
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChangeEmail(e){
        this.setState({email: e.target.value});
    }

    handleOnChangePassword(e){
        this.setState({password: e.target.value});
    }

    // 로그인 처리
    handleOnSubmit(e){
        const { email, password} = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();
        if(!email.length){
            isValid = false;
            errors.push("Email이 없다");
        }
        if(!password.length){
            isValid = false;
            errors.push("비밀번호를 입력해라");
        }
        if(!isValid){
            // 필수 입력 유효성 검사를 통과하지 못하면 오류 출력하기
            this.setState({errors});
            return;
        }

        //firebase 로그인 처리
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            // 다음 접속 때 로그인을 생략할 수 있게 localStorage에 저장하기
            localStorage.userEmail = email;
            localStorage.userPassword = password;

            // 채팅방 목록 화면으로 이동하기
            hashHistory.push("/rooms");
        }).catch(() => {
            // Firebase에서 오류가 발생한 경우
            this.setState({ errors: ["이메일 또는 비번 틀림"]});
        });
    }

    render() {
        return (
            <form style={FROM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessges={this.state.errors} />
                <div className="form-group">
                    <label>Email 주소</label>
                    <input type="email" className="form-control" placeholder="email" onChange={this.handleOnChangeEmail} value={this.state.email} />
                </div>
                <div className="form-group">
                    <label>비밀번호</label>
                    <input type="password" className="form-control" placeholder="password" onChange={this.handleOnChangePassword} value={this.state.password} />
                </div>
                <div className="form-group">
                    <button className="btn btn-large btn-default">Login</button>
                    <div style={SIGNUP_LINK_STYLE}>
                        <Link to="/signup">Create new account</Link>
                    </div>
                </div>
            </form>
        )
    }
}