const { attributes } = require('structure');

const Topics = attributes({
  id: {
    type: String,
    guid: {
      version: ['uuidv4']
    },
    required: true,
  },
  name: String,
  createdAt: Date,
  updatedAt: Date,
})(class Topics {

});

module.exports = Topics;
