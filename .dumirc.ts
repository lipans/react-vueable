import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-vueable',
    apiHeader: false,
    hideHomeNav: true,
    footerConfig: {
      columns: false,
    },
  },
  locales: [
    { id: 'en-US', name: 'EN', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  alias: {
    'dumi-theme-antd-style': path.join(__dirname, '../src'),
  },
});
