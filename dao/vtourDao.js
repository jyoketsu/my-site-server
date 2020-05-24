const BaseDao = require('./baseDao');
const Vtour = require('../model/vtour');

class VtourDao extends BaseDao {
    constructor() {
        super(Vtour);
    }
}

module.exports = VtourDao;