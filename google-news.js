const RssParser = require('rss-parser');
const parser = new RssParser();

/**
 * Googleニュースのカテゴリー別トピック一覧URLを取得します。
 */
function getCategoryTopicsUrl(category) {
  return 'https://news.google.com' +
    '/news/rss/headlines/section/topic/' + category +
    '?hl=ja&gl=JP&ceid=JP:ja';
}

/**
 * トピックを管理します。
 *
 * @module google-news
 * @class Topic
 */
module.exports.Topic = class Topic {

  /** トピックのカテゴリー。 */
  category = null;

  /** トピックのリスト。 */
  items = [];

  /** トピックのインデックス。 */
  index = 0;

  /**
   * カレントのトピック。
   */
  get current() {
    return (this.index >= 0 && this.index < this.size) ? this.items[this.index] : null;
  }

  /**
   * トピックの個数。
   */
  get size() {
    return this.items.length;
  }

  /**
   * カレントのトピック以降に残っているトピックの個数。
   */
  get remain() {
    return (this.size === 0) ? 0 : this.size - this.index - 1;
  }

  /**
   * カレントのトピックの説明を作成します。
   *
   * @return {string} - カレントのトピックの説明
   */
  describe() {
    if (this.isDownloaded()) {
      const json = JSON.stringify(this.current, null, 2);
      return `${this.category} #${this.index} ${json}`;
    } else {
      return '(not downloaded)';
    }
  }

  /**
   * トピックがダウンロード済であることを判定します。
   *
   * @return トピックがダウンロード済である場合はtrue
   */
  isDownloaded() {
    return this.category !== null;
  }

  /**
   * カレントのトピックが末尾であることを判定します。
   *
   * @return カレントのトピックが末尾である場合はtrue
   */
  isEnd() {
    return this.remain === 0;
  }

  /**
   * 全てのトピックを消去します。
   */
  reset() {
    this.category = null;
    this.items = [];
    this.index = 0;
  }

  /**
   * トピックをダウンロードします。
   *
   * @param {string} category - トピックのカテゴリー名
   * @return {Promise} - このオブジェクト自身
   */
  download(category) {
    this.reset();

    return parser.parseURL(getCategoryTopicsUrl(category)).then(feed => {
      this.items = feed.items.map(item => ({
        title: item.title,
        pubDate: item.pubDate
      }));

      this.category = category;
      return this;
    });
  }

  /**
   * カレントのトピックを変更します。
   *
   * @param {number} index - トピックのインデックス
   * @return {boolean} - 変更に成功した場合はtrue
   */
  jump(index) {
    if (index < 0 || index >= this.size) {
      return false;
    }

    this.index = index;
    return true;
  }

  /**
   * カレントのトピックをオフセット移動します。
   *
   * @param {number} offset - 移動量
   * @return {boolean} - 移動に成功した場合はtrue
   */
  move(offset) {
    return this.jump(this.index + offset);
  }
}
