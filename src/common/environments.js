"use strict";

/*
  ACCESS_TOKEN_SECRET: JWT access token 용 시크릿
  REFRESH_TOKEN_SECRET: JWT refresh token 용 시크릿 
  SERVICE_KEY: passport 복호화 대칭키
*/

module.exports.CONFIG = (serverless) => ({
  dev: {
    LOG_LEVEL: "DEBUG",
    ACCESS_TOKEN_SECRET: "MAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#$",
    REFRESH_TOKEN_SECRET: "MAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#^^",
    SERVICE_KEY: "jmlim12345bbbbbaaaaa123456789061",
    DYNAMO_TABLES: {
      CUSTOMERS: "passport-lens-customers-dev",
      APPS: "passport-lens-apps-dev",
    },
  },
  stage: {
    LOG_LEVEL: "ERROR",
    ACCESS_TOKEN_SECRET: "stageMAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#$",
    REFRESH_TOKEN_SECRET: "stageMAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#^^",
    SERVICE_KEY: "stage12345bbbbbaaaaa123456789061",
    DYNAMO_TABLES: {
      CUSTOMERS: "passport-lens-customers-stage",
      APPS: "passport-lens-apps-stage",
    },
  },
  prod: {
    LOG_LEVEL: "ERROR",
    ACCESS_TOKEN_SECRET: "PROD_MAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#$",
    REFRESH_TOKEN_SECRET: "PRODMAKINGRABBIT_JSON_WEB_TOKEN_KEY_!@#^^",
    SERVICE_KEY: "prodm12345bbbbbaaaaa123456789061",
    DYNAMO_TABLES: {
      CUSTOMERS: "passport-lens-customers-prod",
      APPS: "passport-lens-apps-prod",
    },
  },
});
