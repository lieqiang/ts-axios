#!/user/bin/env sh
set -e
echo "Enter release version:"
#read VERSION
# -n 限定一个字符
#read -p "release $VERSION - are you sure?(y/n)" -n 1 -r
echo # (optional) move to a new line
#if [[ $REPLAY =~ ^[Yy]$ ]]
#then
echo "release 0.0.4 ..."

# 提交变化文件到暂存区
git add -A
# 提交代码 注释字段为："[build] $VERSION"
git commit -m "[build] 0.0.4"
# 提交一条修改记录 注释："[release] $VERSION"
npm version "0.0.4" --message "[release] 0.0.4"
git push origin master

# pulish 代码发布到npm
npm publish
fi