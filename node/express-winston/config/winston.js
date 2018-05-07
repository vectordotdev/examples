// Inspired by https://gist.github.com/rtgibbons/7354879
var appRoot = require('app-root-path');
var timber = require('timber');
var winston = require('winston');

// Configure debug output for timber-node package
timber.config.debug_logger = process.stdout;

// Install the transport
// timber.install(transport);

// set default log level
// can also use an environment variable here
var logLevel = 'info';

// Timber API Key
var timberKey = '2829_fa4d60d7ec980c41:9f5d48e2aa445eee63dabc9e69ceb8ce66a4b2e9eda59a9d62edb9958953837a'

// Set up logger
var customColors = {
  trace: 'white',
  debug: 'green',
  info: 'blue',
  warn: 'yellow',
  crit: 'red',
  fatal: 'red'
};

// Set custom levels
var levels = {
  fatal: 0,
  crit: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
}

// Custom settings for each transport (file, console, timber)
var transportOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
};

// Logger configuration
var config = {
  colors: customColors,
  level: logLevel,
  levels: levels,
  transports: [
    new (winston.transports.Console)(transportOptions.console),
    new (winston.transports.File)(transportOptions.file),
    new timber.transports.Winston(timberKey)
  ],
  exitOnError: false, // do not exit on handled exceptions
}

// Create the logger
var logger = new (winston.Logger)(config)

// Add custom colors
winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
var origLog = logger.log

logger.log = function (level, msg) {
  if (msg instanceof Error) {
    var args = Array.prototype.slice.call(arguments)
    args[1] = msg.stack
    origLog.apply(logger, args)
  } else {
    origLog.apply(logger, arguments)
  }
}

logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
}

/* Example Logging
  var log = require('./log.js')
  log.trace('testing')
  log.debug('testing')
  log.info('testing')
  log.warn('testing')
  log.crit('testing')
  log.fatal('testing')
 */

module.exports = logger;
