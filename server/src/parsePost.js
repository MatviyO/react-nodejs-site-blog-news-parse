import unirest from 'unirest';
import cheerio from 'cheerio';

const delay = (i, count, ms) => {
    return new Promise(resolve => setTimeout(() => {
        console.log(`
        Index: ${i};
        All posts: ${count};
    `);
        resolve();
    }, ms));

};
 function parsePost(url, elems) {
    return  new Promise((resolve, reject) => {
         unirest
           .get(url)
           .end( ({body}) => {
               const $ = cheerio.load(body)

               const domain = url.match(/\/\/(.*?)\//)[1];
               const title = $(elems.title).text();
               let image = $(elems.image).attr('src');
               image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`;
               const text = $(elems.text).text().trim();
               const views = $(elems.views).text();


               const post = {
                   title: title,
                   image: image,
                   text: text,
                   views: views
               }
               resolve(post)
           });
   });
}

function parseLinks(url, className, maxLinks = 5) {
    return new Promise((resolve, reject) => {
        let links = []
        unirest.get(url).end(({body,error}) => {
            if (error) reject(error);
            const $ = cheerio.load(body);
            const domain = url.match(/\/\/(.*?)\//)[1];


            $(className).each((i, e) => {
                if (i + 1 <= maxLinks) {
                    links.push('https://' + domain + $(e).attr('href'));
                };
            });
            resolve(links);
            if( !links.length) {
                reject();
            };
        });


    })
}
async function getPosts(links, elems) {
      let posts = [];
      let count = links.length;

      for (let i = 0; i < count; i++ ) {
          const post = await parsePost(
              links[i],
              elems
          ).then(post => post);
          posts.push(post)

          await delay(i, count, 2000);
      }
      return new Promise((resolve, reject) => {
          if (!posts.length) reject()
          resolve(posts);
      })


}


export {
     parsePost,
    parseLinks,
    getPosts
};



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
