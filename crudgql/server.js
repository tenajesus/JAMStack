const express = require('express');
const { buildSchema } = require('graphql');
// Importamos express-graphql
const graphqlHTTP = require('express-graphql');
//Importamos docentes
const docentes = require('./docentes');

const app = express();

// Schema Definition Languaje
const schema = buildSchema(`
 type Docentes{
     id: ID!
     nombre: String!
     antiguedad : Int
     tipo: String!
 }
 
 type Query{
     getDocentes: [Docentes]
     getDocente(id:ID!): Docentes
 }

 type Mutation {
     addDocente(nombre: String!,antiguedad:Int,tipo:String!) : Docentes
     updateDocente(id:ID!,nombre:String!,antiguedad:Int,tipo:String!) : Docentes
 }


`); //usamos template Strings

// resolver
const root = {
    getDocentes() {
        return docentes;
    },
    // Metodo para obtener datos individuales
    getDocente({ id }) {
        console.log(id);
        return pofe = docentes.find((Docentes) => id == Docentes.id)
    },
    addDocente({ nombre, antiguedad,tipo }) {
        const id = String(docentes.length + 1);
        const pofe = { id, nombre, antiguedad,tipo};
        docentes.push(pofe);
        return pofe;
    },
    updateDocente({id,nombre,antiguedad,tipo}){
      const Index = docentes.findIndex((docente)=> id === docente.id);  
      const pofe = docentes[Index];
      const newPofe = Object.assign(pofe,{nombre,antiguedad,tipo});
      pofe[Index] = newPofe;
      return newPofe;
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