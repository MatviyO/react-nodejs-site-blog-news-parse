'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseLinks = exports.parsePost = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePost(url, elems) {
    return new _promise2.default(function (resolve, reject) {
        _unirest2.default.get(url).end(function (_ref) {
            var body = _ref.body;

            var $ = _cheerio2.default.load(body);

            var domain = url.match(/\/\/(.*?)\//)[1];
            var title = $(elems.title).text();
            var image = $(elems.image).attr('src');
            image = image.indexOf('http') >= 0 ? image : 'http://' + domain + image;
            var text = $(elems.text).text().trim();
            var views = $(elems.views).text();

            var post = {
                title: title,
                image: image,
                text: text,
                views: views
            };
            resolve(post);
        });
    });
}

function parseLinks(url, className) {
    var maxLinks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    _unirest2.default.get(url).end(function (_ref2) {
        var body = _ref2.body;

        var $ = _cheerio2.default.load(body);
        var domain = url.match(/\/\/(.*?)\//)[1];

        var links = [];
        $(className).each(function (i, e) {
            if (i + 1 <= maxLinks) {
                links.push('http://' + domain + $(e).attr('href'));
            }
        });
        console.log(links);
    });
}

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;

// function riadagestan() {
//     unirest
//         .get(
//             'https://www.riadagestan.ru/news/sports/mezhdunarodnyy_olimpiyskiy_den_otmechayut_segodnya_vo_vsem_mire/')
//         .end(function (response) {
//             const body = response.body;
//             const $ = cheerio.load(body)
//
//             const title = $('.itemTitle').text().trim();
//             const image = 'https://www.riadagestan.ru' + $('.preview_picture').attr('src');
//             const text = $('#qaz').text();
//             const views = $('.itemHits b').text().trim();
//
//             const post = {
//                 title: title,
//                 image: image,
//                 text: text,
//                 views: views
//             }
//
//
//         });
//
// }
//
// function groznyinform() {
//     unirest
//         .get(
//             'https://grozny-inform.ru/news/society/120030/')
//         .end(function (response) {
//             const body = response.body;
//             const $ = cheerio.load(body)
//
//             const title = $('.news h1').text().trim();
//             const image = 'https://grozny-inform.ru/' + $('.imgB span img').attr('src');
//             const text = $('.news p').text();
//             const views = $('.news p.views').text();
//
//             const post = {
//                 title: title,
//                 image: image,
//                 text: text,
//                 views: views
//             }
//             console.log(post)
//         });
// }
//
// function magastimes() {
//     unirest
//         .get(
//             'http://magastimes.ru/v-raznyx-tochkax-planety-vspominali-o-deportacii-1944-goda/')
//         .end(function (response) {
//             const body = response.body;
//             const $ = cheerio.load(body)
//
//             const title = $('.td-post-title .entry-title').text();
//             const image = $('figure img').attr('src');
//             const text = $('.td-post-content p').text();
//             const views = $('.td-post-views span').text();
//
//             const post = {
//                 title: title,
//                 image: image,
//                 text: text,
//                 views: views
//             }
//         });
// }