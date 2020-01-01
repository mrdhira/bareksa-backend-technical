const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const NewsController = {
  get router() {
    const router = Router();

    router.get('/', inject('getNews'), this.getAll);
    router.get('/:id', inject('getNews'), this.getById); 
    router.put('/:id/update', inject('updateNews'), this.update);
    router.delete('/:id/delete', inject('deleteNews'), this.delete);
    router.post('/create', inject('createNews'), this.create);
    
    return router;
  },


  getAll(req, res, next) {
    const { getNews } = req;
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = getNews.outputs;
    const { type, value } = req.query;

    getNews
      .on(SUCCESS, (response) => {
        res
          .status(Status.OK)
          .json(response);
      })
      .on(VALIDATION_ERROR, (response) => {
        res
          .status(Status.UNPROCESSABLE_ENTITY)
          .json(response);
      })
      .on(ERROR, next);

    getNews.getAll(type, value);
  },

  getById(req, res, next) {
    const { getNews } = req;
    const { SUCCESS, NOT_FOUND, ERROR } = getNews.outputs;
    const { id } = req.params;

    getNews
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

    getNews.getById(id);
  },

  update(req, res, next) {
    const { updateNews } = req;
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = updateNews.outputs;
    const { id } = req.params;

    updateNews
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
      .on(VALIDATION_ERROR, (response) => {
        res
          .status(Status.UNPROCESSABLE_ENTITY)
          .json(response);
      })
      .on(ERROR, next);

    updateNews.execute(id, req.body);
  },

  delete(req, res, next) {
    const { deleteNews } = req;
    const { SUCCESS, NOT_FOUND, ERROR } = deleteNews.outputs;
    const { id } = req.params;

    deleteNews
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

    deleteNews.execute(id);
  },

  create(req, res, next) {
    const { createNews } = req;
    const { CREATED, VALIDATION_ERROR, ERROR } = createNews.outputs;
    const { newsTitle, newsText, topicsName, tagsList } = req.body;

    createNews
      .on(CREATED, (response) => {
        res
          .status(Status.CREATED)
          .json(response);
      })
      .on(VALIDATION_ERROR, (response) => {
        res
          .status(Status.UNPROCESSABLE_ENTITY)
          .json(response);
      })
      .on(ERROR, next);
    
    createNews.execute(newsTitle, newsText, topicsName, tagsList);
  },

};

module.exports = NewsController;
