'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPosts = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var getPosts = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(links) {
        var posts, count, i, post;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        posts = [];
                        count = links.length;
                        i = 0;

                    case 3:
                        if (!(i < count)) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 6;
                        return parsePost(links[i], _configs.elems.groznyinform).then(function (post) {
                            return post;
                        });

                    case 6:
                        post = _context.sent;

                        posts.push(post);

                        _context.next = 10;
                        return delay(i, count, 2000);

                    case 10:
                        i++;
                        _context.next = 3;
                        break;

                    case 13:
                        return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                            if (!posts.length) reject();
                            resolve(posts);
                        }));

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getPosts(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _configs = require('./configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var delay = function delay(i, count, ms) {
    return new _promise2.default(function (resolve) {
        return setTimeout(function () {
            console.log('\n        Index: ' + i + ';\n        All posts: ' + count + ';\n    ');
            resolve();
        }, ms);
    });
};
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

    return new _promise2.default(function (resolve, reject) {
        var links = [];
        _unirest2.default.get(url).end(function (_ref2) {
            var body = _ref2.body,
                error = _ref2.error;

            if (error) reject(error);
            var $ = _cheerio2.default.load(body);
            var domain = url.match(/\/\/(.*?)\//)[1];

            $(className).each(function (i, e) {
                if (i + 1 <= maxLinks) {
                    links.push('http://' + domain + $(e).attr('href'));
                };
            });
            resolve(links);
            if (!links.length) {
                reject();
            };
        });
    });
}
exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;

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