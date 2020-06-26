'use strict';

var _parsePost = require('./parsePost');

var _configs = require('./configs');

var Post = (0, _parsePost.parsePost)('https://grozny-inform.ru/news/society/120030/', _configs.elems.groznyinform);

(0, _parsePost.parseLinks)('http://grozny-inform.ru/news/politic', '.partition_news a');