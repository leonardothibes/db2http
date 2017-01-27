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
 * @param {String} filePath Path to the file.
 *
 * @return {Object}
 */
exports.load = function(filePath)
{
    if (!fs.existsSync(filePath)) {
        cli.error('Config file does not exists => ' + filePath);
        exit(1);
    }

    return ini.parse(fs.readFileSync(filePath, 'UTF-8'));
};
