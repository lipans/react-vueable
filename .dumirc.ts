import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-vueable',
    apiHeader: false,
    footerConfig: {
      columns: false
    }
  },
});
