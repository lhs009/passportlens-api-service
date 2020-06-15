"use strict";

const cipherUtil = require("../lib/cipherUtil");

const createBody = (data) => {
  const version = data[0];
  const codeType = data[1];
  const passportInfo = data.substring(2, data.length);
  console.log(passportInfo);

  let body = null;
  if (codeType === "1") {
    // barcode
    body = {
      country: passportInfo.substring(0, 3),
      passportNo: passportInfo.substring(3, 10),
    };
  } else if (codeType === "A") {
    //qrcode
    body = {
      data: passportInfo,
    };
  } else {
    body = {
      error: "invalid format",
    };
  }
};

exports.decrypt = async (event, context, callback) => {
  const { payload } = JSON.parse(event.body);
  console.log(payload);

  const result = cipherUtil.decrypt(payload);
  const response = createBody(result);

  callback(null, response);
};

// "use strict";

// const { decrypt } = require("../lib/cipherUtil");
// const httpResponse = require("../common/httpResponse");
// /*
//  format: VERSION [1 byte] + CODE_TYPE [1 byte] + PASSPORT INFO [MAX 12 bytes]
//  1. 1차원 바코드 용 타입 1: 국적 + 여권번호
//  2. 1차원 바코드 용 타입 2: 국적 + 여권번호 + 성명
//  3. QR 코드 용 타입 A: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일
//  4. QR 코드 용 타입 B: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일 + 입국일자
// */

// const decryption = async (req, res, next) => {
//   const decoded = req.decodedToken;
//   const { payload } = req.body;
//   console.log(payload);
//   console.log(decoded, payload);
//   try {
//     const result = decrypt(payload);

//     console.log(result);

//     const version = result[0];
//     const codeType = result[1];
//     const data = result.substring(2, result.length);
//     console.log(data);
//     let resp = "";
//     if (codeType === "1") {
//       resp = createResponseByBarcodeType(data);
//     } else if (codeType === "A") {
//       resp = createResponseByQRcodeType(data);
//     } else {
//       return next(httpResponse.InvalidParameters);
//     }

//     res.json({ success: true, result: resp });
//   } catch (error) {
//     next(error);
//   }
// };

// const createResponseByBarcodeType = (data) => {
//   const country = data.substring(0, 3);
//   const passportNo = data.substring(3, data.length);
//   return {
//     country,
//     passportNo,
//   };
// };

// const createResponseByQRcodeType = (data) => {
//   // const country = data.substring(0, 3);
//   // const passportNo = data.substring(3, 10);
//   // const jsonParsed = JSON.parse(data);
//   // console.log(jsonParsed);

//   return data;
// };
// module.exports = {
//   decryption,
// };
