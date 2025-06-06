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

/**
 * Gets or create a table.
 *
 * @param {object} dataset BigQuery dataset.
 * @param {string} name ID or name.
 * @param {object} options Creation options.
 * @param {object} keys Keys options. Object can contains primary and foreign.
 * @returns The table with the given name.
 */
exports.table = async (dataset, name, options, keys) => {
  const table = dataset.table(name)
  const [status] = await table.exists()

  if (!status) {
    const result = await table.create(options)

    if (keys) {
      if (typeof keys.primary !== "undefined") {
        let pk = ""
        if (Array.isArray(keys.primary)) {
          pk = keys.primary.join(", ")
        } else {
          pk = keys.primary
        }

        const [job] = await dataset.bigQuery.createQueryJob({
          query: `ALTER TABLE \`${dataset.id}.${name}\` ADD PRIMARY KEY (${pk}) NOT ENFORCED;`,
        })

        job.on("complete", async () => {
          if (typeof keys.foreign !== "undefined") {
            let fks = []

            if (!Array.isArray(keys.foreign)) {
              fks = [keys.foreign]
            } else {
              fks = keys.foreign
            }

            for (index in fks) {
              let fk = ""
              if (Array.isArray(fks[index].key)) {
                fk = fks[index].key.join(", ")
              } else {
                fk = fks[index].key
              }

              const [fkJob] = await dataset.bigQuery.createQueryJob({
                query: `ALTER TABLE \`${dataset.id}.${name}\` ADD CONSTRAINT ${fks[index].name} FOREIGN KEY (${fk}) REFERENCES ${dataset.id}.${fks[index].table}(${fks[index].reference || pk}) NOT ENFORCED;`,
              })

              await fkJob.getQueryResults()
            }
          }
        })
      }
    }

    return result
  } else {
    return await table.get()
  }
}

/**
 * Gets all tables the dataset.
 *
 * @param {string} id Dataset name.
 * @returns {Array} Dataset object.
 */
exports.getTables = async (id) => {
  const bigquery = new BigQuery()

  const [tables] = await bigquery.dataset(id).getTables()

  return tables
}
