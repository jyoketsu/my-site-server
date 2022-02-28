import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Profile {
  name: string;
  about: string;
  education: string;
  location: string;
  birthYear: string;
  position: string;
  email: string;
  phone: string;
  website: string;
  githubName: string;
}
interface Skill {
  name: string;
  level: number;
  iconUrl: string;
}
interface Experience {
  company: string;
  position: string;
  startTime: Date;
  endTime: Date;
  description: string;
}
interface Project {
  name: string;
  platform: string;
  timeperiod: Date[];
  description: string;
  url: string;
}
interface Resume {
  profile: Profile;
  skills: Skill[];
  knowledge: string;
  experience: Experience[];
  projects: Project[];
  lang: "zh-Hans" | "zh-Hant" | "ja" | "en";
  user: string;
  createTime: Date;
  updateTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
let schema = new Schema<Resume>(
  {
    // 个人信息
    profile: {
      // 姓名
      name: { type: String, maxlength: 200 },
      // 自我介绍
      about: { type: String, maxlength: 500 },
      // 学历
      education: { type: String, maxlength: 20 },
      // 地点
      location: { type: String, maxlength: 200 },
      // 出生年份
      birthYear: { type: String, maxlength: 100 },
      // 职位
      position: { type: String, maxlength: 200 },
      // 邮箱
      email: { type: String, maxlength: 200 },
      // 电话
      phone: { type: String, maxlength: 11 },
      // 个人网站
      website: { type: String, maxlength: 100 },
      // github用户名
      githubName: { type: String, maxlength: 100 },
    },
    // 专业技能
    skills: [
      {
        name: { type: String, maxlength: 20 },
        level: { type: Number, min: 0, max: 100 },
        iconUri: { type: String, maxlength: 200 },
      },
    ],
    // 其他技能描述
    knowledge: { type: String, maxlength: 500 },
    // 工作经验
    experience: [
      {
        company: { type: String, maxlength: 100 },
        position: { type: String, maxlength: 100 },
        startTime: Date,
        endTime: Date,
        description: { type: String, maxlength: 500 },
      },
    ],
    // 项目经验
    projects: [
      {
        name: { type: String, maxlength: 100 },
        platform: { type: String, maxlength: 100 },
        timeperiod: [{ type: Date }],
        description: { type: String, maxlength: 500 },
        url: { type: String, maxlength: 100 },
      },
    ],
    // 简历语言：简体中文、繁体中文、日本语、英语
    lang: { type: ["zh-Hans", "zh-Hant", "ja", "en"], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "用户不能为空"],
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
    updateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "createTime" },
  }
);

// 3. Create a Model.
const ResumeModel = model<Resume>("Resume", schema);
export default ResumeModel;
