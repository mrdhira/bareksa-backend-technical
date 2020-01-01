const Operation = require('src/app/Operation');
const Status = require('http-status');

class GetNews extends Operation {
  constructor({ NewsStatusDomain, newsRepository }) {
    super();
    this.NewsStatus = NewsStatusDomain;
    this.newsRepository = newsRepository
  }

  async getById(id) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;
    try {
      const news = await this.newsRepository.getById(id);
      if (!news) {
        const response = Object.assign({
          statusCode: Status.NOT_FOUND,
          error: 'NotFoundError',
          message: `News with id ${id} not found.`,
        });
        this.emit(NOT_FOUND, response);
      } else {
        const response = Object.assign({
          statusCode: Status.OK,
          data: { news },
        });
        this.emit(SUCCESS, response);
      }
    } catch (error) {
      this.emit(ERROR, error);
    }
  }

  async getAll(type, value) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs;
    try {
      if (type) {
        if (
            (type != 'STATUS' && type != 'TOPICS')
            || 
            (!value || value != 'DRAFT' && value != 'DELETED' && value != 'PUBLISHED')
          ) {
          // Validation Error
          const response = Object.assign({
            statusCode: Status.UNPROCESSABLE_ENTITY,
            error: 'ValidationError',
            message: `Cannot filter by type: ${type}, value: ${value}`,
          });
          this.emit(VALIDATION_ERROR, response);
        } else {
          const news =
            type == 'STATUS'
            ? await this.newsRepository.getByStatus(value)
            : await this.newsRepository.getByTopics(value);

          const response = Object.assign({
            statusCode: Status.OK,
            data: { news },
          });
          this.emit(SUCCESS, response);
        }
      } else {
        const news = await this.newsRepository.getAll();

        const response = Object.assign({
          statusCode: Status.OK,
          data: { news },
        });
        this.emit(SUCCESS, response);
      }
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetNews.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = GetNews;
