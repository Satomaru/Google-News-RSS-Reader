const stdio = require('./stdio');
const Topic = require('./google-news').Topic;
const topic = new Topic();

/** トピックのカテゴリーリスト。 */
const categoryList = [
  'WORLD',
  'NATION',
  'BUSINESS',
  'TECHNOLOGY',
  'ENTERTAINMENT',
  'SPORTS',
  'SCIENCE',
  'HEALTH'
];

/**
 * カテゴリーの入力要求を表示します。
 */
function promptCategory() {
  categoryList.forEach((value, index) => console.log('%d..%s', index, value));
  process.stdout.write('\nchoose category> ');
}

/**
 * カレントのトピックの説明、および操作の入力要求を表示します。
 */
function showTopicAndPrompt() {
  console.log(topic.describe());

  const prompt = (!topic.isEnd())
    ? `\nmore ${topic.remain} topic(s). q)uit or next when other key> `
    : '\nend of topics. quit when any key> ';

  process.stdout.write(prompt);
}

/**
 * トピックがダウンロード済である場合の入力後処理を行います。
 *
 * @param {string} input - 入力
 */
function onDataWhenDownloaded(input) {
  if (input === 'q') {
    topic.reset();
    promptCategory();
  } else {
    if (topic.move(1)) {
      showTopicAndPrompt();
    } else {
      promptCategory();
    }
 }
}

/**
 * トピックがダウンロード済でない場合の入力後処理を行います。
 *
 * @param {string} input - 入力
 */
function onDataWhenNotDownloaded(input) {
  const index = parseInt(input);

  if (index >= 0 && index < categoryList.length) {
    topic.download(categoryList[index])
      .then(() => showTopicAndPrompt())
      .catch(e => console.error(e));
  } else {
    promptCategory();
  }
}

promptCategory();

stdio.listenStdin(input => {
  console.log();

  if (topic.isDownloaded()) {
    onDataWhenDownloaded(input);
  } else {
    onDataWhenNotDownloaded(input);
  }
})
