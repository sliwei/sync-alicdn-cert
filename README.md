# 简介

[![deploy](https://github.com/sliwei/[blog-serve](package.json)/actions/workflows/action.yaml/badge.svg)](https://github.com/sliwei/[blog-serve](package.json)/actions/workflows/action.yaml)

- letsencrypt证书自动更新阿里云cdn
- 单域名
- 只执行一次

# 使用

配置docker-compose.yml执行即可

- ACCESS_KEY_ID=xxx
- ACCESS_KEY_SECRET=xxx
- DOMAIN=i.bstu.cn
- LETS_ENCRYPT_CERTS_PATH=/cert