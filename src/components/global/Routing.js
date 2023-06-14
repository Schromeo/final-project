import React, {useContext, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../../App';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from '../../firebase.js';
import GuestHome from '../../screens/GuestHome';
import UserHome from '../../screens/UserHome';
import Navbar from './Navbar';

export default function Routing() {
    const { user, setUser } = useContext(AuthContext);
    const [authStateChanged, setAuthStateChanged] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (firstRender || authStateChanged) {
                setUser(user);
            }
        })

        // means the page was alredy initially rendered
        setFirstRender(false);
        
        return () => unsubscribe();
    }, [authStateChanged, firstRender, setUser]);

    return (
        <Router>
            <Navbar />
            {user ? (
                <Routes>
                    <Route exact path='/' element={<UserHome />} />
                </Routes>
            ) : (
                <Routes>
                    <Route exact path='/' element={<GuestHome />} />
                </Routes>
            )}
        </Router>
    )
}