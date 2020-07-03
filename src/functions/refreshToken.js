/*
  function: refreshToken
  description: api accessToken의 유효 기간이 만료 되거나 만료 되기 직전에 refreshToken을 통해 재 발급 처리
  writer: Lee Hwansoo
  createdAt: 2020/06/30
  updatedAt: 2020/06/30
*/
"use strict";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { tokenConfig } = require("../common/config");
const httpStatus = require("../common/httpStatus");
const {
  createErrorResponse,
  createResponse,
  generateToken,
  verifyToken,
} = require("../lib/utils");

const getApp = async (clientId, apiKey) => {
  // database에서 app clientId, clientSecret 정보 조회
  let params = {
    TableName: process.env.DYNAMODB_APPS_TABLE,
    Key: { clientId, apiKey },
  };

  let data = await dynamoDb.get(params).promise();
  return data;
};

const updateToken = async (clientId, apiKey, refreshToken) => {
  // refresh token 생성 하고, app 정보 DB에 token 만료일 기록 ?
  let params = {
    TableName: process.env.DYNAMODB_APPS_TABLE,
    Key: {
      clientId,
      apiKey,
    },
    UpdateExpression:
      "set refreshToken = :refreshToken, updatedAt = :timestamp",
    ExpressionAttributeValues: {
      ":refreshToken": refreshToken,
      ":timestamp": new Date().toISOString(),
    },
  };

  let data = await dynamoDb.update(params).promise();
  console.log(JSON.stringify(data));
  return data;
};

/*
  1. api key 확인
  2. refreshToken 확인 in Authorization Bearer
  3. verify token
  4. accessToken, refreshToken 발급 처리
*/
module.exports.refreshToken = async (event, context) => {
  // apiKey from http header X-api-key
  const apiKey = event.headers["x-api-key"];
  const { Authorization } = event.headers;
  const token = Authorization && Authorization.split(" ")[1];

  // api key 확인
  if (!apiKey) {
    console.log("no api key:", apiKey);
    return createErrorResponse(httpStatus.InvalidParameters);
  }

  // refreshToken 만료 확인
  let result = verifyToken(token, tokenConfig.refreshToken.secret);
  if (result.success == false) {
    return createErrorResponse(result.data);
  }

  try {
    let clientId, accessToken, refreshToken;
    clientId = result.data.clientId;
    // clientId 정보 존재 확인 후 accessToken, refreshToken 재 발급
    let data = await getApp(clientId, apiKey);
    if (!data || !data.Item) {
      return createErrorResponse(httpStatus.AppNotFound);
    }
    // refreshToken DB 검증
    if (token !== data.Item.refreshToken) {
      return createErrorResponse(httpStatus.InvalidRefreshToken);
    }
    // accessToken 생성
    accessToken = generateToken(
      tokenConfig.accessToken.secret,
      tokenConfig.accessToken.option,
      { clientId }
    );
    // refreshToken 생성
    refreshToken = generateToken(
      tokenConfig.refreshToken.secret,
      tokenConfig.refreshToken.option,
      { clientId }
    );
    // refresh token app 정보 DB에 저장
    await updateToken(clientId, apiKey, refreshToken);

    return createResponse(httpStatus.OK, {
      accessToken,
      expiresIn: tokenConfig.accessToken.option.expiresIn,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return createErrorResponse(httpStatus.InternalServerError);
  }
};
/*
access_token은 발급 받은 후 24시간(정책에 따라 변동 가능)동안 유효합니다. 
refresh token은 한달간 유효하며, 토큰 갱신 요청을 하면 갱신된 access token과 
갱신된 refresh token이 함께 반환됩니다.
*/
