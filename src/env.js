const config = require("../common/config");

const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body),
});

exports.variables = (event, ctx, cb) => {
  // const {
  //   DB_HOST,
  //   DB_USER,
  //   DB_PASSWORD,
  //   SECRET_KEY,
  //   ACCESS_TOKEN_SECRET,
  //   REFRESH_TOKEN_SECRET,
  //   SERVICE_KEY,
  // } = process.env;
  cb(null, createResponse(200, config));
};
