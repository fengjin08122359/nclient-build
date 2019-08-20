const requiredPackageVersion = require('../package.json').version;
const hasDir = require('./utils/hasDir');
const program = require('commander');
const store = require('./store');
const clearConsole = require('./utils/clearConsole');
const {createWorkspace,  createProject,  createComponent} = require('./create');
const path = require('path');

let programConfig = ()=> {
  program.version(requiredPackageVersion)
  .usage('<command> [options]');

  program.command('workspace <workspace-name>')
    .description('create a new workspace powered by nclient-build')
    .action(async(name, cmd) => {
      await hasDir(name);
      store.workspace.name = name
      store.cmd = cmd
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createWorkspace();
    });

  program.command('project <project-name>')
    .description('create a new project powered by nclient-build')
    .option('-d, --dir [dir]', 'target dir', 'project')
    .action(async(name, cmd) => {
      console.log(cmd)
      var dir = cmd.dir ? cmd.dir : 'project' 
      await hasDir(dir + '/' + name);
      store.project.name = name
      store.cmd = cmd
      store.cwd = path.resolve(process.cwd(),dir);
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createProject();
    });

  program.command('component <component-name>')
    .description('create a new component powered by nclient-build')
    .option('-d, --dir [dir]', 'target dir', '')
    .action(async(name, cmd) => {
      var dir = cmd.dir ? cmd.dir : '' 
      await hasDir(path.resolve(process.cwd(),dir,name));
      store.component.name = name
      store.cmd = cmd
      store.cwd = path.resolve(process.cwd(),dir);
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createComponent();
    });
  
  program.parse(process.argv);
}

module.exports = function initialization() {
 // commander 配置
  programConfig();
};