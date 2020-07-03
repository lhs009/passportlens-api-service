const environments = {
  dev: {
    tokenConfig: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        option: {
          issuer: "dev.makingrabbit.com",
          //expiresIn: 24 * 60 * 60, // 24시간
          expiresIn: 60 * 10, // 10분
        },
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        option: {
          issuer: "dev.makingrabbit.com",
          //expiresIn: 30 * 24 * 60 * 60, // 30일
          expiresIn: 60 * 60, // 60분
        },
      },
    },
    service: {
      key: process.env.SERVICE_KEY,
    },
  },
  stage: {
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
          expiresIn: 30 * 24 * 60 * 60, // 30일
        },
      },
    },
    service: {
      key: process.env.SERVICE_KEY,
    },
  },
  prod: {
    tokenConfig: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        option: {
          issuer: "prod.makingrabbit.com",
          expiresIn: 24 * 60 * 60, // 24 시간
        },
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        option: {
          issuer: "prod.makingrabbit.com",
          expiresIn: 30 * 24 * 60 * 60, // 30일
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
