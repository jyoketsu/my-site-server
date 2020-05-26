const BaseDao = require("./baseDao");
const Visitor = require("../model/visitor");

class VisitorDao extends BaseDao {
  constructor() {
    super(Visitor);
  }
}

module.exports = VisitorDao;
