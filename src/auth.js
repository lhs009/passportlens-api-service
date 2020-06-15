const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body),
});

exports.login = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: "login" }));
};

exports.logout = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: "logout" }));
};

exports.token = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: "token" }));
};
