const createError = require("http-errors");

const httpResponse = {
  OK: 200,
  Created: 201,
  NoContent: 204,

  BadRequest: createError(400, "BadRequest"),
  InvalidParameters: createError(400, "InvalidParameters"),
  InvalidParameterId: createError(400, "InvalidParameterId"),
  InvalidParameterType: createError(400, "InvalidParameterType"),
  InvalidRequestData: createError(400, "InvalidRequestData"),
  InvalidQueryString: createError(400, "InvalidQueryString"),
  InvalidQueryRange: createError(400, "InvalidQueryRange"),
  InvalidPassword: createError(400, "InvalidPassword"),

  NotAuthenticated: createError(401, "NotAuthenticated"),
  InvalidAccessToken: createError(401, "InvalidAccessToken"),
  InvalidRefreshToken: createError(401, "InvalidRefreshToken"),
  AccessTokenExpired: createError(401, "AccessTokenExpired"),
  RefreshTokenExpired: createError(401, "RefreshTokenExpired"),
  FbAuthError: createError(401, "FacebookAuthError"),
  FbEmailNotExist: createError(401, "FacebookEmailNotExist"),
  UserNotAuthenticated: createError(401, "UserNotAuthenticated"),
  UserWarned: createError(401, "UserWarned"),
  UserWithdrawn: createError(401, "UserWithdrawn"),
  UserDeleted: createError(401, "UserDeleted"),
  UserWaited: createError(401, "UserWaited"),
  ApiNotAuthenticated: createError(401, "ApiNotAuthenticated"),
  NotJoinedMember: createError(401, "NotJoinedMember"),
  AccessTokenNotFound: createError(401, "AccessTokenNotFound"),

  UserNotAuthorized: createError(403, "UserNotAuthorized"),
  NotAuthorized: createError(403, "NotAuthorized"),

  ResourceNotFound: createError(404, "ResourceNotFound"),
  UserNotFound: createError(404, "UserNotFound"),
  ContentNotFound: createError(404, "ContentNotFound"),
  AppNotFound: createError(404, "AppNotFound"),
  ProjectNotFound: createError(404, "ProjectNotFound"),

  UserConflict: createError(409, "UserAlreadyExist"),
  ContentConflict: createError(409, "ContentAlreadyExist"),
  AppConflict: createError(409, "AppAlreadyExist"),
  ResourceConflict: createError(409, "ResourceAlreadyExist"),
  EmailConflict: createError(409, "EmailAlreadyExist"),

  InternalServerError: createError(500, "InternalServerError"),
  ServiceUnavailable: createError(503, "ServiceUnavailable"),
};

module.exports = httpResponse;
