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

const { logErrors } = require("../bigquery/error")

/**
 * Executes the SQL script from the given text.
 *
 * @param {object} query SQL query text.
 * @param {BigQuery} client BigQuery client.
 * @param {object} params Execution parameters.
 * @returns {boolean} A value indicating whether the SQL script has been executed.
 */
exports.execute = async (query, client, params = {}) => {
  if (query) {
    const [job] = await client.createQueryJob({
      query,
      params,
    })

    const results = await job.getQueryResults().catch(logErrors)

    if (results) {
      let done = false

      results.forEach(({ jobComplete }) => {
        if (typeof jobComplete !== "undefined" && jobComplete === true) {
          done = true
        }
      })

      return done
    }
  }

  return false
}
