const Operation = require('src/app/Operation');
const NewsDomain = require('src/domain/news/News');
const Status = require('http-status');
// const uuid = require('uuid/v4');

class UpdateNews extends Operation {
  constructor({ newsRepository }) {
    super();
    this.newsRepository = newsRepository;
  }

  async execute(id, data) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;
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
        const news = new NewsDomain({ id, ...data });
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
          await this.newsRepository.update(id, data);
          const response = Object.assign({
            statusCode: Status.OK,
            message: `news with id ${id} update successfully.`,
          });
          this.emit(SUCCESS, response);
        }
      }
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

UpdateNews.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateNews;
