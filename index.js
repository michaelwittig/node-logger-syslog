var util = require("util"),
	lib = require("cinovo-logger-lib"),
	assert = require("assert-plus");

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

function SyslogUDPEndpoint(debug, info, error, critial, tag, facility, hostname, port) {
	lib.Endpoint.call(this, debug, info, error, critial, "syslog:" + facility);
	var Ain2 = require("ain2");
	this.ain2 = new Ain2({tag: tag, facility: facility, hostname: hostname, port: port});
}
util.inherits(SyslogUDPEndpoint, lib.Endpoint);
SyslogUDPEndpoint.prototype._log = function(log, callback) {
	var data = log.level + ": ";
	if (log.fullOrigin !== undefined) {
		data += "(" + log.origin + " | " + log.fullOrigin.file + "[" + log.fullOrigin.fn + "]:" + log.fullOrigin.line + ") ";
	} else if (log.origin !== undefined) {
		data += "(" + log.origin + ") ";
	}
	data += log.message;
	if (log.metadata) {
		data += ", " + lib.safejson(log.metadata);
	}
	this.ain2.send(data, getSyslogLevel(log.level));
	callback();
};
SyslogUDPEndpoint.prototype._stop = function(callback) {
	callback();
};


function SyslogLocalEndpoint(debug, info, error, critial, tag, facility) {
	lib.Endpoint.call(this, debug, info, error, critial, "syslog:" + facility);
	this.posix = require("posix");
	this.posix.openlog(tag, {cons: false, ndelay: true, nowait: true, pid: true}, facility);
}
util.inherits(SyslogLocalEndpoint, lib.Endpoint);
SyslogLocalEndpoint.prototype._log = function(log, callback) {
	var data = log.level + ": ";
	if (log.fullOrigin !== undefined) {
		data += "(" + log.origin + " | " + log.fullOrigin.file + "[" + log.fullOrigin.fn + "]:" + log.fullOrigin.line + ") ";
	} else if (log.origin !== undefined) {
		data += "(" + log.origin + ") ";
	}
	data += log.message;
	if (log.metadata) {
		try {
			data += ", " + JSON.stringify(log.metadata);
		} catch (err) {
			callback(err);
			return;
		}
	}
	this.posix.syslog(getSyslogLevel(log.level), data);
	callback();
};
SyslogLocalEndpoint.prototype._stop = function(callback) {
	this.posix.closelog();
	callback();
};

exports.local = function(debug, info, error, critial, tag, facility) {
	assert.string(tag, "tag");
	assert.string(facility, "facility");
	return new SyslogLocalEndpoint(debug, info, error, critial, tag, facility);
};

exports.udp = function(debug, info, error, critial, tag, facility, hostname, port) {
	assert.string(tag, "tag");
	assert.string(facility, "facility");
	assert.string(hostname, "hostname");
	assert.number(port, "port");
	return new SyslogUDPEndpoint(debug, info, error, critial, tag, facility, hostname, port);
};


