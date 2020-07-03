# npm install -g mocha

# serverless plugin install --name serverless-pseudo-parameters

# serverless plugin install --name serverless-mocha

# npm install --save-dev aws-sdk-mock

# npm install --save-dev aws-sdk

# serverless create function -f testFunction --handler src/functions/testFunction.testFunction --path src/tests

# generater boilerplate

# serverless create --template-path ../serverless-template --path user-service

# API key 발행 로직

1. apikey 및 usage plan list를 미리 DB 구축
2. csv 파일로 export
3. api gateway console에 import

cms에서 app 등록 시 plan 및 api key 할당

API 보안

apikey: API를 사용하는 클라이언트 구분 용도 (API key에는 사용자 사용 plan 정보가 매핑)
accesskey: 클라이언트가 인증 요청 시 필요한 ID 개념
accesssecret: 클라이언트가 인증 요청 시 필요한 PASSWORD 개념

API 사용 타입

1. token type (api request with offered token jsonwebtoken)
   clientId, clientSecret http basic 로그인
   accessToken, refreshToken 발급
   accessToken timeout 1 시간
   refreshToken timeout 1 주일
   accessToken timeout 발생 전 후 refreshtoken으로 accesstoken 재 발급
   refreshToken timeout 시 재 로그인 필요
   Web, Mobile App
   grant_type=client_credentials
   &client_id=xxxxxxxxxx
   &client_secret=xxxxxxxxxx
2. api key type (api requrest with signature)
   x-api-key: xxxxxxxxx
   x-signature: BASE64(HAMC(secret, (message:timestamp))
   x-timestamp: timestamp
   Server, Embed device
   해쉬 알고리즘: HMAC (SHA256)

InvalidAPIKey  
유효한 API Key가 아님  
HTTP Status Code: 403  
SignatureDoesNotMatch  
생성한 Signature가 일치하지 않음  
HTTP Status Code: 403  
RequestTimeTooSkewed  
시간 값이 서버 시간을 15분 이상 벗어남  
HTTP Status Code: 403  
DuplicatedSignature  
15분 안에 동일한 signature 값  
HTTP Status Code: 403

API key: uuid
clientId: uuid
clientSecret: random string

x-api-key
Authorization: Basic BASE64(accesskey:secret)

https://njj3wonfgf.execute-api.ap-northeast-2.amazonaws.com/dev

Y2xpZW50SWQwMDE6MTIzNA==

resouce

/customers
/customers/login
/customers/tokens
/apps
/apps/login
/apps/tokens
/lens
/environments

srGrTUcSzdD6dxMdJFV5EejaVkypFqoMr1/a8ubqVVX8HfCJ7SDfpJ6T+dqhWpR6sxvIOjSsDQ
