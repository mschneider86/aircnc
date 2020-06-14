const express = require("express");

const routes = express.Router();

routes.post("/users", (request, response) => {
  return response.json(request.body);
});

module.exports = routes;
