import swaggerAutogen from 'swagger-autogen';

const doc ={
    info:{
        title:'Knowledge API',
        description:'This is a rest API server for a LMS platform'
    },
    host:'localhost:4000'
}

const outputFile='./swagger-output.json';
const routes =['./app/routes/index.js'];

swaggerAutogen(outputFile,routes,doc)