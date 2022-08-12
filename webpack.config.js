import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
export const entry = './src/index.ts';
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
export const output = {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
};
export const Plugin = [new CaseSensitivePathsPlugin()];
