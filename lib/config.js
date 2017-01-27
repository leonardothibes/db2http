/**
 * This file (and this file only) is licensed under the same
 * MIT license that DB2HTTP is. It stops evil-doers everywhere:
 *
 *    Copyright (c) 2017 Leonardo Thibes
 *
 *    Permission is hereby granted, free of charge, to any person obtaining a copy
 *    of this software and associated documentation files (the "Software"), to deal
 *    in the Software without restriction, including without limitation the rights
 *    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *    copies of the Software, and to permit persons to whom the Software is
 *    furnished to do so, subject to the following conditions:
 *
 *    The above copyright notice and this permission notice shall be included in all
 *    copies or substantial portions of the Software.
 *
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *    SOFTWARE.
 */

'use strict';

const exit = require('exit'),
      cli  = require('cli'),
      ini  = require('ini'),
      fs   = require('fs');

/**
 * Load the specified configuration file.
 *
 * @param {String} file Path to the file.
 *
 * @return {Object}
 */
exports.load = function(file)
{
    const config = parse(file);

    return validate(config);
};

/**
 * Load and parse the configuration file contents.
 *
 * @param {String} file Path to the file.
 */
function parse(file)
{
    if (!fs.existsSync(file)) {
        cli.error('Config file does not exists => ' + file);
        exit(1);
    }

    return ini.parse(fs.readFileSync(file, 'UTF-8'));
}

/**
 * Validate a configuration contents, loading default params.
 *
 * @param {Object} config Configuration contents.
 */
function validate(config)
{
    if (!config.global) {
        cli.error('"global" section not found into configuration');
        exit(1);
    }

    // Loading defaults
    config.global.http_port          = config.global.http_port          || 3000;
    config.global.http_gzip          = config.global.http_gzip          || true;
    config.global.client_charset     = config.global.client_charset     || 'UTF-8';
    config.global.connection_timeout = config.global.connection_timeout || 30;
    config.global.query_timeout      = config.global.query_timeout      || 30;
    config.global.log_dir            = config.global.log_dir            || '/var/log/db2http';
    // Loading defaults

    return config;
}
