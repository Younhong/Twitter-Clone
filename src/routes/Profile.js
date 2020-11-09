import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'firebaseInstance';
import { useHistory } from 'react-router-dom';

export default ({userObj, refreshUser}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweet = async() => {
        const nweets = await dbService
            .collection("nweets")
            .where('creatorId', '==', userObj.uid)
            .orderBy('createdAt')
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    };
    useEffect(()=> {
        getMyNweet();
    }, []);
    return <>
        <form onSubmit={onSubmit}>
            <input type="text"
                value={newDisplayName}
                onChange={onChange}
                placeholder="Display Name" />
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onLogoutClick}>Log Out</button>
    </>
};