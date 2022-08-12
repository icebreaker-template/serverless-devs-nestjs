# serverless-devs-nestjs

快速利用 `serverless-devs` 把 `nestjs` 部署到阿里云函数计算

## 安装 serverless-devs

```shell
npm install @serverless-devs/s -g
```

`cmd/bash` 调用 `s -v` 出现

```shell
@serverless-devs/s: 2.1.0, core: 0.1.35, s-home: C:\Users\13243\.s, win32-x64, node-v16.14.2
```

即安装成功！

## 根目录解析

- `code` `serverless`部署目录
- `dist` `build` 部署目录
- `scripts` 脚本目录
- `src` 源代码目录
- `test` 测试目录
- `s.yaml` 预置 `Nodejs 14 Runtime` 部署文件
- `s.container.yaml` `Custom Container` 方式部署文件(需要本地安装`docker`和开通阿里云个人版容器镜像服务)
- `s.runtime.yaml` `Custom Runtime` 方式部署文件, 需要下载 [`nodejs Linux Binaries (x64)`](https://nodejs.org/en/download/)

## 打包

本项目使用 `webpack` 来让部署的函数文件体积更小，从而减少冷启动的时间。`npm run build:sls` 可以把所有的代码打到 `code` 目录下。

如果有部分包，无法使用 `webpack` 顺利打包，则可以把它的名称，放入 `webpack.config.js` 的 `externals` 中。

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

### Custom Runtime 部署

生效配置文件为 `s.runtime.yaml`

在部署前，请先下载 [`nodejs Linux Binaries (x64)`](https://nodejs.org/en/download/) 并解压到 `code` 目录(本模板使用的是 `node-v16.15.0-linux-x64`, 如果不是这个版本需要更改 `yml` 的 `customRuntimeConfig`)

在根目录下，执行 `npm run deploy:runtime` 即可部署成功
