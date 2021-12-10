import { StorybookConfig } from '@storybook/core-common/types';
import merge from 'webpack-merge';

import webpackConfigGen from '../webpack.storybook.config';

const webpackConfig = webpackConfigGen();

const storybookConfig: StorybookConfig = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  core: {
    builder: 'webpack5',
  },
  logLevel:     'error',
  webpackFinal: config => {
    const newConfig = merge(webpackConfig, config);
    newConfig.module ||= {};
    newConfig.output ||= {};

    // Rewriting default rules
    newConfig.module.rules = webpackConfig.module?.rules;
    // Storybook config has a publicPath = '', this is cause of loading static files troubles
    newConfig.output.publicPath = '/';

    return newConfig;
  },
};

export default storybookConfig;
