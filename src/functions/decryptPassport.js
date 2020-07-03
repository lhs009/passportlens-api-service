/*
  function: decryptPassport
  description: 암호화된 passport 정보를 복호화 처리 하는 API
  writer: Lee Hwansoo
  createdAt: 2020/06/30
  updatedAt: 2020/06/30
*/
"use strict";

const crypto = require("crypto");
const httpStatus = require("../common/httpStatus");
const { createErrorResponse, createResponse } = require("../lib/utils");
const cipherUtil = require("../lib/cipherUtil");

/*
 format: VERSION [1 byte] + CODE_TYPE [1 byte] + PASSPORT INFO [MAX 12 bytes]
 1. 1차원 바코드 용 타입 1: 국적 + 여권번호
 2. 1차원 바코드 용 타입 2: 국적 + 여권번호 + 성명
 3. QR 코드 용 타입 A: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일
 4. QR 코드 용 타입 B: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일 + 입국일자
*/
const getResponse = (data) => {
  const version = data[0];
  const codeType = data[1];
  const passportInfo = data.substring(2, data.length);
  console.log(passportInfo);

  switch (codeType) {
    case "1": // barcode
      return createResponse(httpStatus.OK, {
        country: passportInfo.substring(0, 3),
        passportNo: passportInfo.substring(3, 10),
      });
    //P:CAN:ZE000509:CAN:230114::850101:female:SARAH:MARTIN
    case "A": // QRcode
      const fields = passportInfo.split(":");

      return createResponse(httpStatus.OK, {
        documentCode: fields[0] ? fields[0] : "",
        issuingCountry: fields[1] ? fields[1] : "",
        documentNumber: fields[2] ? fields[2] : "",
        nationality: fields[3] ? fields[3] : "",
        dateOfExpiry: fields[4] ? fields[4] : "",
        personalNumber: fields[5] ? fields[5] : "",
        dateOfBirth: fields[6] ? fields[6] : "",
        gender: fields[7] ? fields[7] : "",
        givenName: fields[8] ? fields[8] : "",
        surName: fields[9] ? fields[9] : "",
      });

    default:
      // type or format error
      return createErrorResponse(httpStatus.InvalidRequestData);
  }
};

/*
  1. api key 확인
  2. signature 확인
  3. signature 검증 BASE64(HAMC256(apiKey + timestamp, (clientId:payload:timestamp))
*/
module.exports.decryptPassport = async (event, context) => {
  // apiKey from http header X-api-key
  const apiKey = event.headers["x-api-key"];
  const clientId = event.headers["x-client-id"];
  const signature = event.headers["x-signature"];
  const timestamp = event.headers["x-timestamp"];

  // 인증 파라미터 확인
  if (!apiKey || !clientId || !signature || !timestamp) {
    console.log(
      `Invalid header values: ${apiKey}:${clientId}:${signature}:${timestamp}`
    );
    return createErrorResponse(httpStatus.InvalidHeaderValues);
  }
  // payload validation
  const { payload } = JSON.parse(event.body);
  console.log("req data: " + payload);
  if (!payload) {
    return createErrorResponse(httpStatus.InvalidRequestData);
  }
  // timestamp 시간 검증 추가 (10분 내외)
  if (!timestamp) {
    return createErrorResponse(httpStatus.InvalidParameters);
  }
  // signature hash 값 생성
  const message = `${clientId}:${payload}:${timestamp}`;
  const key = `${apiKey}${timestamp}`;
  const comparedSignature = crypto
    .createHmac("sha256", key)
    .update(message)
    .digest("base64");

  // signature 값 비교
  console.log(`${signature}:${comparedSignature}`);
  if (signature !== comparedSignature) {
    return createErrorResponse(httpStatus.InvalidParameters);
  }

  // payload decryption
  const data = cipherUtil.decrypt(payload);
  const response = getResponse(data);

  return response;
};

//`${documentCode}:${issuingState}:${documentNumber}:${nationality}:${expirationDate}:${personalNumber}:${birthDate}:${sex}:${firstName}:${lastName}`

/* 
  <li>도큐먼트코드: ${passportInfo[0]}</li>
  <li>이슈잉 상태: ${passportInfo[1]}</li>
  <li>여권번호: ${passportInfo[2]}</li>
  <li>국가코드: ${passportInfo[3]}</li>
  <li>만기일: ${passportInfo[4]}</li>
  <li>개인번호: ${passportInfo[5]}</li>
  <li>생일: ${passportInfo[6]}</li>
  <li>성별: ${passportInfo[7]}</li>
  <li>성: ${passportInfo[8]}</li>
  <li>이름: ${passportInfo[9]}</li> 
*/

// x-api-key: xxxxxxxxx
// x-signature: BASE64(HAMC(secret, (message:timestamp))
// x-timestamp: timestamp
// Server, Embed device
// 해쉬 알고리즘: HMAC (SHA256)
