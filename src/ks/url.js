/**
 * 1. DNS解析
 * 2. TCP连接(HTTPS SSL/TLS握手协议)
 * 3. HTTP请求
 * 4. 服务端响应请求
 * 5. HTTP 响应
 * 6. 渲染页面
 * 7. 页面加载完成
 */


const gulp = require('gulp');
const path = require('path');

gulp.task('example', function() {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest(function(file) {
      console.log(path.resolve(file.path));
      return 'dist';
    }));
});


const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function fixRelativePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content);

  // 获取所有的 &lt;link&gt; 和 &lt;script&gt; 元素
  const links = $('link');
  const scripts = $('script');
  const elements = [...links, ...scripts];

  // 遍历所有元素，将其相对路径改成绝对路径
  for (const element of elements) {
    const href = $(element).attr('href');
    const src = $(element).attr('src');
    if (href) {
      $(element).attr('href', fixPath(href, filePath));
    }
    if (src) {
      $(element).attr('src', fixPath(src, filePath));
    }
  }

  // 将修改后的内容写回到文件中
  fs.writeFileSync(filePath, $.html(), 'utf-8');
}

// 这段代码的作用是将相对路径转换为绝对路径
function fixPath(relativePath, baseFilePath) {
  const absolutePath = path.resolve(path.dirname(baseFilePath), relativePath);
  return path.relative(path.dirname(baseFilePath), absolutePath);
}


const oldPath = 'E:\\workspace\\inwlms_yc\\inwlms_jsyc_web\\lk_sys_yanCheng\\src\\views\\lossAnalysis\\leakageThematicMap\\layui\\css\\layui.css';
const newPath = oldPath.replace(/E:\\workspace\\inwlms_yc\\inwlms_jsyc_web\\lk_sys_yanCheng\\src/, 'https://aquawlm.gdhwater.com:9001/yclk/sys/src');
console.log(newPath);

gulp.task('readHtml', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(function(file) {
      console.log(path.resolve(file.path));
      return 'dist';
    }));
});


gulp.task('readHtml', function() {
  return gulp.src('src/**/*.html')
    .pipe(async function(file) {
      // 执行异步操作
      await fixRelativePaths(file.path);
      return file;
    })
    .pipe(gulp.dest('dist'));
});


gulp.task('relativeToAbsolute', function (done) {
  gulp
    .src(paths.html.src, { sourcemaps: true })
    // .pipe(replace(/(\d+)(px)/ig, function (match, p1, p2, offset, string) {
    //   return toFixed( p1 / 1920 * 100, 5 ) + 'vw'
    // })
    // .pipe(concat('main.min.js'))
    // .pipe(gulp.dest(paths.html.dest))
    .pipe(async function (file) {
      // console.log(path.resolve(file.path))
      await fixRelativePaths(path.resolve(file.path))
      return file
    })
    .pipe(gulp.dest(paths.html.dest))
  done()
})

// qiankun和micro-app的优缺点
// qiankun的优点：
// 1. 支持多种框架，如React、Vue、Angular等
// 2. 支持多种应用间通信方式，如props、emit、broadcast等
// 3. 支持应用间的资源隔离，避免冲突
// 4. 支持应用间的样式隔离，避免样式冲突
// 5. 支持应用间的路由隔离，避免路由冲突
// 6. 支持应用间的状态隔离，避免状态冲突
// 7. 支持应用间的生命周期隔离，避免生命周期冲突
// 8. 支持应用间的动态加载和卸载，提高应用的灵活性和可维护性

// qiankun的缺点：
// 1. 集成成本较高，需要对应用进行改造
// 2. 学习成本较高，需要掌握一定的微前端知识
// 3. 需要对应用进行拆分，增加了开发和维护的难度

// micro-app的优点：
// 1. 集成成本较低，对应用无侵入性
// 2. 学习成本较低，只需要掌握少量的微前端知识
// 3. 支持多种框架，如React、Vue、Angular等
// 4. 支持多种应用间通信方式，如props、emit、broadcast等
// 5. 支持应用间的资源隔离，避免冲突
// 6. 支持应用间的样式隔离，避免样式冲突
// micro-app的缺点：
// 1. 不支持应用间的路由隔离，容易出现路由冲突
// 2. 不支持应用间的状态隔离，容易出现状态冲突
// 3. 不支持应用间的生命周期隔离，容易出现生命周期冲突
// 4. 不支持应用间的动态加载和卸载，降低了应用的灵活性和可维护性

// 需要安装gulp4.0以上版本才能支持async函数
const { series, parallel } = require('gulp');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function fixRelativePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content);

  // 获取所有的 &lt;link&gt; 和 &lt;script&gt; 元素
  const links = $('link');
  const scripts = $('script');
  const elements = [...links, ...scripts];

  // 遍历所有元素，将其相对路径改成绝对路径
  for (const element of elements) {
    const href = $(element).attr('href');
    const src = $(element).attr('src');
    if (href) {
      $(element).attr('href', fixPath(href, filePath));
    }
    if (src) {
      $(element).attr('src', fixPath(src, filePath));
    }
  }

  // 将修改后的内容写回到文件中
  fs.writeFileSync(filePath, $.html(), 'utf-8');
}

// 这段代码的作用是将相对路径转换为绝对路径
function fixPath(relativePath, baseFilePath) {
  const absolutePath = path.resolve(path.dirname(baseFilePath), relativePath);
  return path.relative(path.dirname(baseFilePath), absolutePath);
}

function asyncFixRelativePaths() {
  return new Promise((resolve, reject) => {
    gulp.src('src/**/*.html')
      .pipe(async function(file) {
        // 执行异步操作
        await fixRelativePaths(file.path);
        return file;
      })
      .pipe(gulp.dest('dist'))
      .on('end', resolve)
      .on('error', reject);
  });
}

exports.default = asyncFixRelativePaths;


gulp.task('minify-html', function () {
  return (
    gulp
      .src('origin/**/*.html')
      // .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        rename(function (path) {
          path.dirname = path.dirname.replace('src', 'dist')
        })
      )
      .pipe(gulp.task('asyncTask', async (file) => {
        await fixRelativePaths(path.resolve(file.path))
        return './origin'
      }))
  )
})

const regex = /(?:src|href)="([^"]+)"/g;
const links = [];
let match;
while ((match = regex.exec(content)) !== null) {
  links.push(match[1]);
}
console.log(links);

console.log(path.resolve(file.path));
