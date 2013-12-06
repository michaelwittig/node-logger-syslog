var assert = require("assert-plus"),
	util = require("util"),
	endpoint = require("../index");

describe("API", function() {
	"use strict";
	describe("udp()", function() {
		it("should work if all params are set", function() {
			endpoint.udp(true, true, true, true, "tag", "local0", "localhost", 1234);
		});
	});
	describe("local()", function() {
		it("should work if all params are set", function() {
			endpoint.local(true, true, true, true, "tag", "local0");
		});
	});
});
