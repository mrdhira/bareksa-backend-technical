const Operation = require('src/app/Operation');
const Status = require('http-status');

class GetTags extends Operation {
  constructor({ tagsRepository }) {
    super();
    this.tagsRepository = tagsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const tags = await this.tagsRepository.getAll();
      
      const response = Object.assign({
        statusCode: Status.OK,
        data: { tags },
      });
      this.emit(SUCCESS, response);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetTags.setOutputs(['SUCCESS', 'NOT_FOUND', 'ERROR']);

module.exports = GetTags;
