"use strict";

const jwt = require("jsonwebtoken");

const createErrorResponse = (error) => {
  const response = {
    statusCode: error.status,
    body: JSON.stringify({
      error: error.message,
    }),
  };

  return response;
};

const createResponse = (statusCode, body) => {
  const response = {
    statusCode,
    body: JSON.stringify(body),
  };

  return response;
};

const generateToken = (secret, option, payload) => {
  try {
    let token = jwt.sign(payload, secret, option);
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createResponse,
  createErrorResponse,
  generateToken,
};
