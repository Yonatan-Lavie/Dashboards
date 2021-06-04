import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import uuid from 'uuid';

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");


const withDB = async (operations, res) => {
    try {
        // create connection with mongoDB that runs on localhost in port 27017
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        
        // creating instance of db client  that connected to 'my-blog' data base
        const db = client.db('auth');
        await operations(db);

        //closing db connections
        client.close();
    
    } catch (error) {

        res.status(500).json({message: 'Error connecting to db', error});    

    }

}


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// CONSTENT 
const DAYINMILLISECOND = 60*60*24*1000;
const PORT = 8080;
// Charts API
app.get('/charts', validateToken, (req, res) => {
    res.status(200).json(fakeCharts);
});

app.post('/charts', (req, res) => {
    const { name } = req.body;
    if (name) {
        const insertedChart = {
            id: uuid(),
            createdAt: Date.now(),
            name: name,
        }
        fakeCharts.push(insertedChart);
        console.log('Insert {chart} = {', insertedChart, '}');
        res.status(200).json(insertedChart);
    } else {
        res.status(400).json({ message: 'Request body should have a text property' });
    }
});

app.delete('/charts/:id', (req, res) => {
    const { id } = req.params;
    const removedChart = fakeCharts.find(chart => chart.id === id);
    fakeCharts = fakeCharts.filter(chart => chart.id !== id);
    console.log('Removed {chart} = {', removedChart, '}');
    res.status(200).json(removedChart);
});

// JWT Authentication 
app.post('/register', (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10).then( (hash) => {
        withDB( async (db) => {
            // checks if user allredy exists in db
            let newUser = await db.collection("users").findOne({username: username});
            if(newUser !== null){
                res.status(400).json({message: 'user name is allrady exist!'});
                return;
            }
            console.log("REGISTRATION: \n", "username:",username,"password (hash):", hash)
            newUser = await db.collection("users").insertOne({
                username: username,
                password: hash
            });
            res.status(200).json("USER REGISTERED");
        },res);
    })
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    withDB( async (db) => {
        // checks if user is  a exists in db
        let user = await db.collection("users").findOne({
            username: username 
         });
         if(!user){
            res.status(400).json({message: 'Wroung Username or Password'});
        }
        else{
            // get the user password 
            const dbPassword = user.password
            // compare login password with in db user password
            bcrypt.compare(password, dbPassword).then((match) =>{
                // wrong password
                if(!match){
                    res.status(400).json({message: 'Wroung Username or Password'});
                }
                // correct password
                else{
                    // create token
                    const accessToken = createTokens(user);
                    // create cookie wit accessToken and stored in the user browser
                    // "httpOnly : true" is more secure way to send the access token cookie
                    // it will prevent from grab the cookie with the console in the browser.
                    res.cookie("access-token", accessToken, {
                        maxAge: DAYINMILLISECOND,
                        httpOnly: true,
                    })
    
                    res.status(200).json("LIGGED IN");
                }
            });
        }

    },res);
});

app.get('/profile', validateToken,(req, res) => {
    res.json("profile");
});


app.listen(PORT, () => console.log(`Express Server listening on port ${PORT}` ));
