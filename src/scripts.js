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

const { BigQuery } = require("@google-cloud/bigquery")
const { getTables } = require("./dataset/table")

/**
 * Gets the datasets in the current or given project.
 *
 * @param {string} projectId Optional project ID.
 * @returns {Array} A list of dataset names.
 */
exports.listDatasets = async (projectId) => {
  const bigquery = new BigQuery({
    projectId,
  })
  const [datasets] = await bigquery.getDatasets()

  return datasets.map(({ id }) => id)
}

/**
 * Gets all tables the dataset.
 *
 * @param {string} id Dataset name.
 * @returns {Array} Dataset object.
 */
exports.listTables = async (id) => {
  const tables = await getTables(id)

  return tables.map(({ id }) => id)
}
