var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var {deleteAll} = require('../utils/file')

require('shelljs/global');
/* GET home page. */0
router.get('/', function(req, res, next) {
  let dirpath = path.resolve(__dirname, '../project');
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
});

router.get('/add', function(req, res, next) {
  let name = req.query.name
  if (name) {
    exec('nclient-build project '+ name)
  }
  res.send({});
});

router.get('/remove', function(req, res, next) {
  let dirpath = path.resolve(__dirname, '../project');
  let name = req.query.name
  if (name) {
    var projectpath = path.resolve(path.join(dirpath, name));
    var checkDir = fs.existsSync(projectpath)
    if (checkDir) {
      let resultJson = path.resolve(projectpath, 'result.json');
      fs.readFile(resultJson, 'utf8', function (err, data) {
        if (err) throw err;
        newContent = data.replace(`{"success":true}`,`{"success":false}`)
        fs.writeFile(resultJson, newContent, 'utf8', (err) => {
          if (err) throw err;
        });
        deleteAll(projectpath)
      })
    }
  }
  res.send({});
});

module.exports = router;
