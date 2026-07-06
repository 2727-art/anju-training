import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages（https://2727-art.github.io/anju-training/）配信用に
// 本番ビルドのみ base を /anju-training/ にする。ローカル開発は / のまま。
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/anju-training/' : '/',
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})) as never;
