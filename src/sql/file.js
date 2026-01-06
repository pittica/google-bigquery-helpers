// Copyright 2024-2026 Pittica S.r.l.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require("fs")
const path = require("path")
const { execute: executeText } = require("./text")

/**
 * Executes the SQL script related to the given name.
 *
 * @param {string} filepath Path of the SQL file.
 * @param {BigQuery} client BigQuery client.
 * @param {object} params Execution parameters.
 * @returns {boolean} A value indicating whether the SQL script has been executed.
 */
exports.execute = async (filepath, client, params = {}) =>
  executeText(exports.read(filepath), client, params)

/**
 * Determines whether the given SQL script file exists.
 *
 * @param {string} filepath Path of the SQL file.
 * @returns {boolean} A value indicating whether the given SQL script file exists.
 */
exports.exists = (filepath) => exports.read(filepath) !== null

/**
 * Reads the file data.
 *
 * @param {string} filepath Path of the SQL file.
 * @param {string} encoding Encoding.
 * @returns {string} SQL file data.
 */
exports.read = (filepath, encoding = "utf8") => {
  if (fs.existsSync(filepath)) {
    const file = require.resolve(filepath)

    return fs.readFileSync(file, encoding)
  }

  return null
}

/**
 * Executes the file in the folder matched with the given files.
 *
 * @param {string} base Base path.
 * @param {Array} files File names.
 * @param {object} params Execution parameters.
 * @returns {boolean} A value indicating whether the SQL script has been executed.
 */
exports.folder = async (base, files = [], params = {}) => {
  const contents = new Set(fs.readdirSync(base))
  const allowed = files.filter((item) => contents.has(item))
  const sql = allowed
    .map((file) => fs.readFileSync(path.join(base, file)))
    .join("\n")

  return executeText(sql, client, params)
}
