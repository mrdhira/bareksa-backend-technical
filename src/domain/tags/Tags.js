const { attributes } = require('structur');

const Tags = attributes({
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
})(class Tags {
  
});

module.exports = Tags;
