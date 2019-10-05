class NotFound {
  static sendNotFound(req, res, next) {
    return res.sendStatus(404);
  }
}

export default NotFound;
