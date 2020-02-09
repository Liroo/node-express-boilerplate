class NotFound {
  // eslint-disable-next-line no-unused-vars
  static sendNotFound(req, res, next) {
    return res.sendStatus(404);
  }
}

export default NotFound;
