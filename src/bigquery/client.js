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

/**
 * Gets a BigQuery client instance.
 *
 * @param {object} options The BigQuery client options.
 * @returns {BigQuery} A BigQuery client instance.
 */
exports.getClient = (options = {}) => {
  const projectId =
    options.projectId ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCP_PROJECT

  return new BigQuery({
    ...options,
    ...(projectId && { projectId }),
  })
}
