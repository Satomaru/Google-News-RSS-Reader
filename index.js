const googleNews = require('./google-news.js');

googleNews.getTechnologyTopics(5)
  .then(topics => topics.forEach(topic => console.log('「%s」\n', topic.title)))
  .catch(error => console.error(error));
