import BaseDao from "./baseDao";
import Link from "../model/link";
import { CallbackError, EnforceDocument } from "mongoose";

export default class LinkDao extends BaseDao {
  constructor() {
    super(Link);
  }

  find() {
    return new Promise(async (resolve, reject) => {
      this.model
        .find()
        .sort({ order: 1 })
        .exec(function (err: CallbackError, record: EnforceDocument<any, any>) {
          if (err) {
            reject(err);
          } else {
            resolve(record);
          }
        });
    });
  }
}
