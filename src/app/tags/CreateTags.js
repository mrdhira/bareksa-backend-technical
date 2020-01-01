const Operation = require('src/app/Operation');
const tagsDomain = require('src/domain/tags/Tags');
const Status = require('http-status');
const uuid = require('uuid/v4');

class CreateTags extends Operation {
  constructor({ tagsRepository }) {
    super();
    this.tagsRepository = tagsRepository;
  }

  async execute(tagsName) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const tags = new tagsDomain({
        id: uuid(),
        name: tagsName,
      });
      const findOrCreateTags = await this.tagsRepository.findOrCreateByName(tags);
      
      const response = Object.assign({
        statusCode: Status.OK,
        data: { tags: findOrCreateTags },
      });
      this.emit(SUCCESS, response);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

CreateTags.setOutputs(['SUCCESS', 'ERROR']);

module.exports = CreateTags;
