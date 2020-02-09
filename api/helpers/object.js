class ObjectHelper {
  static removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') this.removeUndefined(obj[key]);
      else if (obj[key] === undefined) delete obj[key];
    });
    return obj;
  }
}

export default ObjectHelper;