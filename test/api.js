var assert = require("assert-plus"),
	util = require("util"),
	endpoint = require("../index");

describe("API", function(){
	describe("()", function() {
		it("should work if all params are set", function(){
			endpoint(true, true, true, true, "tag", "facility", "hostname", 1234);
		});
	});
});
