/*
  function: registerApp
  description: 고객 App 정보 등록. 인증을 위한 app 별 apiKey, clientId, clientSecret 등록
  writer: Lee Hwansoo
  createdAt: 2020/06/30
  updatedAt: 2020/06/30
*/
"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const httpStatus = require("../common/httpStatus");
const { createErrorResponse, createResponse } = require("../lib/utils");

module.exports.registerApp = async (event, context) => {
  const { apiKey, clientId, clientSecret } = JSON.parse(event.body);

  if (!apiKey || !clientId || !clientSecret) {
    return createErrorResponse(httpStatus.InvalidRequestData);
  }

  // app 등록 중복 check 로직 추가 필요
  //const timestamp = new Date().getTime();
  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.DYNAMODB_APPS_TABLE,
    Item: {
      clientId: clientId.trim(),
      clientSecret: clientSecret.trim(),
      apiKey: apiKey.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    const data = await dynamoDb.put(params).promise();
    console.log(JSON.stringify(data));
    return createResponse(httpStatus.OK, data);
  } catch (error) {
    console.log(error);
    return createErrorResponse(httpStatus.ServiceUnavailable);
  }
};
