const { https } = require('follow-redirects');

/**
 * GETリクエストを行います。
 *
 * @module get
 * @param {string} url - リクエストURL
 * @return {Promise} - レスポンスの内容
 */
module.exports.get = url =>
  new Promise((resolve, reject) =>
    https.get(url, res => {
      if (res.statusCode != 200) {
        reject(`statusCode: ${res.statusCode}`);
      } else {
        let body = '';
        res.on('data', data => body = body + data);
        res.on('end', () => resolve(body));
        res.on('error', e => reject(e));
      }
    })
  );
