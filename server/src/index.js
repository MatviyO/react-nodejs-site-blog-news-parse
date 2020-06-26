import {parsePost, parseLinks, getPosts} from './parsePost';
import fs from 'fs';

const saveResult = (json) => {
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

