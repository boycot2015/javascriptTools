
let fpath = './tools'
const repPath = './config'
const outputFile = './README.md'

let g = require('./tools/fsReaderMd.js')

new g(repPath, outputFile, fpath).run()
