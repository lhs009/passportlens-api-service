"use strict";

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

module.exports = {
  createResponse,
  createErrorResponse,
};
