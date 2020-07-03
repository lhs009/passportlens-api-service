/*
  function: createCustomer
  description: 고객 ID/PASSWORD 로그인으로 인증 처리 하기위한 고객 정보 생성 (미 사용)
  writer: Lee Hwansoo
  createdAt: 2020/06/30
  updatedAt: 2020/06/30
*/
"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const httpStatus = require("../common/httpStatus");
const { createErrorResponse, createResponse } = require("../lib/utils");

module.exports.createCustomer = async (event, context) => {
  const { loginId, password } = JSON.parse(event.body);

  if (!loginId || !password) {
    return createErrorResponse(httpStatus.InvalidRequestData);
  }

  //const timestamp = new Date().getTime();

  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.DYNAMODB_CUSTOMERS_TABLE,
    Item: {
      loginId: loginId.trim(),
      password: password.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    const data = await dynamoDb.put(params).promise();
    return createResponse(httpStatus.OK, data);
  } catch (error) {
    console.log(error);
    return createErrorResponse(httpStatus.ServiceUnavailable);
  }
};
