# https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/
# https://segmentfault.com/a/1190000019882566

# 加载基础镜像
FROM alpine AS builder
RUN apk add --no-cache --update nodejs npm

# 创建工作目录
WORKDIR /usr/src/app
# 复制package.json到工作目录
COPY package*.json ./
COPY private.pem public.pem /usr/src/app/build/
# 安装依赖
RUN npm install
# 使用COPY命令绑定你的应用程序
COPY . .
# 编译
RUN npm run build

# 将编译后的文件复制到工作目录 && 删除./build目录
# RUN cp -r ./build/* ./ && rm -r ./build

# 将build目录设为工作目录
WORKDIR /usr/src/app/build

# 对外暴露端口
EXPOSE 8099
# 启动Image时执行命令
CMD [ "node", "index.js" ]