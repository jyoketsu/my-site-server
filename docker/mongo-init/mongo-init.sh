# 创建数据库用户
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db = db.getSiblingDB('admin')
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
db = db.getSiblingDB('$MONGO_INITDB_DATABASE')
db.createUser({
  user: "$MONGO_USERNAME",
  pwd: "$MONGO_PASSWORD",
  roles: [
  { role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }
  ]
})
db.grantRolesToUser("$MONGO_USERNAME",[{role:"dbAdmin",db:'$MONGO_INITDB_DATABASE'}])
EOF
