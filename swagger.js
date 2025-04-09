// swagger.js
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Your API Title',
        description: 'Description of your API',
    },
    host: `localhost:${process.env.PORT || 5500}`, // Use the same port as your server
    schemes: ['http'], // Or ['http', 'https'] if you use HTTPS
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/authRoutes.js', './routes/users.routes.js', './routes/notes.routes.js', './routes/static.routes.js'];
// Add paths to ALL your route files here

swaggerAutogen(outputFile, endpointsFiles, doc);