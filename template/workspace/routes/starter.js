var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var fork = require('child_process').fork;
var childList = {}
var fse = require('fs-extra')
require('shelljs/global');
//读取多个工程下的路由配置文件
//修改这些文件
// 启动多个工程
// 关闭多个工程查看文件是否重名

//获取可使用的项目
router.get('/getProjects', function(req, res, next) {
  var dirpath = path.resolve(__dirname, '../project');
  fs.readdir(dirpath, (error, files) => {
    var floder = [];
    files.forEach((e) => {
      var absolutePath = path.resolve(path.join(dirpath, e));
      var stats = fs.statSync(absolutePath);
      if(stats.isDirectory()){
        var resultJson = path.resolve(absolutePath, 'result.json');
        var checkDir = fs.existsSync(resultJson)
        if (checkDir) {
          var result = fs.readFileSync(resultJson, 'utf-8')
          try{
            if (JSON.parse(result).success) {
              floder.push({
                name: e,
                path: absolutePath
              });
            }
          }catch(error){}
        }
      }
    })
    res.send(JSON.stringify({ floder: floder }));
  })
})

//获取单个项目的配置
router.get('/getSingle', function(req, res, next) {
  var name = req.query.name
  var singleResult = {}
  if (name) {
    var dirpath = path.resolve(__dirname, '../project');
    var projectpath = path.resolve(path.join(dirpath, name));
    var routerJson = path.resolve(projectpath, 'router.json');
    var checkDir = fs.existsSync(routerJson)
    if (checkDir) {
      var result = fs.readFileSync(routerJson, 'utf-8')
      try{
        singleResult = JSON.parse(result)
      }catch(error){}
    }
  }
  res.send(singleResult);
})

router.get('/getAll', function(req, res, next) {
  var database = {}
  var databasepath =  path.resolve(__dirname, '../database/index.json');
  var checkDir = fs.existsSync(databasepath)
  if (checkDir) {
    var result = fs.readFileSync(databasepath, 'utf-8')
    try{
      database = JSON.parse(result)
    }catch(error){}
  }
  res.send(database);
})

router.get('/saveSingle', function(req, res, next) {
  var params = req.query.params
  var name = req.query.name
  if (name) {
    var dirpath = path.resolve(__dirname, '../project');
    var projectpath = path.resolve(path.join(dirpath, name));
    var routerJson = path.resolve(projectpath, 'router.json');
    var checkDir = fs.existsSync(routerJson)
    if (checkDir) {
      fs.writeFileSync(routerJson, params)
    }
  }
  res.send({});
})

router.get('/saveAll', function(req, res, next) {
  var params = req.query.params
  var database = {}
  if (params) {
    var databasepath =  path.resolve(__dirname, '../database/index.json');
    var checkDir = fs.existsSync(databasepath)
    if (checkDir) {
      var result = fs.readFileSync(databasepath, 'utf-8')
      try{
        database = JSON.parse(result)
      }catch(error){}
      database[params.no] = params.data
      fs.writeFileSync(databasepath, JSON.stringify(database))
    }
  }
  res.send({});
})
router.get('/publish', function(req, res, next) {
  var number = req.query.no
  if (number) {
    var database = {}
    var databasepath =  path.resolve(__dirname, '../database/index.json');
    var checkDir = fs.existsSync(databasepath)
    if (checkDir) {
      var result = fs.readFileSync(databasepath, 'utf-8')
      try{
        database = JSON.parse(result)
      }catch(error){}
    }
    if (database[number]) {
      var dirpath = path.resolve(__dirname, '../project');
      database[number].forEach(item => {
        var routerpath = path.resolve(dirpath, item.name, 'router.json');
        var checkDir = fs.existsSync(routerpath)
        if (checkDir) {
          fs.writeFileSync(routerpath, JSON.stringify(item.devServer))
        }
      })
    }
  }
  res.send({});
})

router.get('/startServer', function(req, res, next) {
  var number = req.query.no
  var list = []
  var database = {}
  var databasepath =  path.resolve(__dirname, '../database/index.json');
  var checkDir = fs.existsSync(databasepath)
  if (checkDir) {
    var result = fs.readFileSync(databasepath, 'utf-8')
    try{
      database = JSON.parse(result)
    }catch(error){}
  }
  if (database[number]) {
    var dirpath = path.resolve(__dirname, '../project');
    database[number].forEach(item => {
      var routerpath = path.resolve(dirpath, item.name);
      var cli = path.resolve(__dirname, '../fork/starter.js');
      var child = fork(cli)
      child.send({
        type: 'start',
        msg: child.pid,
        path: routerpath,
        name: item.name
      });
      list.push({
        pid: child.pid,
        name: item.name
      })
      childList[child.pid] = {
        name: item.name,
        child: child
      }
    })
  }
  res.send({list: list});
})
router.get('/startServerSingle', function(req, res, next) {
  var name = req.query.name
  if (name) {
    var dirpath = path.resolve(__dirname, '../project');
    var routerpath = path.resolve(dirpath, name);
    exec(`cd ${routerpath} && pm2 start ./node_modules/@vue/cli-service/bin/vue-cli-service.js serve --name ${name}  -- serve --fix --open`)
  }
  res.send({});
})
router.get('/stopServer', function(req, res, next) {
  var pid = req.query.pid
  // childList[pid].kill()
  if (pid && childList[pid]) {
    console.log('pid' + pid)
    childList[pid].child.send({
      type: 'stop',
      msg: pid,
      pid: pid,
      name: childList[pid].name
    });    
  }
  res.send({});
})
router.get('/stopServerSingle', function(req, res, next) {
  var name = req.query.name
  if (name) {
    exec('pm2 stop ' + name)
  }
  res.send({});
})
router.get('/build', function(req, res, next) {
  var name = req.query.name
  var distpath = ''
  if (name) {
    var dirpath = path.resolve(__dirname, '../project');
    var routerpath = path.resolve(dirpath, name);
    exec(`cd ${routerpath} && npm run build  && cd dist && jar -cvf ${name}.zip *`)
    distpath = path.resolve(routerpath, `./dist/${name}.zip`);
    var dest = path.resolve(__dirname, `../dist/${name}.zip`);
    fse.copy(distpath, dest)
  }
  res.send({distpath});
})

module.exports = router;