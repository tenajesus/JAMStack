const express = require('express');
// import GraphQL
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const app = express();
// Creating our schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"RootQueryType",
        fields:{
            message:{
                type:GraphQLString,
                resolve(){
                    return "Hola Perros"
                }
            }
        }
    })
});

app.get('/', function (req, res) {
    res.send("Hola Mundo")
});

let port = 8080;
app.listen(port,function(){
    console.log("Servidor inciado en el puerto:" + port)
})