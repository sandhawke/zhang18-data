# zhang18-data

RDF Version of Zhang18 data

Starting with announcement of this study: <https://credibilitycoalition.org/results/>

I wrote some code to convert the data into a format I think might be better.

More details on what I did in [NOTES.md]().


I guess importing this package should give you various in-mem views of
the data.  Something like this:

```js
const zd = require('zhang18-data')

console.log(zd.json25) // the 25-column style, in json

zd.writeToFile('alldata.trig')
```

