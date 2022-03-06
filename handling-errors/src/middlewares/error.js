const winston = require("winston");
const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: "logFile.log",
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something went wrong");
};
