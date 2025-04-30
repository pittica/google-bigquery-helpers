// Copyright 2024-2025 Pittica S.r.l.
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
const log = require("@pittica/logger-helpers")
const { getTables } = require("./table")

/**
 * Gets or create a dataset.
 *
 * @param {BigQuery} client BigQuery client.
 * @param {string} name ID or name.
 * @param {object} options Creation options.
 * @returns {Dataset} The dataset with the given name.
 */
exports.dataset = async (client, name, options = {}) => {
  const dataset = client.dataset(name)
  const [status] = await dataset.exists()

  if (!status) {
    return await dataset.create({
      ...{ location: "us-central1" },
      ...options,
    })
  } else {
    return await dataset.get()
  }
}

/**
 * Gets the dataset.
 *
 * @param {string|Dataset} dataset Dataset ID or instance.
 * @param {object} options Creation options.
 * @returns {Dataset} Dataset object.
 */
exports.getDataset = async (dataset, options = {}) => {
  if (typeof dataset === "string") {
    const bigquery = new BigQuery()

    const [ds] = await this.dataset(bigquery, dataset, options)

    return ds
  } else {
    return dataset
  }
}

/**
 * Drops the tables in temporary dataset.
 *
 * @param {string} regex Regular expression what matches table ID.
 */
exports.cleanDataset = async (regex = ".*") => {
  const tables = await getTables()
  const r = new RegExp(regex)

  tables.forEach((table) => {
    if (r.test(table.id)) {
      table.delete().then(() => log.success(`${table.id} deleted.`))
    }
  })
}
