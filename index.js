const express = require('express');
// import GraphQL
const { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql, GraphQLInt } = require('graphql');

const app = express();

const docentesType = new GraphQLObjectType({
    name: 'profes',
    fields: {
        name: { type: GraphQLString },
        categoria: { type: GraphQLString },
        antig: { type: GraphQLInt }
    }
});
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
            },
            profes: {
                type: docentesType,
                resolve() {
                    return { name: 'Jesus Salvador Rodriguez', categoria: 'PA', antig: 6 };
                }
            }
        }
    })
});

app.get('/', function (req, res) {
    // res.send("Hola Mundo")
    // Call function graphql for query -> graphql(schema, `{ data }`)
    graphql(schema, `{message, profes { name, categoria,antig } }`).
        then(r => res.json(r))
        .catch(res.json);
});

let port = 8080;
app.listen(port, function () {
    console.log("Servidor inciado en el puerto:" + port)
})