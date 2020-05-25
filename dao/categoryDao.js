const BaseDao = require("./baseDao");
const Category = require("../model/category");

class CategoryDao extends BaseDao {
  constructor() {
    super(Category);
  }
}

module.exports = CategoryDao;
