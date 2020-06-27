'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePost = require('./parsePost');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveResult = function saveResult(json) {
    json = _iconvLite2.default.decode(new Buffer(json), 'win1251');
    _fs2.default.writeFile('result.json', json, function (error) {
        if (err) {
            console.log(error);
        }
    });
};
var urlPage = 'http://grozny-inform.ru/news/politic';
(0, _parsePost.parseLinks)(urlPage, '.partition_news a').then(function (links) {
    (0, _parsePost.getPosts)(links).then(function (posts) {
        return saveResult((0, _stringify2.default)(posts));
    });
});