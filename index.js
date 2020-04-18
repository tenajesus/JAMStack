const express = require('express');
// import GraphQL
const { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql } = require('graphql');

const app = express();
// Creating our schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            message: {
                type: GraphQLString,
                // resolver
                resolve() {
                    return "Hola Mundo"
                }
            }
        }
    })
});

app.get('/', function (req, res) {
    // res.send("Hola Mundo")
    // Call function graphql for query -> graphql(schema, `{ data }`)
    graphql(schema, `{message}`).
    then(r => res.json(r))
    .catch(res.json);
});

let port = 8080;
app.listen(port, function () {
    console.log("Servidor inciado en el puerto:" + port)
})