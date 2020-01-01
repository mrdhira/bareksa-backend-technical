const Operation = require('src/app/Operation');
const NewsDomain = require('src/domain/news/News');
const TopicsDomain = require('src/domain/topics/Topics');
const TagsDomain = require('src/domain/tags/Tags');
const Status = require('http-status');
const uuid = require('uuid/v4');

class CreateNews extends Operation {
  constructor({
    newsRepository,
    topicsRepository,
    tagsRepository,
    NewsStatusDomain,
  }) {
    super();
    this.newsRepository = newsRepository;
    this.topicsRepository = topicsRepository;
    this.tagsRepository = tagsRepository;
    this.NewsStatus = NewsStatusDomain;
  }

  async execute(newsTitle, newsText, topicsName, tagsList) {
    const { CREATED, VALIDATION_ERROR, ERROR } = this.outputs;
    try {
      const news = new NewsDomain({
        id: uuid(),
        title: newsTitle,
        text: newsText,
        status: this.NewsStatus.PUBLISHED,
      });
      // Check Validation
      const { valid, errors } = news.validate();
      if (errors) {
        const response = Object.assign({
          statusCode: Status.UNPROCESSABLE_ENTITY,
          error: 'ValidationError',
          message: errors,
        });
        this.emit(VALIDATION_ERROR, response);
      } else {
        const createNews = await this.newsRepository.create(news);

        const topics = new TopicsDomain({
          id: uuid(),
          name: topicsName,
        });
        const findOrCreateTopics = await this.topicsRepository.findOrCreateByName(topics)
  
        await this.topicsRepository.mapTopicsNews(findOrCreateTopics.id, createNews.id);
  
        const tagsArr = new Array();
        for (const tag of tagsList) {
          const tags = new TagsDomain({
            id: uuid(),
            name: tag,
          });
          const findOrCreateTags = await this.tagsRepository.findOrCreateByName(tags);
          tagsArr.push(findOrCreateTags);
  
          await this.newsRepository.mapNewsTags(createNews.id, findOrCreateTags.id);
        }
  
        const response = Object.assign({
          statusCode: Status.CREATED,
          message: 'CREATED',
          data: {
            id: createNews.id,
            title: createNews.title,
            text: createNews.text,
            status: createNews.status,
            topicsId: findOrCreateTopics.id,
            topicsName: findOrCreateTopics.name,
            tags: tagsArr,
            createdAt: createNews.createdAt,
            updatedAt: createNews.updatedAt,
          },
        });
        this.emit(CREATED, response)
      }
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

CreateNews.setOutputs(['CREATED', 'VALIDATION_ERROR', 'ERROR']);

module.exports = CreateNews;
