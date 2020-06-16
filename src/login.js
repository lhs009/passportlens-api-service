"use strict";
const httpStatus = require("../common/httpStatus");
const config = require("../common/config");
const { createErrorResponse, createResponse } = require("../lib/utils");

//AWS api g/w에 의해 호출 됨.
module.exports.login = async (event, context) => {
  const { Authorization } = event.headers;

  const credentials = Authorization && Authorization.split(" ")[1];

  // http header Authorization 에서 client 인증 credentials가 있는지 확인
  if (!credentials) {
    console.log("no credentials", Authorization);
    return createErrorResponse(httpStatus.InvalidParameters);
  }
  // credentials에서 id password 추출
  const clientInfo = Buffer.from(credentials, "base64").toString("utf8");
  const [clientId, clientSecret] = clientInfo.split(":");
  if (!clientId || !clientSecret) {
    console.log("clientId or password error", clientId, clientSecret);
    return createErrorResponse(httpStatus.InvalidParameters);
  }

  console.log(clientId, clientSecret);
  // 있으면 appId로 accessToken 과 refreshToken 생성 해서 응답
  const accessToken = generateToken(
    tokenConfig.accessToken.secret,
    tokenConfig.accessToken.option,
    { appId: clientId }
  );
  const refreshToken = generateToken(
    tokenConfig.refreshToken.secret,
    tokenConfig.refreshToken.option,
    { appId: clientId }
  );
};
