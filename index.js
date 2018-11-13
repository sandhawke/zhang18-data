const parse = require('csv-parse/lib/sync')
const fs = require('fs').promises
const moment = require('moment')
const kgx = require('kgx')
const setdefault = require('setdefault')

const part1files = [
  'downloaded/credco_webconf_study_1_study_1_project_1_2018_02_21t22_43_18_00_00_anon_nolink.csv',
  'downloaded/credco_webconf_study_2_study_2_project_1_2018_02_21t22_44_07_00_00_anon_nolink.csv',
  'downloaded/credco_webconf_study_3_study_3_project_1_2018_02_21t22_44_40_00_00_anon_nolink.csv'
];

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

  const kb = kgx.createKB()
  kb.base = 'https://base-placeholder.example/'
  my = kb.ns('', kb.base)
  for (const r of records) {
    describe(r, kb)
  }
  await kb.writeToFile('./out.trig')
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


/*
function userNode (key, kb) {
  let result = memo[key]
  if (!result) {
    // make up URI for this user, 
    memo[key] = result
  }
  return result
}
*/

const ansType = []

ansType[1] = credlevel

function credlevel (kb, text) {
  const options = {}
  const val = ["Very low credibility", "Somewhat low credibility", "Medium credibility", "Somewhat high credibility", "Very high credibility"].indexOf(text)
  if (val === -1) throw Error `bad value ${text} for credibility rating`
  options[kb.ns.rdf.value] = val/4
  return kb.defined(`The response "${text}", when the possible responses are "Very high credibility", "Somewhat high credibility", "Medium credibility", "Somewhat low credibility", and "Very low credibility".`, {label: text, value: val/4})
}

function describe(r, kb) {

  // the same subject occurs muliple times; hopefully these fields
  // will be the same or things will get a bit weird.
  const subject = kb.named(r.media_url)
  kb.add(subject, kb.ns.dct.title, r.report_title)
  kb.add(subject, kb.ns.dct.abstract, r.media_content)
  if (r.time_original_media_publishing) {
    kb.add(subject, kb.ns.dct.date, new Date(r.time_original_media_publishing))
  }
  // hm, turns out moment can't handle this format
  // kb.add(subject, kb.ns.dct.date, moment.parseZone(r.time_original_media_publishing))
  // and this is the date of the REPORT, whatever that means
  // kb.add(subject, kb.ns.dct.date, moment.parseZone(r.report_date).format())
  
  for (let t = 1; t <= 25; t++) {
    const uid = r[`task_user_${t}`]
    const question = r[`task_question_${t}`]
    const answer = r[`task_answer_${t}`]

    if (uid && question && answer) {
      const observer = setdefault.lazy(nodes, uid, () => {
        console.log('need new id for user', uid)
        // add description
        return my[uid]
      })
      const property = setdefault.lazy(nodes, question, () => {
        // add description
        // use cnamify
        return kb.defined(question)
      })

      let handler = ansType[t]
      let value = answer
      if (handler) {
        value = handler(kb, answer)
      } else {
        break //   FOR NOW, 25 more to go!!
      }
      console.log(t, value)

      
      const observation = my['n' + obsCount++]
      // const observation = kb.blank() // kb.ns.obs['n' + obsCount++] // obsns['n' + obsCount++]

      kb.add(subject, property, value, observation)
      kb.add(observation, kb.ns.cred.observer, observer)
    }
  }
}


