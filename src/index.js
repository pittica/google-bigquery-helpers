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

const { dataset, getDataset, cleanDataset } = require("./bigquery/dataset")
const {
  executeSqlFile,
  existsSqlFile,
  readSqlFile,
} = require("./bigquery/query")
const { table, getTables } = require("./bigquery/table")
const { jobDone } = require("./bigquery/job")
const { logErrors } = require("./bigquery/error")

exports.dataset = dataset
exports.getDataset = getDataset
exports.cleanDataset = cleanDataset
exports.table = table
exports.getTables = getTables
exports.executeSqlFile = executeSqlFile
exports.existsSqlFile = existsSqlFile
exports.readSqlFile = readSqlFile
exports.jobDone = jobDone
exports.logErrors = logErrors
