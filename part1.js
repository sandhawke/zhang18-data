const parse = require('csv-parse/lib/sync')
const fs = require('fs').promises
const moment = require('moment')
const path = require('path')

const part1files = []

for (let filename of [
  'downloaded/credco_webconf_study_1_study_1_project_1_2018_02_21t22_43_18_00_00_anon_nolink.csv',
  'downloaded/credco_webconf_study_2_study_2_project_1_2018_02_21t22_44_07_00_00_anon_nolink.csv',
  'downloaded/credco_webconf_study_3_study_3_project_1_2018_02_21t22_44_40_00_00_anon_nolink.csv'
]) {
  part1files.push(path.resolve(__dirname, filename))
}

const nodes = {}
let obsCount = 0
let my

(async () => {
  let records = []
  for (const filename of part1files) {
    records = records.concat(await readCSV(filename))
  }
  // write out the basic JSON, for to help me understand it
  await fs.writeFile('./out-records.json', JSON.stringify(records, null, 2))
})()

async function readCSV(filename, cb) {
  const text = await fs.readFile(filename)
  const records = parse(text, {
    columns: true,
    cast: function (value, context) {
      if (context.column.match && context.column.match(/.*date.*/)) {
        if (value === '') return null
        return moment.parseZone(value, 'YYYY-MM-DD HH-mm-ss Z')
      } else {
        return value
      }
    }
  })
  return records
}

