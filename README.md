# zhang18-data

RDF Version of Zhang18 data

Starting with announcement of this study: <https://credibilitycoalition.org/results/>

I wrote some code to convert the data into a format I think might be better.

More details on what I did in [NOTES.md]().

* out.trig is the RDF output
* all-records.json is an intermediate form
* part1.js produces that intermediate form
* the library itself gives you a kgx kb object (which is an n3.store),
  if you prefer:

```js
const zd = require('zhang18-data')

console.log(zd.kb.countQuads())
```

