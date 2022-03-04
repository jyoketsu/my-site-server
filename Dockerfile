# 加载基础镜像
FROM node:12

# 创建工作目录
WORKDIR /usr/src/app

# 复制代码到工作目录
COPY . /usr/src/app
# 安装项目依赖
RUN npm install
# 编辑
RUN npm run build
# 将编译后的文件复制到工作目录
# RUN mv ./build/* ./
RUN cp -r ./build/* ./
RUN rm -r ./build

# 对外暴露端口
EXPOSE 8099
# 启动Image时执行命令
CMD [ "node", "index.js" ]