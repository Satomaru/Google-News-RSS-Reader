google-news-rss-reader
======================

大層な名前が付いてますが、只のちっちゃいサンプルコードです。これは、
[play.js](https://apps.apple.com/jp/app/play-js-javascript-ide/id1423330822)
を触ってみた際に作りました。

Googleニュースから技術記事を取得して、そのタイトルを表示します。

play.jsの感想
------------

play.js、iPadでプログラミングをする環境としては中々楽しく、
GitHubにプッシュできるのも良い感じなのですが、
以下の2点に困っています。

* 標準出力に一定量以上の出力を行うと、出力が欠けてしまう。
  * 出力の際、文字列操作を行っているのが原因かもしれない。
* JsDocを実行しようとすると、`Cannot find module 'jsdoc/name'` というエラーが出てしまう。
