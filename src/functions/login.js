"use strict";
const httpStatus = require("../common/httpStatus");
const { tokenConfig } = require("../common/config");
const { createErrorResponse, createResponse } = require("../lib/utils");

const users = [
  {
    userId: "lhs009",
    password: "1234",
    apps: [
      {
        appId: 1,
        clientId: "clientId1",
        clientSecret: "clientSecret1",
        refreshTokenExpireIn: true,
      },
      {
        appId: 2,
        clientId: "clientId2",
        clientSecret: "clientSecret2",
        refreshTokenExpireIn: true,
      },
      {
        appId: 3,
        clientId: "clientId3",
        clientSecret: "clientSecret3",
        refreshTokenExpireIn: true,
      },
      {
        appId: 4,
        clientId: "clientId4",
        clientSecret: "clientSecret4",
        refreshTokenExpireIn: true,
      },
    ],
  },
  {
    userId: "lhs008",
    password: "1234",
    apps: [
      {
        appId: 5,
        clientId: "clientId5",
        clientSecret: "clientSecret5",
        refreshTokenExpireIn: true,
      },
      {
        appId: 6,
        clientId: "clientId6",
        clientSecret: "clientSecret6",
        refreshTokenExpireIn: true,
      },
      {
        appId: 7,
        clientId: "clientId7",
        clientSecret: "clientSecret7",
        refreshTokenExpireIn: true,
      },
      {
        appId: 8,
        clientId: "clientId8",
        clientSecret: "clientSecret8",
        refreshTokenExpireIn: true,
      },
    ],
  },
];

//AWS api g/w에 의해 호출 됨.
module.exports.login = async (event, context) => {
  // User ID/PASSWORD credentials from http header Authorization field
  const Authorization = event.headers["Authorization"];
  const userCredentials = Authorization && Authorization.split(" ")[1];
  // App Client ID/Secret from http post body
  const { clientId, clientSecret } = event.body;

  // http header Authorization 에서 user id/password 있는지 확인
  if (!userCredentials) {
    console.log("no credentials", Authorization);
    return createErrorResponse(httpStatus.InvalidParameters);
  }
  // user credentials에서 id password 추출
  const userInfo = Buffer.from(credentials, "base64").toString("utf8");
  const [userId, password] = userInfo.split(":");
  if (!userId || !userSecret) {
    console.log("user id or password error", userId, userSecret);
    return createErrorResponse(httpStatus.InvalidParameters);
  }
  // database에서 user 정보 조회
  const userInfo = users.filter(
    (user) => user.userId === userId && user.password === password
  );

  if (!userInfo || userInfo.length === 0) {
    console.log(userInfo);
    return createErrorResponse(httpStatus.UserNoFound);
  }

  // clientId/secret으로 App 정보 조회 app ID token정보에 포함
  const appInfo = userInfo[0].apps.filter(
    (app) => app.clientId === clientId && app.clientSecret === clientSecret
  );
  if (!appInfo || appInfo.length === 0) {
    console.log(appInfo);
    return createErrorResponse(httpStatus.AppNotFound);
  }
  // user client 정보 모두 정상이면 accessToken refreshToken 발급
  console.log(clientId, clientSecret);
  const appId = appInfo[0].appId;
  let accessToken, refreshToken;
  try {
    accessToken = generateToken(
      tokenConfig.accessToken.secret,
      tokenConfig.accessToken.option,
      { appId }
    );

    // refresh token 생성 하고, app 정보 DB에 token 만료일 기록
    refreshToken = generateToken(
      tokenConfig.refreshToken.secret,
      tokenConfig.refreshToken.option,
      { appId }
    );
  } catch (error) {
    console.log(error);
    return createErrorResponse(httpStatus.ServiceUnavailable);
  }

  return createResponse(httpStatus.OK, {
    accessToken,
    expiresIn: tokenConfig.accessToken.option.expiresIn,
    refreshToken,
  });
};

/*
  Authoriztion Basic Base64(ID:PASSWORD);
  x-signature: Base64(HAMAC(secret, accesskey))
*/

/*

요청하신 회원 정보 상세 조회 API 규격서 전달드립니다. 
AppKey (API 헤더 중 “X-Application-Key” 에 해당) 는 KJYWUW2273BBYASKR1AEBTBZO4Z1MFY2 입니다. (첨부 문서 참고)
해당 AppKey에 회원 정보 상세 조회 API 사용 권한 부여하였습니다. 

연동 규격 header 값 중, X-Signature 생성 방법은 아래와 같습니다. 

signature 생성 방법 ( 보안에 유의 부탁드립니다. )
---------------------------------------------------------------------------------------------------------------------------------------------
X-Signature는 unix 타임스탬프를 applicaionKey로 해싱한 후 Base64 encoding 한 값으로 상세 공식은 아래와 같습니다.

X-Signature  = Base64Encoding( HMacSHA256(unixTimstamp, applictionKey) )
* unixTimstamp는 10자리의 초 단위 타임스탬프(not millisecond)

아래 Java 언어 예제 코드 참고하시기 바랍니다.
====================================================================================================================
public static String getSignature(String timeStamp, String applicationKey) throws SignatureException {
       String signature;
       try {

             SecretKeySpec signingKey = new SecretKeySpec(applicationKey.getBytes(), "HmacSHA256");

             Mac mac = Mac.getInstance("HmacSHA256");
             mac.init(signingKey);

             byte[] rawHmac = mac.doFinal(timeStamp.getBytes());
             signature = BaseEncoding.base64().encode(rawHmac);

       } catch (Exception e) {
             throw new SignatureException("Failed to generate HMAC : " + e.getMessage());
       }
       return signature;
}
====================================================================================================================

header 정보의 X-Signature  생성시에는 Playground의 앱키(KJYWUW2273BBYASKR1AEBTBZO4Z1MFY2)를 이용
감사합니다. 



*/
