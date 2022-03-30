import React from "react";

const AVATAR_STYLE = {
    width: 32,
    textAlign: "center",
    fontSize: 24
};

export default function Avatar(props) {
    const { photoURL } = props.user;
    if(photoURL){
        // photoURL이 설정된 경우, img 요소 출력하기
        return <img className="img-rounded" src={photoURL} style={AVATAR_STYLE} />;
    }else{
        return (
            <div style={AVATAR_STYLE}>
                <span className="icon icon-user" />
            </div>
        )
    }
}