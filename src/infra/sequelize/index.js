const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

module.exports = ({ config, basePath, indexFile = 'index.js' }) => {
  const sequelize = new Sequelize(config.db);

  const loaded = {
    sequelize,
  };

  const dir = path.join(basePath, '.');

  fs
    .readdirSync(dir)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const modelDir = path.join(dir, file)
      const model = sequelize.import(modelDir)
      loaded[model.name] = model
  })

  Object.keys(loaded).forEach(key => {
    if ('associate' in loaded[key]) {
      loaded[key].associate(loaded)
    }
  });

  return loaded;
};
