const {copy} = require('./creator')
const path = require('path');
const fs = require('fs')
const store = require('./store');
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
    let componentJs = path.resolve(dest, 'component.js');
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
      fs.writeFile(path.resolve(dest, lower + '.js'), newContent, 'utf8', (err) => {
        if (err) throw err;
      });
      fs.unlinkSync(componentJs)
    })
  })
}


module.exports = {
  createWorkspace,
  createProject,
  createComponent
};