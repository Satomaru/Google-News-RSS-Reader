/*
 * Googleニュースから技術記事を取得して、そのタイトルを表示します。
 *
 * 記事を5件に絞っているのは、
 * 標準出力に対して、短時間に一定量以上の出力を行うと、
 * 出力が欠けてしまう不具合が発生した為です。
 * 原因は不明です。
 *
 * fast-xml-parserは、本来はgoogle-news.jsの内部で使用するべきですが、
 * google-news.jsからrequireすると、なぜか見つかりません。
 * 原因は不明です。
 */

const googleNews = require('./google-news.js');
const xmlParser = require('fast-xml-parser');

googleNews.getTechnologyTopics()
  .then(xml => xmlParser.parse(xml).rss.channel.item.slice(0, 5))
  .then(items => items.forEach(item => console.log('「%s」', item.title)))
  .catch(error => console.error(error));
