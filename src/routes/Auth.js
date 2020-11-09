import React, { useState } from 'react';
import { authService, firebaseInstance } from '../firebaseInstance';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                // create new account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                // login
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }   
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }
    const toggloeAccount = () => setNewAccount((prev) =>
        !prev
    );
    const onSocialClick = async(event) => {
        const {target:{name}} = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();            
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="email"
                    placeholder="Email"
                    onChange={onChange}
                    required value={email}/>
                <input type="password" name="password"
                    placeholder="Password" 
                    onChange={onChange}
                    required value={password}/>
                <input type="submit" value={
                    newAccount ? "Create Account" 
                        : "Login" 
                } />
                {error}
            </form>
            <span onClick={toggloeAccount}>
                {
                    newAccount ? "SignIn" : "Create Account"
                }
            </span>
            <div>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google</button>
                <button name="github" onClick={onSocialClick}>
                    Continue with Github</button>
            </div>
        </div>
    );
};
export default Auth;