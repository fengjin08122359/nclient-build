const requiredPackageVersion = require('../package.json').version;
const hasDir = require('./utils/hasDir');
const program = require('commander');
const store = require('./store');
const clearConsole = require('./utils/clearConsole');
const {createWorkspace,  createProject,  createComponent, createClass, createVue, createFastConfig, createReactComponent} = require('./create');
const path = require('path');

let programConfig = ()=> {
  program.version(requiredPackageVersion)
  .usage('<command> [options]');

  program.command('version')
    .description('getVersion')
    .action(async(name, cmd) => {
      console.log('v' + requiredPackageVersion);
    });

  program.command('help')
    .description('help')
    .action(async(name, cmd) => {
      console.log(`
      fast-config 
      workspace <workspace-name>
      project <project-name>
      component <component-name>
      class <class-name>
      vue <vue-name>
      reactComp <reactComp-name>
      `);
    });

  program.command('fast-config')
    .description('fast-config')
    .action(async(name, cmd) => {
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createFastConfig(process.cwd())
    });

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
  
  program.command('class <class-name>')
    .description('create a new class powered by nclient-build')
    .option('-d, --dir [dir]', 'target dir', '')
    .action(async(name, cmd) => {
      var dir = cmd.dir ? cmd.dir : '' 
      store.class.name = name
      store.cmd = cmd
      store.cwd = path.resolve(process.cwd(),dir);
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createClass();
    });

  program.command('vue <vue-name>')
    .description('create a new vue.js powered by nclient-build')
    .option('-d, --dir [dir]', 'target dir', '')
    .action(async(name, cmd) => {
      var dir = cmd.dir ? cmd.dir : '' 
      store.vue.name = name
      store.cmd = cmd
      store.cwd = path.resolve(process.cwd(),dir);
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createVue();
    });
  program.command('reactComp <reactComp-name>')
    .description('create a new react component powered by nclient-build')
    .option('-d, --dir [dir]', 'target dir', '')
    .action(async(name, cmd) => {
      var dir = cmd.dir ? cmd.dir : '' 
      await hasDir(path.resolve(process.cwd(),dir,name));
      store.component.name = name
      store.cmd = cmd
      store.cwd = path.resolve(process.cwd(),dir);
      clearConsole('cyan', `nclient-build v${requiredPackageVersion}`);
      createReactComponent();
    });
  program.parse(process.argv);
}

module.exports = function initialization() {
 // commander 配置
  programConfig();
};