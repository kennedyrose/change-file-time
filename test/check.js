'use strict'
const fs = require('fs')


fs.stat('./index.js', (err, stat) => {
	if(err) console.error(err)
	else{
		console.log('Stat:')
		console.log(`atime: ${stat.atime}`)
		console.log(`mtime: ${stat.mtime}`)
		console.log(`ctime: ${stat.ctime}`)
		console.log(`birthtime: ${stat.birthtime}`)
	}
})
