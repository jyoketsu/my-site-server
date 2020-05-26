const BaseDao = require("./baseDao");
const Article = require("../model/article");

class ArticleDao extends BaseDao {
  constructor() {
    super(Article);
  }

  find(filter, sorter, current, pageSize) {
    return new Promise(async (resolve, reject) => {
      const count = await this.count(filter);
      const skip = (current - 1) * pageSize;
      this.Model.find(filter)
        .populate("auth", { username: 1 })
        .populate("category", { name: 1 })
        .populate("tag", { name: 1, color: 1 })
        .skip(skip)
        .limit(pageSize)
        .sort(sorter ? sorter : { updateTime: -1 })
        .exec(function (err, record) {
          if (err) {
            reject(err);
          } else {
            resolve({ array: record, count: count });
          }
        });
    });
  }
}

module.exports = ArticleDao;
