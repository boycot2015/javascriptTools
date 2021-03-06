
let fs = require('fs') //读写文件就需要引入fs--文件系统模块
let path = require('path')
let { sep } = path
class generateDir {
    constructor(repPath, outputFile, path) {
        this.repPath = repPath
        this.outputFile = outputFile
        this.path = path
    }
    run () {
        this.unLinkOutput(this.outputFile)
        this.readDir(this.path)
    }
    readDir (path) {
        let exists = fs.existsSync(path), //以同步的方法检测目录是否存在
            stat = fs.statSync(path) //文件信息

        if (exists && stat) {
            //如果目录存在
            if (stat.isFile()) {
                //如果是文件
                let fpath = path.split(sep) //以路径分割符将路径分割成数组
                // 获取文件名
                let fileName = fpath[fpath.length - 1]
                // 文件更新时间
                let updateTime = this.formatDate(stat.mtime)
                // 将内容追加到README.md
                let fileNameWithoutSuffix = fileName.replace(/(.*)\.md/, '$1')
                // 文件输出内容
                let content =
                    // 文件名
                    `* [${fileNameWithoutSuffix}]` +
                    // URL
                    `(${this.repPath}/${fpath.join('/')})   ` +
                    // 更新时间
                    `更新于${updateTime}` +
                    // 空行
                    `\r\n \r\n`
                fs.appendFileSync(this.outputFile, content)
            } else if (stat.isDirectory()) {
                //如果是文件夹
                let fpath = path.split(sep) //以路径分割符将路径分割成数组
                // 获取文件名
                let fileName = fpath[fpath.length - 1]
                let files = fs.readdirSync(path) //返回 指定目录下所有文件名称
                // 过滤掉只有n下属文件夹和空n文件夹
                let normalContent = `**${fileName}**`
                let nContent = '   \r\n \r\n**撰写中**'
                let totalContent = `${fileName === 'n' ? nContent : normalContent
                    } \r\n \r\n`

                if (files.length !== 1 && files.length !== 0) {
                    // n 文件夹名替换成撰写中
                    fs.appendFileSync(this.outputFile, totalContent)
                    // 遍历文件夹下属文件
                    if (files && files.length > 0) {
                        // 确保n文件夹的下属文件在第一级文件夹后面输出
                        let nIndex = files.findIndex(f => f === 'n')
                        ~nIndex && (files.splice(nIndex, 1), files.push('n'))
                        // 对每个文件进行递归操作
                        files.forEach(file => {
                            this.readDir(path + sep + file)
                        })
                    }
                }
            }
        } else {
            console.info('根目录不存在.')
        }
    }
    formatDate (date) {
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    }
    unLinkOutput (outputFile) {
        let unlinkPath = `${path.resolve('.')}/${outputFile}`
        if (fs.existsSync(unlinkPath)) {
            fs.unlinkSync(unlinkPath)
        }
    }
}

module.exports = generateDir