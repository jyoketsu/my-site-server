class BaseDao {
  /**
   * 子类构造传入对应的 Model 类
   *
   * @param Model
   */
  constructor(Model) {
    this.Model = Model;
  }

  /**
   * 使用 Model 的 静态方法 create() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  create(obj) {
    return new Promise((resolve, reject) => {
      let entity = new this.Model(obj);
      this.Model.create(entity, (error, result) => {
        if (error) {
          console.log("create error--> ", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * 使用 Model save() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  save(obj) {
    return new Promise((resolve, reject) => {
      let entity = new this.Model(obj);
      entity.save((error, result) => {
        if (error) {
          console.log("save error--> ", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  findById(_id) {
    return new Promise((resolve, reject) => {
      this.Model.findById(_id, (error, results) => {
        if (error) {
          console.log("findById error--> ", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * 查询所有符合条件 docs
   *
   * @param condition 查找条件
   * @param constraints
   * @returns {Promise}
   */
  findAll(condition, constraints) {
    return new Promise((resolve, reject) => {
      this.Model.find(
        condition,
        constraints ? constraints : null,
        (error, results) => {
          if (error) {
            console.log("findAll error--> ", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  /**
   * 查找符合条件的第一条 doc
   *
   * @param condition
   * @param constraints
   * @returns {Promise}
   */
  findOne(condition, constraints) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(
        condition,
        constraints ? constraints : null,
        (error, results) => {
          if (error) {
            console.log("findOne error--> ", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  /**
   * 查找排序之后的第一条
   *
   * @param condition
   * @param orderColumn
   * @param orderType
   * @returns {Promise}
   */
  findOneByOrder(condition, orderColumn, orderType) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(condition)
        .sort({ [orderColumn]: orderType })
        .exec(function (err, record) {
          console.log(record);
          if (err) {
            reject(err);
          } else {
            resolve(record);
          }
        });
    });
  }

  /**
   * 更新 docs
   *
   * @param condition 查找条件
   * @param updater 更新操作
   * @returns {Promise}
   */
  update(condition, updater) {
    return new Promise((resolve, reject) => {
      this.Model.updateOne(condition, updater, (error, results) => {
        if (error) {
          console.log("update error--> ", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * 移除 doc
   *
   * @param condition 查找条件
   * @returns {Promise}
   */
  deleteOne(condition) {
    return new Promise((resolve, reject) => {
      this.Model.deleteOne(condition, (error, result) => {
        if (error) {
          console.log("remove error--> ", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * 获取数量
   *
   * @param filter
   * @returns {Promise}
   */
  count(filter) {
    return new Promise((resolve, reject) => {
      this.Model.countDocuments(filter, (error, results) => {
        if (error) {
          console.log("countDocuments error--> ", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = BaseDao;
