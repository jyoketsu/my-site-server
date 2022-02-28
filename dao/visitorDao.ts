import BaseDao from "./baseDao";
import Visitor from "../model/visitor";

export default class VisitorDao extends BaseDao {
  constructor() {
    super(Visitor);
  }
}
