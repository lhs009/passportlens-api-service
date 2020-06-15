module.exports.CONFIG = (serverless) => ({
  dev: {
    DB_HOST:
      "data-engineering-practice.cyjgnimip8wj.ap-northeast-2.rds.amazonaws.com",
    DB_USER: "admin",
    DB_PASSWORD: "admin1234!",
    DB_DATABASE: "apihubdb",
    SECRET_KEY: "MySecretKey1$1$234",
    ACCESS_TOKEN_SECRET: "MAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#$",
    REFRESH_TOKEN_SECRET: "MAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#^^",
    SERVICE_KEY: "jmlim12345bbbbbaaaaa123456789061",
  },
  stage: {
    DB_HOST:
      "stage-data-engineering-practice.cyjgnimip8wj.ap-northeast-2.rds.amazonaws.com",
    DB_USER: "stageadmin",
    DB_PASSWORD: "sgateadmin1234!",
    DB_DATABASE: "stageapihubdb",
    SECRET_KEY: "stageMySecretKey1$1$234",
    ACCESS_TOKEN_SECRET: "stageMAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#$",
    REFRESH_TOKEN_SECRET: "stageMAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#^^",
    SERVICE_KEY: "stage12345bbbbbaaaaa123456789061",
  },
  prod: {
    DB_HOST:
      "prod-data-engineering-practice.cyjgnimip8wj.ap-northeast-2.rds.amazonaws.com",
    DB_USER: "^^prod-admin",
    DB_PASSWORD: "prod-admin1234!",
    DB_DATABASE: "prod-apihubdb",
    SECRET_KEY: "prod-MySecretKey1$1$234",
    ACCESS_TOKEN_SECRET: "PROD_MAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#$",
    REFRESH_TOKEN_SECRET: "PRODMAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#^^",
    SERVICE_KEY: "prodm12345bbbbbaaaaa123456789061",
  },
});
