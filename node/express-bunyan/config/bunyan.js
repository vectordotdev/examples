var timber = require('timber');
var bunyan = require('bunyan');
var appRoot = require('app-root-path');

// Configure debug output for timber-node package
timber.config.debug_logger = process.stdout;

// Timber API Key
var timberKey = '2829_fa4d60d7ec980c41:9f5d48e2aa445eee63dabc9e69ceb8ce66a4b2e9eda59a9d62edb9958953837a';

// Create Timber transport
const transport = new timber.transports.HTTPS(timberKey);

// Create Bunyan Logger
var log = bunyan.createLogger({
  name: 'Timber',
  streams: [
  	{ path: `${appRoot}/logs/app.log` },
  	{ stream: new timber.transports.Bunyan({ stream: transport }) },
  ]
});

module.exports = log;
