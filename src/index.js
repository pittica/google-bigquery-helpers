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

const { dataset, getDataset, cleanDataset } = require("./dataset/dataset")
const { toString } = require("./dataset/schema")
const { table, getTables } = require("./dataset/table")
const {
  execute: executeSqlFile,
  exists,
  read,
  folder: executeSqlFolder,
} = require("./sql/file")
const { execute: executeSqlText } = require("./sql/text")
const { jobDone, jobMetadata } = require("./bigquery/job")
const { logErrors } = require("./bigquery/error")

exports.dataset = dataset
exports.getDataset = getDataset
exports.cleanDataset = cleanDataset
exports.table = table
exports.getTables = getTables
exports.executeSqlText = executeSqlText
exports.executeSqlFile = executeSqlFile
exports.executeSqlFolder = executeSqlFolder
exports.existsSqlFile = exists
exports.readSqlFile = read
exports.jobDone = jobDone
exports.jobMetadata = jobMetadata
exports.logErrors = logErrors
exports.schema = {
  toString,
}
