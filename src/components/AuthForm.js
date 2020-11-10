import { authService } from 'firebaseInstance';
import React, { useState } from 'react';

const AuthForm = () => {
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
    const toggleAccount = () => setNewAccount((prev) =>
        !prev
    );
    return (
        <>
            <form onSubmit={onSubmit}
                className="container">
                <input type="text" name="email"
                    placeholder="Email"
                    onChange={onChange}
                    required value={email}
                    className="authInput"/>
                <input type="password" name="password"
                    placeholder="Password" 
                    onChange={onChange}
                    required value={password}
                    className="authInput"/>
                <input type="submit" 
                    className="authInput authSubmit"
                    value={
                        newAccount 
                            ? "Create Account" 
                            : "Login" 
                } />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {
                    newAccount ? "SignIn" : "Create Account"
                }
            </span>
        </>
    );
};

export default AuthForm;