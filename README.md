`````
                                                   ___
       __                                         /\_ \
  ___ /\_\    ___     ___   __  __    ___         \//\ \     ___      __      __      __   _ __
 /'___\/\ \ /' _ `\  / __`\/\ \/\ \  / __`\  _______\ \ \   / __`\  /'_ `\  /'_ `\  /'__`\/\`'__\
/\ \__/\ \ \/\ \/\ \/\ \L\ \ \ \_/ |/\ \L\ \/\______\\_\ \_/\ \L\ \/\ \L\ \/\ \L\ \/\  __/\ \ \/
\ \____\\ \_\ \_\ \_\ \____/\ \___/ \ \____/\/______//\____\ \____/\ \____ \ \____ \ \____\\ \_\
 \/____/ \/_/\/_/\/_/\/___/  \/__/   \/___/          \/____/\/___/  \/___L\ \/___L\ \/____/ \/_/
                                                                      /\____/ /\____/
                                                                      \_/__/  \_/__/
`````

# cinovo-logger-syslog

Syslog endpoint for [cinovo-logger](https://github.com/cinovo/node-logger).

## Getting started

### At first you must install and require the logger.

    npm install cinovo-logger

### Next you must require the module

`````javascript
var logger = require("cinovo-logger");
`````

### Append cinovo-logger-syslog endpoint

	npm install cinovo-logger-syslog

In your JavaScript code append the syslog endpoint.

`````javascript
logger.append(require("cinovo-logger-syslog").local(true, true, true, true, "test", "local0"));
`````

### Log something

`````javascript
logger.debug("all values are ok");
logger.info("myscript", "all values are ok");
logger.error("myscript", "some values are not ok", {a: 10, b: 20});
logger.exception("myscript", "some values are not ok", new Error("error"));
logger.critical("myscript", "all values are not ok", {a: 10, b: 20}, function(err) { ... });
`````

### Done

Now you can log to local syslog endpoint.

## API

### udp(debug, info, error, critial, tag, facility, hostname, port)

Sync creates a syslog via UDP Endpoint.

* `debug`: Boolean - true if the endpoint should log debug level
* `info`: Boolean - true if the endpoint should log info level
* `error`: Boolean - true if the endpoint should log error level
* `critical`: Boolean - true if the endpoint should log critical level
* `tag`: String Syslog allows programs to supply an identifying string, known as a tag
* `facility`: String["auth", "authpriv", "deemon", "cron", "ftp", "lpr", "kern", "mail", "news", "syslog", "user", "uucp", "local0", ... , "local7"]
* `hostname`: String
* `port`: Number

`return`: Endpoint - Endpoint - use the endpoint like this logger.append(endpoint)

### local(debug, info, error, critial, tag, facility, hostname, port)

Sync creates a syslog local Endpoint.

* `debug`: Boolean - true if the endpoint should log debug level
* `info`: Boolean - true if the endpoint should log info level
* `error`: Boolean - true if the endpoint should log error level
* `critical`: Boolean - true if the endpoint should log critical level
* `tag`: String Syslog allows programs to supply an identifying string, known as a tag
* `facility`: String["auth", "authpriv", "deemon", "cron", "ftp", "lpr", "kern", "mail", "news", "syslog", "user", "uucp", "local0", ... , "local7"]

`return`: Endpoint - Endpoint - use the endpoint like this logger.append(endpoint)
