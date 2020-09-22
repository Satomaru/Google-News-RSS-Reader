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
    https.get(url, response => {
     if (response.statusCode != 200) {
        reject(`statusCode: ${response.statusCode}`);
      } else {
        let body = '';
        response.on('data', data => body = body + data);
        response.on('end', () => resolve(body));
        response.on('error', e => reject(e));
      }
    })
  );
