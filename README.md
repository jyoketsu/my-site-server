# 我的个人网站-后端服务

以`Express` + `TypeScript` + `Mongoose`技术栈来构建的应用

## Development

`yarn start`  
The run dev command will start the server and listen on the configured port. The port can be configured in ./index.ts

## Deploy

`docker-compose up -d`

```
docker                        # docker用目录
└───mongo_data                # mongoDB数据用目录
|       └───dump              # mongoDB备份用目录
└───mongo_home
|       └───mongodb
│           	│ .dbshell    # history file
└───mongo-init
│       │ mongo-init.sh       # mongo Authentication 脚本
```

创建`.dbshell`的原因见 [Error saving history file](https://github.com/docker-library/mongo/issues/323)
