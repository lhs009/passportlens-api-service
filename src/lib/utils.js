"use strict";

const jwt = require("jsonwebtoken");
const httpResponse = require("../common/httpStatus");

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
  // const response = {
  //   statusCode,
  //   body: JSON.stringify(body),
  // };

  return !body || Object.keys(body).length === 0
    ? { statusCode }
    : { statusCode, body: JSON.stringify(body) };
};

const generateToken = (secret, option, payload) => {
  try {
    let token = jwt.sign(payload, secret, option);
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token, secret) => {
  let result = {
    success: false,
    data: null,
  };
  try {
    const decoded = jwt.verify(token, secret);
    result.success = true;
    result.data = decoded;
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      result.data = httpResponse.tokenExpired;
      // } else if (
      //   error.name === "JsonWebTokenError" ||
      //   error.name === "NotBeforeError"
      // ) {
      //   result.data = httpResponse.InvalidToken;
    } else {
      result.data = httpResponse.InvalidToken;
    }
  }

  return result;
};

module.exports = {
  createResponse,
  createErrorResponse,
  generateToken,
  verifyToken,
};
