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

const log = require("@pittica/logger-helpers")

/**
 * Handles catch statement and logs errore.
 *
 * @param {object} error Error object.
 * @returns {boolean} Always returns "False".
 */
exports.logErrors = ({ code, errors }) => {
  if (errors) {
    errors.map(({ message, reason }) => log.error([code || reason, message]))
  }

  return false
}
