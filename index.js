const { http, https } = require('follow-redirects');

const topicTechnologyUrl = 'https://news.google.com/' +
  'news/rss/headlines/section/topic/TECHNOLOGY' +
  '?hl=ja&gl=JP&ceid=JP:ja';

const titleRegExp = /<title>(.+?)<\/title>/;

const request = url =>
  new Promise((resolve, reject) =>
    https.get(url, res => {
      let body = '';
      res.on('data', data => body = body + data);
      res.on('end', () => resolve(body));
      res.on('error', e => reject(e));
    })
  );

const getItems = (body, count) =>
  body.match(/<item>.+?<\/item>/g)
    .slice(0, count)
    .map(item => ({
      title: titleRegExp.exec(item)[1]
    }));

request(topicTechnologyUrl)
  .then(body => getItems(body, 10).forEach(item => console.log(item.title)));
