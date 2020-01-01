const Operation = require('src/app/Operation');
const Status = require('http-status');

class DeleteTags extends Operation {
  constructor({ tagsRepository }) {
    super();
    this.tagsRepository = tagsRepository;
  }

  async execute(id) {
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
        await this.tagsRepository.delete(id);
        await this.tagsRepository.deleteMapNewsTags(id);
        const response = Object.assign({
          statusCode: Status.OK,
          message: `tags with id ${id} delete successfully.`,
        });
        this.emit(SUCCESS, response);
      }
    } catch (error) {
      this.emit(ERROR, error)
    }
  }
}

DeleteTags.setOutputs(['SUCCESS', 'NOT_FOUND', 'ERROR']);

module.exports = DeleteTags;
