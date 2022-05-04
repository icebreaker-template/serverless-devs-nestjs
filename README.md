# serverless-devs-nestjs

快速利用 `serverless-devs` 把 `nestjs` 部署到阿里云函数计算

## 安装 serverless-devs

```shell
$ npm install @serverless-devs/s -g
```

`cmd/bash` 调用 `s -v` 出现 

```shell
@serverless-devs/s: 2.1.0, core: 0.1.35, s-home: C:\Users\13243\.s, win32-x64, node-v16.14.2
```

即安装成功！

## 根目录解析

- `code` 部署目录
- `scripts` 脚本目录
- `src` 源代码目录
- `test` 测试目录
- `s.yaml` 预置 `Nodejs Runtime` 部署文件
- `s.container.yaml` `Custom Container` 方式部署文件(需要本地安装`docker`和开通阿里云个人版容器镜像服务)



## code 目录解析

- `app.js` and `index.js`： 为 `nestjs` 兼容 `@serverless-devs/fc-http` 的适配入口文件，本质上来说就是一个阿里云的适配层。
- `Dockerfile` 镜像构建文件，可自定义容器环境
- 临时文件 `package.json` 由 `scripts/cp.js` 产生，用于在 `pre-deploy` 时执行 `npm install --production`，安装运行时依赖，同时避免压缩根目录的`node_modules`(里面eslint这些开发相关的没有必要上传到云端)。
- 临时打包产物文件夹 `dist`，由 `nest build` 产生，为源码的构建产物，运行时实际生效的代码

## 部署到阿里云

### Nodejs Runtime 环境部署

生效配置文件为 `s.yaml`

在根目录下，执行 `npm run deploy` 即可部署成功

### Custom Container 部署

生效配置文件为 `s.container.yaml` 

在部署前，请更换 `s.container.yaml` 中 `customContainerConfig` -> `image` 的地址，为你自己的镜像仓库地址！

在根目录下，执行 `npm run deploy:container` 即可部署成功