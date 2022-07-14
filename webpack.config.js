import { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';

export const entry = './src/index.ts';
const __filename = fileURLToPath(import.meta.url);
const __dirname = _resolve.dirname(__filename);
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
  os: require.resolve('os-browserify/browser'),
};
export const output = {
  filename: 'bundle.js',
  path: _resolve(__dirname, 'dist'),
};
