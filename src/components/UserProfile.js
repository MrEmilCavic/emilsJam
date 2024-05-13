import React, { useState, useCallback } from 'react';

const UserProfile = (props) => {
    const [ userProfile, setUserProfile ] = useState([]);
    const handleLogIn = useCallback((event) => {
            setUserProfile(event.target.value);
        },[]
    );

    if(!props.name) {
        return (
        <button className="LoginButton" onClick={props.onLogIn}>Login</button>
        )
    } else {
        return (
            <div className="Userprofile">
                <h2>Logged in as <b>{props.name}</b></h2>
                <img src={props.image} />
            </div>
        )
    }
};

export default UserProfile;