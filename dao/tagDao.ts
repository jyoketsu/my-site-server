import BaseDao from "./baseDao";
import Tag from "../model/tag";

export default class TagDao extends BaseDao {
  constructor() {
    super(Tag);
  }
}
