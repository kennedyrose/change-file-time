'use strict'
const fs = require('fs')
const removeDates = require('../index.js')
const testFile = './test/test-file'

const options = {
	verbose: true,
	atime: new Date(0),
	mtime: new Date(0),
	ctime: new Date(0)
}

function deleteFile(){
	return new Promise((resolve, reject) => {
		console.log('Deleting file...')
		fs.unlink(testFile, err => {
			resolve()
		})
	})
}
function createFile(){
	return new Promise((resolve, reject) => {
		console.log('Creating file...')
		fs.open(testFile, 'w', err => {
			if(err) reject(err)
			else resolve()
		})
	})
}
function changeDate(){
	return new Promise((resolve, reject) => {
		console.log('Changing time...')
		removeDates(testFile, options, err => {
			if(err) reject(err)
			else resolve()
		})
	})
}
function readTimes(){
	return new Promise((resolve, reject) => {
		console.log('Reading time...')
		fs.stat(testFile, (err, stat) => {
			if(err) reject(err)
			else{
				console.log('Stat:')
				console.log(`atime: ${stat.atime}`)
				console.log(`mtime: ${stat.mtime}`)
				console.log(`ctime: ${stat.ctime}`)
				console.log(`birthtime: ${stat.birthtime}`)
				resolve()
			}
		})
	})
}


deleteFile()
	.then(createFile)
	.then(changeDate)
	.then(readTimes)
	.then(deleteFile)
	.then(() => {
		console.log('Done!')
	})
	.catch(console.error)