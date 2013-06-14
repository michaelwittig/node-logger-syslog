var util = require("util"),
	Ain2 = require("ain2"),
	logger = require("cinovo-logger");

function getSyslogLevel(level) {
	switch(level) {
		case "debug":
			return "debug";
		case "info":
			return "info";
		case "error":
			return "err";
		case "critical":
			return "crit";
		default:
			return "";
	}
}

function SyslogEndpoint(debug, info, error, critial, tag, facility, hostname, port) {
	logger.Endpoint.call(this, debug, info, error, critial);
	this.ain2 = new Ain2({tag: tag, facility: facility, hostname: hostname, port: port});
}
util.inherits(SyslogEndpoint, logger.Endpoint);
SyslogEndpoint.prototype.log = function(log, errCallback) {
	var data = log.date.toUTCString() + " " + color(log.level) + ": ";
	if (log.fullOrigin !== undefined) {
		data += "(" + log.origin + " | " + log.fullOrigin.script + "[" + log.fullOrigin.fn + "]:" + log.fullOrigin.line + ") ";
	} else if (log.origin !== undefined) {
		data += "(" + log.origin + ") ";
	}
	data += log.message;
	if (log.metadata) {
		try {
		data += ", " + JSON.stringify(log.metadata);
		} catch (err) {
			errCallback(err);
			return;
		}
	}
	this.ain2.send(data, getSyslogLevel(log.level));
	errCallback();
};

module.exports = function(debug, info, error, critial, tag, facility, hostname, port) {
	return new SyslogEndpoint(debug, info, error, critial, tag, facility, hostname, port);
};

