const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const TagsController = {
  get router() {
    const router = Router();

    router.get('/', inject('getTags'), this.getAll);
    router.put('/:id/update', inject('updateTags'), this.update);
    router.delete('/:id/delete', inject('deleteTags'), this.delete);
    router.post('/create', inject('createTags'), this.create);

    return router;
  },

  getAll(req, res, next) {
    const { getTags } = req;
    const { SUCCESS, ERROR } = getTags.outputs;

    getTags
      .on(SUCCESS, (response) => {
        res
          .status(Status.OK)
          .json(response);
      })
      .on(ERROR, next);

    getTags.execute();
  },

  update(req, res, next) {
    const { updateTags } = req;
    const { SUCCESS, NOT_FOUND, ERROR } = updateTags.outputs;
    const { id } = req.params;
    const { tagsName } = req.body;

    updateTags
      .on(SUCCESS, (response) => {
        res
          .status(Status.OK)
          .json(response);
      })
      .on(NOT_FOUND, (response) => {
        res
          .status(Status.NOT_FOUND)
          .json(response);
      })
      .on(ERROR, next);

    updateTags.execute(id, tagsName);
  },

  delete(req, res, next) {
    const { deleteTags } = req;
    const { SUCCESS, NOT_FOUND, ERROR } = deleteTags.outputs;
    const { id } = req.params;

    deleteTags
      .on(SUCCESS, (response) => {
        res
          .status(Status.OK)
          .json(response);
      })
      .on(NOT_FOUND, (response) => {
        res
          .status(Status.NOT_FOUND)
          .json(response);
      })
      .on(ERROR, next);

    deleteTags.execute(id);
  },

  create(req, res, next) {
    const { createTags } = req;
    const { SUCCESS, ERROR } = createTags.outputs;
    const { tagsName } = req.body;

    createTags
      .on(SUCCESS, (response) => {
        res
          .status(Status.OK)
          .json(response);
      })
      .on(ERROR, next);

    createTags.execute(tagsName);
  },
};

module.exports = TagsController;
