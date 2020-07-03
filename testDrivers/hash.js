const crypto = require("crypto");

const apiKey = "apikey1234";
const clientId = "client001";
const timestamp = new Date().toISOString();
const payload =
  "srGrTUcSzdD6dxMdJFV5EejaVkypFqoMr1/a8ubqVVX8HfCJ7SDfpJ6T+dqhWpR6sxvIOjSsDQ";

// signature hash 값 생성
const data = `${clientId}:${payload}:${timestamp}`;
const key = `${apiKey}${timestamp}`;
const comparedSignature = crypto
  .createHmac("sha256", key)
  .update(data)
  .digest("base64");
console.log(timestamp);
console.log(comparedSignature);
