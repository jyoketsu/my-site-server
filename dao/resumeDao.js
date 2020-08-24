const BaseDao = require("./baseDao");
const Resume = require("../model/resume");

class ResumeDao extends BaseDao {
  constructor() {
    super(Resume);
  }
}

module.exports = ResumeDao;
