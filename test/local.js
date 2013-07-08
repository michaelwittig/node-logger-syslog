var assert = require("assert-plus"),
	util = require("util"),
	endpoint = require("../index"),
	logger = require("cinovo-logger").createLogger();

describe("local", function(){
	it("should work if all params are set", function(done) {
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
});
