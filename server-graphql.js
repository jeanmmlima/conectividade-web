var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { argsToArgsConfig } = require('graphql/type/definition');

const jogos = [
  {
    id: 1,
    nome: 'FFVII',
    nivel: 'Dificil'
  },
  {
    id: 2,
    nome: 'FFIX',
    nivel: 'Medio'
  }
]
 
var schema = buildSchema(`
  type Query {
    idade: Int
    salario: Float
    nome: String
    ativo:Boolean
    id: ID
    endereco: Address
    jogos: [Jogo]
  }
  type Address {
      rua: String
      numero: Int
  }
  type Jogo {
    nome: String
    nivel: String
  }
`);

const { endereco } = {rua: 'leonel',numero:14};
 
var resolvers = {
  
  idade: () => 28,
  salario: () => 1000.54,
  nome:() => 'Jean',
  ativo:() => true,
  endereco:() => {
    return {rua: 'teste',numero:13};
  },
  jogos:() => {
    return jogos;
  }

};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));