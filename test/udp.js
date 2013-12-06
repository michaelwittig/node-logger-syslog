var assert = require("assert-plus"),
	util = require("util"),
	endpoint = require("../index"),
	logger = require("cinovo-logger").createLogger();

describe("local", function() {
	"use strict";
	it("should work if all params are set", function(done) {
		logger.append(endpoint.udp(true, true, true, true, "tag", "local0", "localhost", 514));
		logger.debug("test", "hello", undefined, function(err) {
			if (err) {
				throw err;
			}
			logger.stop(function(err) {
				if (err) {
					throw err;
				}
				done();
			});
		});
	});
	it("circular metadata", function(done) {
		var metadata = {a: 1},
			logger = require("cinovo-logger").createLogger();
		logger.append(endpoint.udp(true, true, true, true, "tag", "local0", "localhost", 514));
		metadata.b = metadata;
		logger.debug("test", "hello", metadata, function(err) {
			if (err) {
				throw err;
			}
			logger.stop(function(err) {
				if (err) {
					throw err;
				}
				done();
			});
		});
	});
});
