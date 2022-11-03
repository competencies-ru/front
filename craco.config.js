const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@ui/*': path.resolve(__dirname, 'src/ui/*'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@utils/*': path.resolve(__dirname, 'src/utils/*'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages/*': path.resolve(__dirname, 'src/pages/*'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components/*': path.resolve(__dirname, 'src/components/*'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lotties/*': path.resolve(__dirname, 'src/lotties/*'),
      '@lotties': path.resolve(__dirname, 'src/lotties'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@types/*': path.resolve(__dirname, 'src/types/*'),
      '@models': path.resolve(__dirname, 'src/models'),
    },
    plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'server' })],
  },
};
