import BaseDao from "./baseDao";
import Resume from "../model/resume";

export default class ResumeDao extends BaseDao {
  constructor() {
    super(Resume);
  }
}
