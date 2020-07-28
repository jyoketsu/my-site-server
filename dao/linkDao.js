const BaseDao = require("./baseDao");
const Link = require("../model/link");

class LinkDao extends BaseDao {
  constructor() {
    super(Link);
  }

  find() {
    return new Promise(async (resolve, reject) => {
      this.Model.find()
        .sort({ order: 1 })
        .exec(function (err, record) {
          if (err) {
            reject(err);
          } else {
            resolve(record);
          }
        });
    });
  }
}

module.exports = LinkDao;
