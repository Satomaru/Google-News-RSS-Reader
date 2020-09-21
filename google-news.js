const https = require('./https.js');

const technologyTopicsUrl =
  'https://news.google.com/' +
  'news/rss/headlines/section/topic/TECHNOLOGY' +
  '?hl=ja&gl=JP&ceid=JP:ja';

/**
 * GoogleニュースのRSSから、技術記事のトピックを取得します。
 *
 * @module getTechnologyTopics
 * @return {Promise} - 技術記事のトピック (XML)
 */
module.exports.getTechnologyTopics = () => https.get(technologyTopicsUrl);
