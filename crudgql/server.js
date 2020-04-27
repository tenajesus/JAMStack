const express = require('express');
const { buildSchema } = require('graphql');
// Importamos express-graphql
const graphqlHTTP = require('express-graphql');
//Importamos docentes
let docentes = require('./docentes');

const app = express();

// Schema Definition Languaje
const schema = buildSchema(`
 type Docentes{
     id: ID!
     nombre: String!
     antiguedad : Int
     tipo: String!
 }
 
 input DocentesInput{
    nombre: String!
    antiguedad:Int
    tipo:String!
 }
 type Alerta{
     result:String
 }

 type Query{
     getDocentes(page: Int, limit: Int = 2): [Docentes]
     getDocente(id:ID!): Docentes
 }

 type Mutation {
     addDocente(input: DocentesInput) : Docentes
     updateDocente(id:ID!,nombre:String!,antiguedad:Int,tipo:String!) : Docentes
     deleteDocente(id:ID!): Alerta
 }


`); //usamos template Strings

// resolver
const root = {
    getDocentes({ page, limit }) {
        if (page !== undefined) {
            return docentes.slice(page * limit, (page + 1) * limit);
        }
        return docentes;
    },
    // Metodo para obtener datos individuales
    getDocente({ id }) {
        console.log(id);
        return pofe = docentes.find((Docentes) => id == Docentes.id)
    },
    addDocente({ input }) {
        const { nombre, antiguedad, tipo } = input;
        const id = String(docentes.length + 1);
        const pofe = { id, nombre, antiguedad, tipo };
        docentes.push(pofe);
        return pofe;
    },
    updateDocente({ id, nombre, antiguedad, tipo }) {
        const Index = docentes.findIndex((docente) => id === docente.id);
        const pofe = docentes[Index];
        const newPofe = Object.assign(pofe, { nombre, antiguedad, tipo });
        pofe[Index] = newPofe;
        return newPofe;
    },
    deleteDocente({ id }) {
        docentes = docentes.filter((docente) => docente.id != id);
        return {
            result: `Se ha eliminado el profesor con id ${id}` //template strings
        }
    }
}

app.get('/', function (req, res) {
    // res.send("Bienvenido");
    // enviamos el JSON a la vista
    res.json(docentes);
});
// Usamos graphqlHttp
app.use('/servergql', graphqlHTTP({
    // shorthandproperties
    schema,
    rootValue: root,
    graphiql: true //Entorno grafico para consultas GraphQl
}));

app.listen(8080, function () {
    console.log("Servidor Inciado en el puerto 8080");
});