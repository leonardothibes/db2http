# DB2HTTP

Exports any of database connections to a Rest/HTTP API.

# Features

 * Access queries and procedures from HTTP request
 * Database connection pool
 * Output results in a Json, Xml or Yaml
 * Custom connections for users

# Supported Databases

 * Microsoft SQL Server
 * MySQL/MariaDB
 * PostgreSQL
 * sqlite3

# Installation

```bash
npm install -g db2http
```

# Configuration

Edit **/etc/db2http.conf** containing something like:

```ini
[global]

# Params for all of the connections
http_port          = 3000
http_gzip          = true
client_charset     = UTF-8
connection_timeout = 30
query_timeout      = 30
log_dir            = /var/log/db2http
# Params for all of the connections

[dummy1]

# Required params
adapter  = mysql
hostname = db-host.dummy.com
username = root
password = 12345678
# Required params

# Optional params
database = test
port     = 3306
# Optional params

# Connection pooling params
pool_min     = 5
pool_max     = 10
idle_timeout = 30000
# Connection pooling params

# Replacing global params
connection_timeout = 10
query_timeout      = 10
log_dir            = /path/what/i/whant/dummy1
# Replacing global params

[another]

# Required params
adapter  = mssql
hostname = another-host.dummy.com
username = username
password = 12345678
# Required params

# Optional params
port = 1433

# Specific driver options
options_appName = myapp
option_encrypt  = true
options_utc     = true
options_tdsver  = 7.4
# Specific driver options

```

# Service starting

```bash
db2http
```

or

```bash
db2http -c /path/to/alternate/config/file.conf
```

# Examples

### Input HTTP Form Encoded / Ouput Json
```bash
curl -X POST 'http://localhost:3000/dummy1.json' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -d 'query=select * from user where user_id = :id&id=1'
```

### Input Json / Ouput Xml
```bash
curl -X POST 'http://localhost:3000/dummy1.xml' \
     -H 'Content-Type: application/json' \
     -d '{
         "query": "select * from user where user_id = :id",
         "id"   : "1"
     }'
```

### Input Xml / Ouput Yaml
```bash
curl -X POST 'http://localhost:3000/dummy1.yaml' \
     -H 'Content-Type: application/xml' \
     -d '<query id="1">select * from user where user_id = :id</query>'
```

# Requirements

 * Node.js 0.10.x

# Contributors

 * [Leonardo Thibes](https://github.com/leonardothibes)

# MIT License

Copyright (c) 2017 Leonardo Thibes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
