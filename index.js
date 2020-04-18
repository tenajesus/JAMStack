const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send("Hola Mundo")
});

let port = 8080;
app.listen(port,function(){
    console.log("Servidor inciado en el puerto:" + port)
})