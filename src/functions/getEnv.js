/*
  function: getEnv
  description: lambda continaer에 API application을 위한 환경 변수 확인
  writer: Lee Hwansoo
  createdAt: 2020/06/30
  updatedAt: 2020/06/30
*/
"use strict";

const httpStatus = require("../common/httpStatus");
const config = require("../common/config");
const { createErrorResponse, createResponse } = require("../lib/utils");

module.exports.getEnv = async (event, context) => {
  return createResponse(httpStatus.OK, {
    env: process.env,
    config: config,
  });
};
