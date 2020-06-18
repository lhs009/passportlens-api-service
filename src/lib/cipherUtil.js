"use strict";

const crypto = require("crypto");
const { service } = require("../common/config");
const ENC_KEY = service.key;
const IV = ENC_KEY.substring(0, 16);

//console.log(IV);
// const version = '1';
// const type = 'A';
// const country = 'KOR';
// const passport = 'D123456789';
// const fullText = version + type + country + passport;
// console.log('platintext:[%s][%d]', fullText, fullText.length);
/*
  format: VERSION [1 byte] + CODE_TYPE [1 byte] + PASSPORT INFO [MAX 12 bytes]
  1차원 바코드 용 타입 1: 국적 + 여권번호
  1차원 바코드 용 타입 2: 국적 + 여권번호 + 성명
  QR 코드 용 타입 A: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일
  QR 코드 용 타입 B: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일 + 입국일자
*/

const encrypt = (val) => {
  let cipher = crypto.createCipheriv("aes-256-ctr", ENC_KEY, IV);
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decrypt = (encrypted) => {
  let decipher = crypto.createDecipheriv("aes-256-ctr", ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

module.exports = {
  encrypt,
  decrypt,
};
