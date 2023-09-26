const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    unstable_enableSymlinks: true,
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
  },

  /**
   * We are using yarn workspaces
   * All the deps are nohoisted
   * Because of this we need to watch folders that we want to use in the package
   */
  watchFolders: [path.resolve(__dirname, '../packages/activity-builder')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
