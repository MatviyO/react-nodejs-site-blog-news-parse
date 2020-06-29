'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePost = require('./parsePost');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _configs = require('./configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveResult = function saveResult(json) {
    _fs2.default.writeFile('result.json', json, function (err) {
        if (err) console.log('no saved');
    });
};
var urlPage = 'http://www.riadagestan.ru/news/politics/';
(0, _parsePost.parseLinks)(urlPage, '.b-mid-col__layout li a', 15).then(function (links) {
    (0, _parsePost.getPosts)(links, _configs.elems.riadagestan).then(function (posts) {
        return saveResult((0, _stringify2.default)(posts));
    });
});