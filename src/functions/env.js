"use strict";
const httpStatus = require("../common/httpStatus");
const config = require("../common/config");
const { createErrorResponse, createResponse } = require("../lib/utils");

//AWS api g/w에 의해 호출 됨.
module.exports.variables = async (event, context) => {
  //return createErrorResponse(httpStatus.InvalidParameterId);

  return createResponse(httpStatus.OK, event);
};
