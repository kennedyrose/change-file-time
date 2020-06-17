#!/usr/bin/env node
'use strict'
const fs = require('fs-extra')
const spawn = require('child_process').spawn
const glob = require('glob-all')

module.exports = (matchers, options, cb) => {

	// Process arguments
	if(typeof matchers === 'string'){
		matchers = [ matchers ]
	}
	else if(options.files) matchers = options.files
	else if(!matchers) matchers = [ '**/*' ]
	if(typeof options === 'function'){
		cb = options
		options = {}
	}
	else if(!options) options = {}

	// Default options
	options = Object.assign({
		atime: new Date(),
		mtime: new Date(),
		ctime: new Date()
	}, options)
	if(options.atime !== 'object') options.atime = new Date(options.atime)
	if(options.mtime !== 'object') options.mtime = new Date(options.mtime)
	if(options.ctime !== 'object') options.ctime = new Date(options.ctime)
	const log = options.verbose ? console.log : function(){}

	log(`Getting files:`)
	log(matchers)

	const operation = options.recreate ? recreateFiles : changeDates

	getFiles({
			options: options,
			matchers: matchers,
			log: log
		})
		.then(operation)
		.then(() => {
			if(cb) cb()
		})
		.catch(err => {
			if(cb) cb(err)
		})
}


function getFiles(obj){
	obj.log('Getting dates...')
	return new Promise((resolve, reject) => {
		glob(obj.matchers, { realpath: true }, (err, files) => {
			if(err) reject(err)
			else{
				obj.log('Found files:')
				obj.log(files)
				obj.files = files
				resolve(obj)
			}
		})
	})
}
function changeDates(obj){
	obj.log('Changing dates...')
	return new Promise((resolve, reject) => {
		const promises = []
		for(let i = obj.files.length; i--;){
			promises.push(new Promise((resolve, reject) => {
				fs.utimes(obj.files[i], obj.options.atime, obj.options.mtime, resolve)
			}))
		}
		Promise.all(promises)
			.then(() => {
				obj.log('Done!')
				resolve(obj)
			})
			.catch(reject)
	})
}
function recreateFiles(obj){
	obj.log('Recreating files...')
	return new Promise((resolve, reject) => {
		const promises = []
		for(let i = obj.files.length; i--;){
			promises.push(new Promise((resolve, reject) => {
				console.log(obj.files[i])
				fs.readFile(obj.files[i], (err, res) => {
					if(err){
						//obj.log(`Can't read file: ${obj.files[i]}`)
						resolve()
					}
					else{
						obj.log(`Read file: ${obj.files[i]}`)
						fs.unlink(obj.files[i], err => {
							if(err) resolve()
							else{
								fs.outputFile(obj.files[i], res, err => {
									if(err){
										obj.log(err)
										resolve()
									}
									else{
										obj.log(`Output file: ${obj.files[i]}`)
										resolve()
									}
								})
							}
						})
					}
				})
			}))
		}
	})
}
