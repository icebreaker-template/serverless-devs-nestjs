const path = require('path');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'swagger-ui-express',
    'class-transformer/storage',
  ];

  /** @type {import('webpack').Configuration} */
  const config = {
    ...options,
    externals: [],
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
    entry: './src/sls.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'code'),
      chunkFormat: 'commonjs',
      library: {
        type: 'commonjs2',
      },
    },
  };
  return config;
};
