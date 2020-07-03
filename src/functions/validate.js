/*
  function: validate
  description: api key, access, refresh token 검증 (authorizer)
  writer: Lee Hwansoo
  createdAt: 2020/07/01
  updatedAt: 2020/07/01
*/

"use strict";
const { tokenConfig } = require("../common/config");
const { verifyToken } = require("../lib/utils");

// Help function to generate an IAM policy
const generatePolicy = (principalId, effect, resource) => {
  let authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    let policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    let statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};

module.exports.validate = async (event, context) => {
  console.log(event);
  const authorizerToken = event.authorizationToken;
  const authorizerArr = authorizerToken.split(" ");
  const token = authorizerArr[1];

  if (
    authorizerArr.length !== 2 ||
    authorizerArr[0] !== "Bearer" ||
    authorizerArr[1].length === 0
  ) {
    console.log("no accessToken");
    return generatePolicy("undefined", "Deny", event.methodArn);
  }

  let result = verifyToken(token, tokenConfig.accessToken.secret);
  if (result.success == false) {
    console.log("invalid token: " + result.data);
    return generatePolicy("undefined", "Deny", event.methodArn);
  }

  const { clientId } = result.data;

  if (!clientId) {
    return generatePolicy("undefined", "Deny", event.methodArn);
  }
  console.log(clientId);
  return generatePolicy(clientId, "Allow", event.methodArn);
};
