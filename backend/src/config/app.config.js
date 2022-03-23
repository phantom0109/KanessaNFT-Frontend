const dotenv = require("dotenv").config().parsed;

let appPort;
if (process.env.ENVIRONMENT === "development") {
  appPort = dotenv.APP_PORT;
} else if (process.env.ENVIRONMENT === "production") {
  appPort = dotenv.APP_PORT;
}

module.exports = {
  ...dotenv,
  APP_PORT: appPort,
  logging: true,
};
