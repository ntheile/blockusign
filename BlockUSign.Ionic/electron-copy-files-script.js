var fs = require('fs-extra');
fs.copy('electron/main.js','www/main.js');
fs.copy('electron/server.js','www/server.js');