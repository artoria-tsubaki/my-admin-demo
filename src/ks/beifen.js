function fixRelativePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const $ = cheerio.load(content)

  // 获取所有的 &lt;link&gt; 和 &lt;script&gt; 元素
  const links = $('link')
  const scripts = $('script')
  const elements = [...links, ...scripts]

  // 遍历所有元素，将其相对路径改成绝对路径
  for (const element of elements) {
    const href = $(element).attr('href')
    const src = $(element).attr('src')
    if (href) {
      $(element).attr('href', fixPath(href, filePath))
    }
    if (src) {
      $(element).attr('src', fixPath(src, filePath))
    }
  }

  // 将修改后的内容写回到文件中
  fs.writeFileSync(filePath, $.html(), 'utf-8')
}

// 这段代码的作用是将相对路径转换为绝对路径
function fixPath(relativePath, baseFilePath) {
  const absolutePath = path.resolve(path.dirname(baseFilePath), relativePath)
  const newPath = absolutePath.replace(/E:\\workspace\\inwlms_yc\\inwlms_jsyc_web\\lk_sys_yanCheng\\src/, 'https://aquawlm.gdhwater.com:9001/yclk/sys')
  console.log(newPath)
  return newPath
  // return path.relative(path.dirname(baseFilePath), absolutePath)
}

gulp.task('constants', function () {
  //读入config.json文件
  var myConfig = require('./config.json')
  //取出对应的配置信息
  console.log(options)
  var envConfig = myConfig[options.env]
  var conConfig = 'var appconfig = ' + JSON.stringify(envConfig)
  //生成config.js文件
  return string_src('config.js', conConfig).pipe(gulp.dest('./src/js'))
})

gulp.task('relativeToAbsolute', function (done) {
  gulp.src('origin/**/*.html', { sourcemaps: true }).pipe(
    gulp.dest((file) => {
      fixRelativePaths(path.resolve(file.path))
      return file
    })
  )
})

gulp.task('templates', function (done) {
  var cnList = require('./cnList.json')
  // console.log(cnList)
  console.log('templates task run...')
  gulp
    .src(['./src/**/*.html'])
    .pipe(
      replace(/(<[a-zA-z]+.*?)(\sstringkey|\sstringKey)=['"]([^'"]+)['"](.*?>)([\s\S]*?)(<\/[a-zA-Z]+>)/g, function (match, p1, p2, p3, p4, p5, p6, offset, string) {
        // console.log(`match:${match}; p1:${p1},p2:${p2}, p3: ${p3}, p4: ${p4}`)
        // p2 为 stringkey 可能带有 { : }
        if (p3.match(/\W?/g)) {
          let addl = p3.match(/\W?/g).reduce((prev, next) => {
            if (next.trim() !== '') {
              prev += next
            }
            return prev
          }, '')
          let mark = addl.replace('{', '').replace('}', '') || ''
          let body = p3.replace(/\W?/g, '')
          let cnWord = cnList[body]
          return `${p1}${p4}${cnWord}${mark}${p6}`
        } else {
          return `${p1}${p4}${cnWord}${p6}`
        }
      })
    )
    .pipe(gulp.dest('build/'))
  done()
})

gulp.task('jstemp', function (done) {
  var cnList = require('./cnList.json')
  console.log('js templates task run...')
  // 一次只能执行一个 replace 函数
  gulp
    .src(['./src/views/basicData/totalSubTableSetting/householdForm/index.js'])
    .pipe(
      // * 替换掉所有的表头配置项stringKey
      // replace(/(,\s+?)?(stringKey:\s?['"])\w+(['"](,?))/gi, function () {
      //   return ''
      // })
      // * 替换掉js插入的html中的stringKey
      replace(/(<[a-zA-z]+.*?)(\sstringkey|\sstringKey)=['"]([^'"]+)['"](.*?>)([\s\S]*?)(<\/[a-zA-Z]+>)/g, function (match, p1, p2, p3, p4, p5, p6, offset, string) {
        // console.log(`match:${match}; p1:${p1},p2:${p2}, p3: ${p3}, p4: ${p4}`)
        // p2 为 stringkey 可能带有 { : }
        if (p3.match(/\W?/g)) {
          let addl = p3.match(/\W?/g).reduce((prev, next) => {
            if (next.trim() !== '') {
              prev += next
            }
            return prev
          }, '')
          let mark = addl.replace('{', '').replace('}', '') || ''
          let body = p3.replace(/\W?/g, '')
          let cnWord = cnList[body]
          return `${p1}${p4}${cnWord}${mark}${p6}`
        } else {
          return `${p1}${p4}${cnWord}${p6}`
        }
      })
    )
    .pipe(gulp.dest('build/'))
  done()
})

gulp.task('minify-html', function () {
  return (
    gulp
      .src('src/**/*.html')
      // .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        rename(function (path) {
          path.dirname = path.dirname.replace('src', 'dist')
        })
      )
      .pipe(gulp.dest('./origin'))
  )
})

gulp.task('run', series('minify-html', parallel('relativeToAbsolute')))
function fixRelativePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const $ = cheerio.load(content)

  // 获取所有的 &lt;link&gt; 和 &lt;script&gt; 元素
  const links = $('link')
  const scripts = $('script')
  const elements = [...links, ...scripts]

  // 遍历所有元素，将其相对路径改成绝对路径
  for (const element of elements) {
    const href = $(element).attr('href')
    const src = $(element).attr('src')
    if (href) {
      $(element).attr('href', fixPath(href, filePath))
    }
    if (src) {
      $(element).attr('src', fixPath(src, filePath))
    }
  }

  // 将修改后的内容写回到文件中
  fs.writeFileSync(filePath, $.html(), 'utf-8')
}

// 这段代码的作用是将相对路径转换为绝对路径
function fixPath(relativePath, baseFilePath) {
  const absolutePath = path.resolve(path.dirname(baseFilePath), relativePath)
  const newPath = absolutePath.replace(/E:\\workspace\\inwlms_yc\\inwlms_jsyc_web\\lk_sys_yanCheng\\src/, 'https://aquawlm.gdhwater.com:9001/yclk/sys')
  console.log(newPath)
  return newPath
  // return path.relative(path.dirname(baseFilePath), absolutePath)
}

gulp.task('constants', function () {
  //读入config.json文件
  var myConfig = require('./config.json')
  //取出对应的配置信息
  console.log(options)
  var envConfig = myConfig[options.env]
  var conConfig = 'var appconfig = ' + JSON.stringify(envConfig)
  //生成config.js文件
  return string_src('config.js', conConfig).pipe(gulp.dest('./src/js'))
})

gulp.task('relativeToAbsolute', function (done) {
  gulp.src('origin/**/*.html', { sourcemaps: true }).pipe(
    gulp.dest((file) => {
      fixRelativePaths(path.resolve(file.path))
      return file
    })
  )
})

gulp.task('templates', function (done) {
  var cnList = require('./cnList.json')
  // console.log(cnList)
  console.log('templates task run...')
  gulp
    .src(['./src/**/*.html'])
    .pipe(
      replace(/(<[a-zA-z]+.*?)(\sstringkey|\sstringKey)=['"]([^'"]+)['"](.*?>)([\s\S]*?)(<\/[a-zA-Z]+>)/g, function (match, p1, p2, p3, p4, p5, p6, offset, string) {
        // console.log(`match:${match}; p1:${p1},p2:${p2}, p3: ${p3}, p4: ${p4}`)
        // p2 为 stringkey 可能带有 { : }
        if (p3.match(/\W?/g)) {
          let addl = p3.match(/\W?/g).reduce((prev, next) => {
            if (next.trim() !== '') {
              prev += next
            }
            return prev
          }, '')
          let mark = addl.replace('{', '').replace('}', '') || ''
          let body = p3.replace(/\W?/g, '')
          let cnWord = cnList[body]
          return `${p1}${p4}${cnWord}${mark}${p6}`
        } else {
          return `${p1}${p4}${cnWord}${p6}`
        }
      })
    )
    .pipe(gulp.dest('build/'))
  done()
})

gulp.task('jstemp', function (done) {
  var cnList = require('./cnList.json')
  console.log('js templates task run...')
  // 一次只能执行一个 replace 函数
  gulp
    .src(['./src/views/basicData/totalSubTableSetting/householdForm/index.js'])
    .pipe(
      // * 替换掉所有的表头配置项stringKey
      // replace(/(,\s+?)?(stringKey:\s?['"])\w+(['"](,?))/gi, function () {
      //   return ''
      // })
      // * 替换掉js插入的html中的stringKey
      replace(/(<[a-zA-z]+.*?)(\sstringkey|\sstringKey)=['"]([^'"]+)['"](.*?>)([\s\S]*?)(<\/[a-zA-Z]+>)/g, function (match, p1, p2, p3, p4, p5, p6, offset, string) {
        // console.log(`match:${match}; p1:${p1},p2:${p2}, p3: ${p3}, p4: ${p4}`)
        // p2 为 stringkey 可能带有 { : }
        if (p3.match(/\W?/g)) {
          let addl = p3.match(/\W?/g).reduce((prev, next) => {
            if (next.trim() !== '') {
              prev += next
            }
            return prev
          }, '')
          let mark = addl.replace('{', '').replace('}', '') || ''
          let body = p3.replace(/\W?/g, '')
          let cnWord = cnList[body]
          return `${p1}${p4}${cnWord}${mark}${p6}`
        } else {
          return `${p1}${p4}${cnWord}${p6}`
        }
      })
    )
    .pipe(gulp.dest('build/'))
  done()
})

gulp.task('minify-html', function () {
  return (
    gulp
      .src('src/**/*.html')
      // .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        rename(function (path) {
          path.dirname = path.dirname.replace('src', 'dist')
        })
      )
      .pipe(gulp.dest('./origin'))
  )
})

gulp.task('run', series('minify-html', parallel('relativeToAbsolute')))

var replace = require('gulp-replace')
replace(/(,\s+?)?(stringKey:\s?['"])([^'"]+)['"]([,\s]?)(}?)/gi, function (match, p1, p2, p3, p4, p5) {
  return p5 ? '' : ','
})
