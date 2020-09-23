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
 * カテゴリーの説明、および操作の入力要求を表示します。
 */
function showTopicAndPrompt() {
  console.log(topic.describe());
  process.stdout.write(`\nmore ${topic.remain} topic(s). q)uit or next> `);
}

/**
 * トピックがダウンロード済である場合の入力後処理を行います。
 */
function whenDownloaded(input) {
  if (input === 'q') {
    topic.reset();
    promptCategory();
  } else {
    topic.move(1);
    showTopicAndPrompt();
  }
}

/**
 * トピックがダウンロード済でない場合の入力後処理を行います。
 */
function whenNotDownloaded(input) {
  const index = parseInt(input);

  if (index >= 0 && index < categoryList.length) {
    topic.download(categoryList[index]).then(() => showTopicAndPrompt());
  } else {
    promptCategory();
  }
}

promptCategory();

process.stdin.on('data', buffer => {
  const input = buffer.toString().replace(/[\s\0]+$/, '');
  console.log();

  if (topic.idDownloaded()) {
    whenDownloaded(input);
  } else {
    whenNotDownloaded(input);
  }
});
