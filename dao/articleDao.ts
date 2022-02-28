import BaseDao from "./baseDao";
import Article from "../model/article";
import { CallbackError, FilterQuery, EnforceDocument } from "mongoose";

export default class ArticleDao extends BaseDao {
  constructor() {
    super(Article);
  }

  findByIdDetail(_id: string) {
    return new Promise((resolve, reject) => {
      this.model
        .findById(_id)
        .populate("auth", { username: 1 })
        .populate("category", { name: 1 })
        .populate("tags", { name: 1, color: 1 })
        .exec(function (err: CallbackError, record: EnforceDocument<any, any>) {
          if (err) {
            reject(err);
          } else {
            resolve(record);
          }
        });
    });
  }

  find(
    filter: FilterQuery<any>,
    current: number,
    pageSize: number,
    sorter?: any
  ) {
    return new Promise(async (resolve, reject) => {
      const count = await this.count(filter);
      const skip = (current - 1) * pageSize;
      this.model
        .find(filter)
        .populate("auth", { username: 1 })
        .populate("category", { name: 1 })
        .populate("tags", { name: 1, color: 1 })
        .skip(skip)
        .limit(pageSize)
        .sort(sorter ? sorter : { createTime: -1 })
        .select("-content")
        .exec(function (err: CallbackError, record: EnforceDocument<any, any>) {
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
      this.model
        .aggregate([
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
        ])
        .exec(function (err, record) {
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
      this.model
        .aggregate()
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
