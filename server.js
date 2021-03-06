const express = require('express');

const app = express();
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const database = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, database, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)})

app.put('/image', (req, res) => {image.handleImage(req, res, database)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, database)});

app.listen(process.env.PORT || 3001, ()=> {
    console.log(`App is running on port ${process.env.PORT}`);
})