# 发布规范
TODO

# publish
npm发布规范建议加上用户名称，即类似 `@hudk/package_name` 

此时，默认的发布类型是私有包，因此会报错 `You must sign up for private packages`

因此，需要修改包权限，使用 `--access`

    npm publish --access=public