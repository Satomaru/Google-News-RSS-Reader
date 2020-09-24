/**
 * 標準入力の入力待ちを開始します。
 *
 * @module stdio
 * @function listenStdin
 * @param {function} callback - 入力を受け取る関数
 */
module.exports.listenStdin = callback => {
  process.stdin.resume();
  process.stdin.on('data', buffer => callback(buffer.toString().replace(/[\s\0]+$/, '').trim()));
}
