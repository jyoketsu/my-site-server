import BaseDao from "./baseDao";
import Category from "../model/category";

export default class CategoryDao extends BaseDao {
  constructor() {
    super(Category);
  }
}
