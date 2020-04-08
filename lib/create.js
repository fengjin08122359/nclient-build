const {copy} = require('./creator')
const path = require('path');
const fs = require('fs')
const store = require('./store');
require('shelljs/global');
const {
  lowerCamelCase,
  upperCamelCase
} = require('./utils/camel')
//初始化
//将template中的文件加载到当前工程下

function createWorkspace() {
  const lower = lowerCamelCase(store.workspace.name)
  const upper = upperCamelCase(store.workspace.name)
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/workspace');
  // 目标路径
  const dest = path.resolve(store.cwd, lower);

  copy(src, dest)
  .then(() => {
    let packageJson = path.resolve(dest, 'package.json');
    fs.readFile(packageJson, 'utf8', function (err, data) {
      if (err) throw err;
      newContent = data.replace(`"name": "project"`,`"name": "${lower}"`)
      fs.writeFile(packageJson, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
    exec(`cd /d ${dest} && npm install`)
    let resultJson = path.resolve(dest, 'result.json');
    fs.readFile(resultJson, 'utf8', function (err, data) {
      if (err) throw err;
      newContent = data.replace(`{"success":false}`,`{"success":true}`)
      fs.writeFile(resultJson, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
  })
}

function createProject() {
  const lower = lowerCamelCase(store.project.name)
  const upper = upperCamelCase(store.project.name)
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/project');
  // 目标路径
  const dest = path.resolve(store.cwd, lower);

  copy(src, dest)
  .then(() => {
    let packageJson = path.resolve(dest, 'package.json');
    fs.readFile(packageJson, 'utf8', function (err, data) {
      if (err) throw err;
      newContent = data.replace(`"name": "project"`,`"name": "${lower}"`)
      fs.writeFile(packageJson, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
    exec(`cd /d ${dest} && npm install`)
    let resultJson = path.resolve(dest, 'result.json');
    fs.readFile(resultJson, 'utf8', function (err, data) {
      if (err) throw err;
      newContent = data.replace(`{"success":false}`,`{"success":true}`)
      fs.writeFile(resultJson, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
  })
}

function createComponent() {
  const lower = lowerCamelCase(store.component.name)
  const upper = upperCamelCase(store.component.name)
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/component');
  // 目标路径
  const dest = path.resolve(store.cwd, lower);
  
  copy(src, dest)
  .then(() => {
    let componentVue = path.resolve(dest, 'Component.vue');
    let componentJs = path.resolve(dest, 'index.js');
    fs.readFile(componentVue, 'utf8', function (err, data) {
      if (err) throw err;
      var newContent = data.replace(/component/g, lower).replace(/Component/g, upper)
      fs.writeFile(path.resolve(dest, upper + '.vue'), newContent, 'utf8', (err) => {
        if (err) throw err;
      });
      fs.unlinkSync(componentVue)
    })
    fs.readFile(componentJs, 'utf8', function (err, data) {
      if (err) throw err;
      var newContent = data.replace(/component/g, lower).replace(/Component/g, upper)
      fs.writeFile(componentJs, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
  })
}

function createClass() {
  const lower = lowerCamelCase(store.class.name)
  const upper = upperCamelCase(store.class.name)
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/class/component.js');
  // 目标路径
  const dest = path.resolve(store.cwd, lower+'.js');

  copy(src, dest)
  .then(() => {
    fs.readFile(dest, 'utf8', function (err, data) {
      if (err) throw err;
      var newContent = data.replace(/component/g, lower).replace(/Component/g, upper)
      fs.writeFile(dest, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
  })
}

function createVue() {
  const lower = lowerCamelCase(store.vue.name)
  const upper = upperCamelCase(store.vue.name)
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/vue/Component.vue');
  // 目标路径
  const dest = path.resolve(store.cwd, upper+'.vue');

  copy(src, dest)
  .then(() => {
    fs.readFile(dest, 'utf8', function (err, data) {
      if (err) throw err;
      var newContent = data.replace(/component/g, lower).replace(/Component/g, upper)
      fs.writeFile(dest, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
  })
}
function createFastConfig(cwd) {
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/fastConfig');
  // 目标路径
  const dest = path.resolve(cwd);
  const config = path.resolve(cwd, 'vue.config.js');
  var ex = fs.existsSync(config)
  if (ex) {
    baiscConfig = path.resolve(cwd, 'vue.config.basic.js');
    copy(config, baiscConfig).then(() => {
      copy(src, dest).then(() => {

      })
    })
  }
  // copy(src, dest)
  // exec(`cd /d ${dest} && npm install`)
}

function createReactComponent () {
  const lower = lowerCamelCase(store.component.name)
  const upper = upperCamelCase(store.component.name)
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, '../template/reactComponent');
  // 目标路径
  const dest = path.resolve(store.cwd, upper);
  
  copy(src, dest)
  .then(() => {
    let componentTsx = path.resolve(dest, 'index.tsx');
    fs.readFile(componentTsx, 'utf8', function (err, data) {
      if (err) throw err;
      var newContent = data.replace(/component/g, lower).replace(/Component/g, upper)
      fs.writeFile(componentTsx, newContent, 'utf8', (err) => {
        if (err) throw err;
      });
    })
  })
}

module.exports = {
  createWorkspace,
  createProject,
  createComponent,
  createClass,
  createVue,
  createFastConfig,
  createReactComponent
};