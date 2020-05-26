const BaseDao = require("./baseDao");
const Tag = require("../model/tag");

class TagDao extends BaseDao {
  constructor() {
    super(Tag);
  }
}

module.exports = TagDao;
