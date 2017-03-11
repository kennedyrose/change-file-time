#!/usr/bin/env node
const changeFileTime = require('./index')
const meow = require('meow')
const cli = meow(`
	Usage
	  $ cft <options>

	Options
	  -f, --files     Glob pattern for files, defaults to **/*
	  -a, --atime     Timestamp for atime, defaults to time of execution
	  -m, --mtime     Timestamp for mtime, defaults to time of execution
	  -c, --ctime     Timestamp for ctime, defaults to time of execution
	  -r, --recreate  Recreate files
	  --verbose       Output debug information
`, {
	alias: {
		f: 'files',
		a: 'atime',
		m: 'mtime',
		c: 'ctime',
		v: 'version'
	}
})
changeFileTime(null, cli.flags)