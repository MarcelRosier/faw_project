import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./cart/cart.route.js",
  "./products/products.route.js",
  "./users/users.route.js",
];

swaggerAutogen(outputFile, endpointsFiles);
