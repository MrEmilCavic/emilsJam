import React, { useState, useCallback } from 'react';
import "./style/UserProfile.css";

const UserProfile = (props) => {

    if(!props.name) {
        return (
        <button className="LoginButton" onClick={props.onLogIn}>Login</button>
        )
    } else {
        return (
            <div className="Userprofile">
                <h2>Hello <b>{props.name}!</b></h2><img src={props.image} />  
            </div>
        )
    }
};

export default UserProfile;