const Operation = require('src/app/Operation');
// const NewsDomain = require('src/domain/news/News');
const Status = require('http-status');

class UpdateTags extends Operation {
  constructor({ tagsRepository }) {
    super();
    this.tagsRepository = tagsRepository;
  }

  async execute(id, tagsName) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;
    try {
      const checkTags = await this.tagsRepository.getById(id);
      if (!checkTags) {
        const response = Object.assign({
          statusCode: Status.NOT_FOUND,
          error: 'NotFoundError',
          message: `Tags with id ${id} not found.`,
        });
        this.emit(NOT_FOUND, response);
      } else {
        await this.tagsRepository.update(id, tagsName);
        const response = Object.assign({
          statusCode: Status.OK,
          message: `tags with id ${id} update successfully.`,
        });
        this.emit(SUCCESS, response);
      }
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

UpdateTags.setOutputs(['SUCCESS', 'NOT_FOUND', 'ERROR']);

module.exports = UpdateTags;
