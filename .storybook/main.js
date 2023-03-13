module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../.themes'],
  core: {
    builder: 'webpack4'
  },
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@a110/storybook-expand-all'],
  framework: '@storybook/react'
};
