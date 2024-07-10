const express = require('express');
const app = express();

const initializeModules = require('./start/modules');
const { start } = require('./start/start');

initializeModules(app, express);
start(app);
