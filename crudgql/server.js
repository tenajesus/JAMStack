const express = require('express');
const {buildSchema} = require('graphql');
const docentes = require('./docentes');

const app = express();

const schema = buildSchema(`
 type Docentes{
     id: ID!
     nombre: String!
     antiguedad : Int
     tipo: String!
 }
 
 type Query{
     getDocentes: [Docentes]
 }


`); //usamos template Strings

app.get('/', function (req, res) {
    // res.send("Bienvenido");
    // enviamos el JSON a la vista
    res.json(docentes);
});

app.listen(8080, function () {
    console.log("Servidor Inciado en el puerto 8080");
});