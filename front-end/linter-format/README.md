# install
1. 安装eslint及eslint-config-standard

        npm install -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
1. 安装prettier

        npm install -D prettier
1. 安装prettier-eslint

        npm install -D prettier-eslint prettier-eslint-cli
1. 安装stylelint及stylelint-config-standard

        npm install -D stylelint stylelint-config-standard
1. 修改 `package.json` 中 `scripts` 下需要linter的文件路径

# usage
1. commit前会自动进行eslint与stylelint检查
1. 可以随时采用 `npm run format` 对文件进行prettier+eslint的格式化