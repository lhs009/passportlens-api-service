module.exports = {
  OK: 200,
  Created: 201,
  NoContent: 204,

  BadRequest: { status: 400, message: "BadRequest" },
  InvalidParameters: { status: 400, message: "InvalidParameters" },
  InvalidParameterId: { status: 400, message: "InvalidParameterId" },
  InvalidParameterType: { status: 400, message: "InvalidParameterType" },
  InvalidRequestData: { status: 400, message: "InvalidRequestData" },
  InvalidQueryString: { status: 400, message: "InvalidQueryString" },
  InvalidQueryRange: { status: 400, message: "InvalidQueryRange" },
  InvalidPassword: { status: 400, message: "InvalidPassword" },
  InvalidHeaderValues: { status: 400, message: "InvalidHeaderValues" },

  NotAuthenticated: { status: 401, message: "NotAuthenticated" },
  InvalidToken: { status: 401, message: "InvalidToken" },
  InvalidAccessToken: { status: 401, message: "InvalidAccessToken" },
  InvalidRefreshToken: { status: 401, message: "InvalidRefreshToken" },
  AccessTokenExpired: { status: 401, message: "AccessTokenExpired" },
  RefreshTokenExpired: { status: 401, message: "RefreshTokenExpired" },
  tokenExpired: { status: 401, message: "tokenExpired" },
  FbAuthError: { status: 401, message: "FacebookAuthError" },
  FbEmailNotExist: { status: 401, message: "FacebookEmailNotExist" },
  UserNotAuthenticated: { status: 401, message: "UserNotAuthenticated" },
  UserWarned: { status: 401, message: "UserWarned" },
  UserWithdrawn: { status: 401, message: "UserWithdrawn" },
  UserDeleted: { status: 401, message: "UserDeleted" },
  UserWaited: { status: 401, message: "UserWaited" },
  ApiNotAuthenticated: { status: 401, message: "ApiNotAuthenticated" },
  NotJoinedMember: { status: 401, message: "NotJoinedMember" },
  AccessTokenNotFound: { status: 401, message: "AccessTokenNotFound" },

  UserNotAuthorized: { status: 403, message: "UserNotAuthorized" },
  NotAuthorized: { status: 403, message: "NotAuthorized" },

  ResourceNotFound: { status: 404, message: "ResourceNotFound" },
  UserNotFound: { status: 404, message: "UserNotFound" },
  ContentNotFound: { status: 404, message: "ContentNotFound" },
  AppNotFound: { status: 404, message: "AppNotFound" },
  ProjectNotFound: { status: 404, message: "ProjectNotFound" },

  UserConflict: { status: 409, message: "UserAlreadyExist" },
  ContentConflict: { status: 409, message: "ContentAlreadyExist" },
  AppConflict: { status: 409, message: "AppAlreadyExist" },
  ResourceConflict: { status: 409, message: "ResourceAlreadyExist" },
  EmailConflict: { status: 409, message: "EmailAlreadyExist" },

  InternalServerError: { status: 500, message: "InternalServerError" },
  ServiceUnavailable: { status: 503, message: "ServiceUnavailable" },
};
