import React from "react";
import { hashHistory } from "react-router";
import RoomItem from "./RoomItem";
import firebase from "firebase/firebase-browser";

const ICON_CHAT_STYLE = {
    fontSize: 120,
    color: "#DDD"
}

const FORM_STYLE = {
    display: "flex"
}

const BUTTON_STYLE = {
    marginLeft: 10
}

export default class Rooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rommName: "",
            rooms: []
        };
        this.db = firebase.database();
    }

    componentDidMount() {
        // 컴포넌트 초기화 때에 채팅방 목록 추출하기
        this.fetchRooms();
    }

    handleOnChangeRoomName(e){
        this.setState({
            roomName: e.target.value
        });
    }

    // 새 채팅방 만들기 처리
    handleOnSubmit(e){
        const { roomName } = this.state;
        e.preventDefault();
        if(!roomName.length){
            return;
        }
        //Firebase 데이터베이스에 새로운 채팅방 데이터 만들기
        const newRoomRef = this.db.ref("/chatrooms").push();
        const newRoom = {
            description: roomName
        };
        // 생성한 채팅방의 description 변경하기
        newRoomRef.update(newRoom).then(() => {
            //상태를 다시 초기화하기
            this.setState({ roomName: ""});
            // 채팅방 목록 다시 가져오기
            return this.fetchRooms().then(() => {
                //오른쪽 패널을 생성한 상세 화면으로 변경하기
                hashHistory.push(`/rooms/${newRoomRef.key}`);
            })
        })
    }

    // 채팅방 목록 추출 처리
    fetchRooms(){
        return this.db.ref("/chatrooms").limitTolLast(20).once("value")
            .then(snapshot => {
                const romms = [];
                snapshot.forEach(item => {
                    // 데이터베이스에서 추출한 데이터를 객체로 할당하기
                    rooms.push(Object.assign({ key: item.key }, item.val()));
                })
                // 가져온 객체 배열을 컴포넌트 state에 설정
                this.setState({ rooms });
            });
    }

    // 왼쪽 패널(채팅방 목록) 렌더링 처리
    renderRoomList() {
        const { roomId } = this.props.params;
        const { rooms, roomName } = this.state;
        return (
            <div className="list-group">
                {rooms.map(r => <RoomItem room={r} key={r.key} selected={r.key === roomId} />)}
                <div className="list-group-header">
                    <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                        <input type="text" className="form-control" placeholder="새로운 방" onChange={this.handleOnChangeRoomName} value={roomName} />
                        <button className="btn btn-default" style={BUTTON_STYLE}>
                            <span className="icon icon-plus"/>
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // 오른쪽 패널(채팅방 상세) 렌더링 처리
    renderRoom(){
        if(this.props.children){
            return this.props.children;
        }else{
            return (
                <div className="text-center">
                    <div style={ICON_CHAT_STYLE}>
                        <span className="icon icon-chat" />
                    </div>
                    <p>Join a chat room from the sidebar or create your chat room.</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="pane-group">
                <div className="pane-sm sidebar">{this.renderRoomList()}</div>
                <div className="pane">{this.renderRoom()}</div>
            </div>
        )
    }
}