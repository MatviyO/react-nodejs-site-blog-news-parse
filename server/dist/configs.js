'use strict';

var elems = {
    riadagestan: {
        title: '.itemTitle',
        image: '.preview_picture',
        text: '#qaz',
        views: '.itemHits b'
    },
    groznyinform: {
        title: '.news h1',
        image: '.imgB span img',
        text: '.news p',
        views: '.news p.views'
    },
    magastimes: {
        title: '.td-post-title .entry-title',
        image: 'figure img',
        text: '.td-post-content p',
        views: '.td-post-views span'
    }
};

module.exports = {
    elems: elems
};