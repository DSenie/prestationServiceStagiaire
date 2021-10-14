const express = require('express');
const mysql = require('mysql');
const sequelize = require('sequelize');
const path = require('path');



const app = express();

const dbconfig = require('./config/dbconfig');
const User = require('./model/Users');
const usersRoute = require('./route/usersRoute');
const bodyParser= require('body-parser');
const pdf = require('express-pdf');

// Database connection
dbconfig.authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(error);
    });
    

// create the model
dbconfig.sync() 
  .then(() => {
    console.log("table created");
}) .catch((error) => {
    console.log(error);
});


// Serve static files
app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/uploads')));



// Setup view engine
app.set('view engine', 'ejs');
app.set('views', 'view');

// get our app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(usersRoute);



app.use((req,res,next)=>{
    //sorte de securite de HTTP comme le ssl pour tout les pages (*)
    res.setHeader('Access-Control-Allow-Origin','*');

//pour les reponses
    //origine pour l'url d'origine
    //X-Requested-With pour identifier les requette XMLHttpRequest d'ajax
    //Accept  Accept indique quels sont les types de contenu, exprimés sous la forme de types MIME, que le client sera capable d'interpréter
    res.setHeader('Access-Control-Allow-Header',
        'Origin, X-Request-With, Content-Type, Accept, Authorization');

    //pour les requette
    res.setHeader('Access-Control-Allow-Method','GET, POST, PATCH, PUT, OPTIONS, DELETE');

    // si deux fonction en le mm  route (/utilisateur) donc le next va permetre de fermer le cycle de vie du premier et passe au deuxieme.
    //next(erreur) next avec un parametre veut declarer un erreur
    next();
});



app.use(bodyParser.json());
app.use(bodyParser.text());

module.exports = app;