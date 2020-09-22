const https = require('./https.js');
const xmlParser = require('fast-xml-parser');

const technologyTopicsUrl =
  'https://news.google.com' +
  '/news/rss/headlines/section/topic/TECHNOLOGY' +
  '?hl=ja&gl=JP&ceid=JP:ja';

/**
 * GoogleニュースのRSSから、技術記事のトピックを取得します。
 *
 * @module getTechnologyTopics
 * @param {number} [length] - 記事の取得件数
 * @return {Promise} - 技術記事のJSON配列
 */
module.exports.getTechnologyTopics = length =>
  https.get(technologyTopicsUrl)
    .then(xml => {
      const topics = xmlParser.parse(xml).rss.channel.item;
      return (length !== undefined) ? topics.slice(0, length) : topics;
    });
