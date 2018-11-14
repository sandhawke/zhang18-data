
Here's what I did:

## Set up this Repo

1. Visit <https://github.com/new> (already logged into github)
1. Set license to be "MIT License" because CC-0 isn't an option
1. git close the new Repo
1. Open LICENSE in editor
1. Visit <https://choosealicense.com/licenses/cc0-1.0/>
1. Use the "Copy license text to cliboard button"
1. Replace the LICENSE text, commit, and push
1. Save this NOTES.md file into the repo as well, and make a README.md

## Get the source data

1. Make private-browsing window (optional)
1. Visit <https://credibilitycoalition.org/results/>
1. Follow "data" link to <https://data.world/credibilitycoalition/webconf-2018>
1. Observe data is licensed CC-0, last modified Apr 23 2018, version 2448ac00
1. Click on [Download] icon in upper right, nest to "Add to project"
1. Select "Download ZIP as Tabular Data Package"
1. Sign up for free data.world account (but not bother to confim account)
1. Dismiss popup, and select [Download] / ZIP again
1. Decline to Follow @credibilitycoalition
1. Find downloaded file and unzip it here
1. be confused about data/ vs original/
1. decide to use data/, and move it to this repo as downloaded/

## Write conversion script in NodeJS

1. use csv-parse in sync mode to read the data from each file
2. aim for putting it into a kgx.KB()
3. play around with the column structure and data types
4. ask one of authors to clarify the arrangements into different files

... and then things got complicated.  I guess see the source code.
