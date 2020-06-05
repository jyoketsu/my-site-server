const BaseDao = require("./baseDao");
const Article = require("../model/article");

class ArticleDao extends BaseDao {
  constructor() {
    super(Article);
  }

  findByIdDetail(_id) {
    return new Promise((resolve, reject) => {
      this.Model.findById(_id)
        .populate("auth", { username: 1 })
        .populate("category", { name: 1 })
        .populate("tags", { name: 1, color: 1 })
        .exec(function (err, record) {
          if (err) {
            reject(err);
          } else {
            resolve(record);
          }
        });
    });
  }

  find(filter, sorter, current, pageSize) {
    return new Promise(async (resolve, reject) => {
      const count = await this.count(filter);
      const skip = (current - 1) * pageSize;
      this.Model.find(filter)
        .populate("auth", { username: 1 })
        .populate("category", { name: 1 })
        .populate("tags", { name: 1, color: 1 })
        .skip(skip)
        .limit(pageSize)
        .sort(sorter ? sorter : { updateTime: -1 })
        .select("-content")
        .exec(function (err, record) {
          if (err) {
            reject(err);
          } else {
            resolve({ array: record, count: count });
          }
        });
    });
  }

  // 计算各个类别的文章数
  categoryArticleCount() {
    return new Promise((resolve, reject) => {
      this.Model.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: { count: 1, name: "$category.name" },
        },
      ]).exec(function (err, record) {
        if (err) {
          reject(err);
        } else {
          resolve(record);
        }
      });
    });
  }

  // 计算各个标签的文章数
  tagArticleCount() {
    return new Promise((resolve, reject) => {
      this.Model.aggregate()
        .unwind("tags")
        .group({ _id: "$tags", count: { $sum: 1 } })
        .lookup({
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tag",
        })
        .unwind("tag")
        .project({ count: 1, name: "$tag.name" })
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

module.exports = ArticleDao;
