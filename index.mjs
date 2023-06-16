import './db.mjs';
import mongoose from 'mongoose';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as fs from 'fs';
import {toast} from 'react-toastify';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// if mongoose is connected, set
const User = mongoose.model('User');
const ShoppingCart = mongoose.model('ShoppingCart');
const Item = mongoose.model('Item');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/user', (req, res) => {
    console.log("user in backend is: ", req.query)
    // get email and password from paramter "/user?email=...&password=..."
    const email = req.query.email;
    const password = req.query.password;
    // find user with email and password
    User.findOne({ email_address: email, password: password }).then((user) => {
        // if user is found, return user
        if (user) {
            res.json(user);
        } else {
            // if user is not found, return null
            res.json(null);
        }
    });
});

app.post('/user', async (req, res) => {
    console.log("user is: ", req.body)
    const user = new User({...req.body, email_address: req.body.email});
    console.log("mongoose user is: ", user)
    await user.save()
        .then((savedUser) => {
            console.log("user is: ", savedUser);
            res.json(savedUser);
            toast.success('User created successfully');
        })
        .catch((err) => {
            console.error(err);
            toast.error('User creation failed');
            res.status(500).json({ error: 'User creation failed' });
        });
});

app.listen(process.env.PORT || 3000);