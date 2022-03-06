const winston = require("winston");

// Import mongodb
require("winston-mongodb");
const { createLogger, format, transports } = require("winston");

const logConfiguration = {
  transports: [
    // File transport
    new transports.File({
      filename: "logFile.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),

    // MongoDB transport
    new transports.MongoDB({
      level: "error",
      //mongo database connection link
      db: "mongodb://localhost:27017/auth",
      options: {
        useUnifiedTopology: true,
      },
      // A collection to save json formatted logs
      collection: "error_logs",
      format: format.combine(
        format.timestamp(),
        // Convert logs to a json format
        format.json()
      ),
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something went wrong");
};
