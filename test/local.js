var assert = require("assert-plus"),
	util = require("util"),
	endpoint = require("../index");

describe("local", function(){
	it("should work if all params are set", function(done) {
		var logger = require("cinovo-logger").createLogger();
		logger.append(endpoint.local(true, true, true, true, "tag", "local0"));
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
		})
	});
	it("circular metadata", function(done) {
		var logger = require("cinovo-logger").createLogger();
		logger.append(endpoint.local(true, true, true, true, "tag", "local0"));
		var metadata = {a: 1};
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
		})
	});
});
