const unirest = require('unirest')
const cheerio = require('cheerio')

function riadagestan() {
    unirest
        .get(
            'https://www.riadagestan.ru/news/sports/mezhdunarodnyy_olimpiyskiy_den_otmechayut_segodnya_vo_vsem_mire/')
        .end(function (response) {
            const body = response.body;
            const $ = cheerio.load(body)

            const title = $('.itemTitle').text().trim();
            const image = 'https://www.riadagestan.ru' + $('.preview_picture').attr('src');
            const text = $('#qaz').text();
            const views = $('.itemHits b').text().trim();

            const post = {
                title: title,
                image: image,
                text: text,
                views: views
            }


        });

}

function groznyinform() {
    unirest
        .get(
            'https://grozny-inform.ru/news/society/120030/')
        .end(function (response) {
            const body = response.body;
            const $ = cheerio.load(body)

            const title = $('.news h1').text().trim();
            const image = 'https://www.riadagestan.ru' + $('.imgA img').attr('src');
            const text = $('.news p').text();
            const views = $('.news p.views').text();

            const post = {
                title: title,
                image: image,
                text: text,
                views: views
            }
            console.log(post)
        });
}

function magastimes() {
    unirest
        .get(
            'http://magastimes.ru/v-raznyx-tochkax-planety-vspominali-o-deportacii-1944-goda/')
        .end(function (response) {
            const body = response.body;
            const $ = cheerio.load(body)

            const title = $('.entry-title').text();
            const image = 'http://magastimes.ru' + $('.imgA img').attr('src');
            const text = $('.td-post-content p').text();
            const views = $('.news p.views').text();

            const post = {
                title: title,
                image: image,
                text: text,
                views: views
            }
            console.log(post)
        });
}

