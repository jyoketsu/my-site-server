const BaseDao = require("./baseDao");
const Link = require("../model/link");

class LinkDao extends BaseDao {
  constructor() {
    super(Link);
  }
}

module.exports = LinkDao;
