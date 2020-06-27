import {parsePost, parseLinks, getPosts} from './parsePost';
import fs from 'fs';
import iconv from 'iconv-lite';

const saveResult = (json) => {
    json = iconv.decode(new Buffer(json), 'win1251')
    fs.writeFile('result.json', json, (error) => {
        if (err) {
            console.log(error)
        }
    })
}
const urlPage = 'http://grozny-inform.ru/news/politic'
parseLinks
    (urlPage, '.partition_news a')
        .then(links => {
            getPosts(links).then(posts => saveResult(JSON.stringify(posts)))

})

