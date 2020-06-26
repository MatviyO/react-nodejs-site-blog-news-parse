import {parsePost, parseLinks, fetchLinks} from './parsePost';

const urlPage = 'http://grozny-inform.ru/news/politic'
parseLinks
    (urlPage, '.partition_news a')
        .then(links => {
            fetchLinks(links)

})

