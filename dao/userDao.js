const BaseDao = require("./baseDao");
const User = require("../model/user");

class UserDao extends BaseDao {
  constructor() {
    super(User);
  }
}

module.exports = UserDao;
