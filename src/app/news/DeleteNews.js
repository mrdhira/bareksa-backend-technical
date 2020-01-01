const Operation = require('src/app/Operation');
const Status = require('http-status');

class DeleteNews extends Operation {
  constructor({ NewsStatusDomain, newsRepository }) {
    super();
    this.newsRepository = newsRepository;
    this.NewsStatus = NewsStatusDomain;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;
    try {
      const checkNews = await this.newsRepository.getById(id);
      if (!checkNews) {
        const response = Object.assign({
          statusCode: Status.NOT_FOUND,
          error: 'NotFoundError',
          message: `News with id ${id} not found.`,
        });
        this.emit(NOT_FOUND, response);
      } else {
        await this.newsRepository.delete(id);
        const response = Object.assign({
          statusCode: Status.OK,
          message: `news with id ${id} delete successfully.`,
        });
        this.emit(SUCCESS, response);
      }
    } catch (error) {
      this.emit(ERROR, error)
    }
  }
}

DeleteNews.setOutputs(['SUCCESS', 'NOT_FOUND', 'ERROR']);

module.exports = DeleteNews;
