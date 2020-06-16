"use strict";
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

    case "A": // QRcode
      return createResponse(httpStatus.OK, {
        passportInfo,
      });

    default:
      // type or format error
      return createErrorResponse(httpStatus.InvalidRequestData);
  }
};

module.exports.decrypt = async (event, context, callback) => {
  const { payload } = JSON.parse(event.body);
  console.log(payload);

  const data = cipherUtil.decrypt(payload);
  const response = getResponse(data);

  return response;
};
