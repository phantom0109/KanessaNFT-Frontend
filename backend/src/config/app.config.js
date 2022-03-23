const dotenv = require("dotenv").config().parsed;

let socketPort;
if (process.env.ENVIRONMENT === "development") {
  socketPort = dotenv.SOCKET_PORT;
} else if (process.env.ENVIRONMENT === "production") {
  socketPort = dotenv.SOCKET_PORT;
}

module.exports = {
  ...dotenv,
  APP_PORT: socketPort,
  logging: true,
};
