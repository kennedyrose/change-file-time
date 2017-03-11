# change-file-time

A CLI application and Node module to change file timestamps.

## Installation

Node Module:

```
$ npm install change-file-time
```

Cli:

```
$ npm install -g change-file-time
```

## Node Usage

Changing a group of files to the current date/time:

```
const changeTime = require('change-file-time')

changeTime('/path/**/*.html', function(err){
	if(err) console.error(err)
	else console.log('Done!')
})
```

You can also supply options to supply different dates:

```
changeTime('/path/**/*.html', {
	atime: new Date(1995, 11, 17),
	ctime: new Date('1995-12-17T03:24:00'),
	mtime: new Date('December 17, 1995 03:24:00')
}, function(err){
	if(err) console.error(err)
	else console.log('Done!')
})
```

## CLI

	Usage
	  $ cft <options>

	Options
	  -f, --files     Glob pattern for files, defaults to **/*
	  -a, --atime     Timestamp for atime, defaults to time of execution
	  -m, --mtime     Timestamp for mtime, defaults to time of execution
	  -c, --ctime     Timestamp for ctime, defaults to time of execution
	  -r, --recreate  Recreate files
	  --verbose       Output debug information