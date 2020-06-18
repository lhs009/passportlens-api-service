const { tokenConfig } = require("../common/config");
const httpStatus = require("../common/httpStatus");
const {
  createErrorResponse,
  createResponse,
  generateToken,
} = require("../lib/utils");

module.exports.token = async (event, context) => {
  const { Authorization } = event.headers;
  const refreshToken = Authorization && Authorization.split(" ")[1];
  // JWT 복호화 appId 추출 후 RefreshToken 만료일 DB에서 확인

  let appId, accessToken, refreshToken;

  try {
    appId = await jwt.verify(refreshToken, tokenConfig.refreshToken.secret);

    // appId 정보 존재 확인 후 accessToken, refreshToken 재 발급
    accessToken = generateToken(
      tokenConfig.accessToken.secret,
      tokenConfig.accessToken.option,
      { appId }
    );

    refreshToken = generateToken(
      tokenConfig.refreshToken.secret,
      tokenConfig.refreshToken.option,
      { appId }
    );

    // refresh token 생성 하고, app 정보 DB에 token 만료일 기록
  } catch (error) {
    console.log(error);
    return createErrorResponse();
  }

  return createResponse(httpStatus.OK, {
    accessToken,
    expiresIn: tokenConfig.accessToken.option.expiresIn,
    refreshToken,
  });
};

/*
access_token은 발급 받은 후 12시간-24시간(정책에 따라 변동 가능)동안 유효합니다. 
refresh token은 한달간 유효하며, refresh token 만료가 1주일 이내로 남은 시점에서 
사용자 토큰 갱신 요청을 하면 갱신된 access token과 갱신된 refresh token이 함께 반환됩니다.
*/
