// Ignite CLI plugin for BossBoilerplate
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = "react-native-MODULENAME";
const NPM_MODULE_VERSION = "0.0.1";

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()

const add = async function(toolbox) {
  // Learn more about toolbox: https://infinitered.github.io/gluegun/#/toolbox-api.md
  const { ignite } = toolbox;

  await ignite.addModule(NPM_MODULE_NAME, {
    link: true,
    version: NPM_MODULE_VERSION
  });
};

/**
 * Remove yourself from the project.
 */
const remove = async function(toolbox) {
  // Learn more about toolbox: https://infinitered.github.io/gluegun/#/toolbox-api.md
  const { ignite } = toolbox;
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true });
};

// Required in all Ignite CLI plugins
module.exports = { add, remove };
