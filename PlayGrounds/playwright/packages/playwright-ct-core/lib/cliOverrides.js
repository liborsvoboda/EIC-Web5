"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCacheCommand = clearCacheCommand;
exports.findRelatedTestFilesCommand = findRelatedTestFilesCommand;
exports.runDevServerCommand = runDevServerCommand;
var _compilationCache = require("playwright/lib/transform/compilationCache");
var _vitePlugin = require("./vitePlugin");
var _viteUtils = require("./viteUtils");
var _devServer = require("./devServer");
var _testServer = require("playwright/lib/runner/testServer");
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

async function clearCacheCommand(config) {
  const dirs = await (0, _viteUtils.resolveDirs)(config.configDir, config.config);
  if (dirs) await (0, _testServer.removeFolderAndLogToConsole)(dirs.outDir);
  await (0, _testServer.removeFolderAndLogToConsole)(_compilationCache.cacheDir);
}
async function findRelatedTestFilesCommand(files, config, suite) {
  await (0, _vitePlugin.buildBundle)(config.config, config.configDir, suite);
  return {
    testFiles: (0, _compilationCache.affectedTestFiles)(files)
  };
}
async function runDevServerCommand(config) {
  return await (0, _devServer.runDevServer)(config);
}