const environments = {
  dev: {
    dbConfig: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "mysql",
    },
    tokenConfig: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        option: {
          issuer: "dev.makingrabbit.com",
          expiresIn: 24 * 60 * 60, // 24시간
          //expiresIn: 60, // 24시간
        },
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        option: {
          issuer: "dev.makingrabbit.com",
          // expiresIn: 24 * 60 * 60, // 24시간
          expiresIn: 60,
        },
      },
    },
    service: {
      key: process.env.SERVICE_KEY,
    },
  },
  stage: {
    dbConfig: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "mysql",
    },
    tokenConfig: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        option: {
          issuer: "stage.makingrabbit.com",
          expiresIn: 24 * 60 * 60, // 24시간
        },
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        option: {
          issuer: "stage.makingrabbit.com",
          // expiresIn: 24 * 60 * 60, // 24시간
        },
      },
    },
    service: {
      key: process.env.SERVICE_KEY,
    },
  },
  prod: {
    dbConfig: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "mysql",
    },
    tokenConfig: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        option: {
          issuer: "prod.makingrabbit.com",
          expiresIn: 24 * 60 * 60, // 24시간
        },
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        option: {
          issuer: "prod.makingrabbit.com",
          // expiresIn: 24 * 60 * 60, // 24시간
        },
      },
    },
    service: {
      key: process.env.SERVICE_KEY,
    },
  },
};

const env = process.env.STAGE || "dev";

module.exports = environments[env];
