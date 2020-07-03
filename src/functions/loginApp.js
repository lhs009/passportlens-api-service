/*
  function: loginApp
  description: application의 api 인증 인가를 획득하기 위한 인증 처리 JWT token 방식 (accessToken, refreshToken 발급)
  writer: Lee Hwansoo
  createdAt: 2020/06/30
  updatedAt: 2020/06/30
*/
"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const httpStatus = require("../common/httpStatus");
const { tokenConfig } = require("../common/config");
const {
  createErrorResponse,
  createResponse,
  generateToken,
} = require("../lib/utils");

/*
  1. api key 확인
  2. clientId/clientSecret credentials 확인 in Authorization Basic
  3. clientId/clientSecret 조회 in APP db table
  4. accessToken, refreshToken 발급 처리
*/
module.exports.loginApp = async (event, context) => {
  // apiKey from http header X-api-key
  const apiKey = event.headers["x-api-key"];
  // clientId/Secret 추출
  const Authorization = event.headers["Authorization"];
  //const credentials = Authorization && Authorization.split(" ")[1];
  const credentials = Authorization && Authorization.split(" ");
  // api key 확인
  if (!apiKey) {
    console.log("no api key:", apiKey);
    return createErrorResponse(httpStatus.InvalidParameters);
  }

  // http header Authorization 에서 client id/secret 있는지 확인
  if (
    !credentials ||
    credentials.length !== 2 ||
    credentials[0] !== "Basic" ||
    credentials[1].length === 0
  ) {
    console.log("error http basic credentials ", Authorization);
    return createErrorResponse(httpStatus.InvalidHeaderValues);
  }

  // credentials에서 id secret 추출
  const clientInfo = Buffer.from(credentials[1], "base64").toString("utf8");
  const [clientId, clientSecret] = clientInfo.split(":");
  if (!clientId || !clientSecret) {
    console.log("clientId or secret error: " + clientId + ":" + clientSecret);
    return createErrorResponse(httpStatus.InvalidParameters);
  }

  // database에서 app clientId, clientSecret 정보 조회
  let params = {
    TableName: process.env.DYNAMODB_APPS_TABLE,
    Key: { clientId, apiKey },
  };

  let data = null;
  try {
    data = await dynamoDb.get(params).promise();
    console.log(JSON.stringify(data));
    //return createResponse(httpStatus.OK, data);
  } catch (error) {
    console.log(error);
    return createErrorResponse(httpStatus.ServiceUnavailable);
  }
  // app client 정보가 없으면 Not found 응답
  if (!data || !data.Item) {
    return createErrorResponse(httpStatus.AppNotFound);
  }
  // clientId, clienttSecret 정보가 일치하지 않으면 오류 응답
  if (clientSecret !== data.Item.clientSecret) {
    console.log(clientId, clientSecret);
    return createErrorResponse(httpStatus.InvalidRequestData);
  }

  // app client 정보 모두 정상이면 accessToken refreshToken 발급
  let accessToken, refreshToken;
  try {
    accessToken = generateToken(
      tokenConfig.accessToken.secret,
      tokenConfig.accessToken.option,
      { clientId }
    );
    // refresh token 생성 하고, app 정보 DB에 token 만료일 기록
    refreshToken = generateToken(
      tokenConfig.refreshToken.secret,
      tokenConfig.refreshToken.option,
      { clientId }
    );

    params = {
      TableName: process.env.DYNAMODB_APPS_TABLE,
      Key: {
        clientId,
        apiKey,
      },
      UpdateExpression: "set refreshToken = :token, updatedAt = :timestamp",
      ExpressionAttributeValues: {
        ":token": refreshToken,
        ":timestamp": new Date().toISOString(),
      },
    };

    data = await dynamoDb.update(params).promise();
    console.log(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return createErrorResponse(httpStatus.ServiceUnavailable);
  }

  return createResponse(httpStatus.OK, {
    accessToken,
    expiresIn: tokenConfig.accessToken.option.expiresIn,
    refreshToken,
  });
};

/*
  Authoriztion Basic Base64(clientId:clientSecret);
*/
