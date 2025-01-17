// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API do projeto Leia Imperatriz',
    description: 'API criada para o projeto Leia Imperatriz feito por professores e alunos do ensino superior do Instituto Federal de Educação - Campus Imperatriz'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);