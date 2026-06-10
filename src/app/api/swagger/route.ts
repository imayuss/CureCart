import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CureCart E-Commerce API',
      version: '1.0.0',
      description: 'The internal API used by CureCart for Checkout, AI Verification, and Cart Management.',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
  apiFolder: 'src/app/api',
});

export default swaggerHandler();
