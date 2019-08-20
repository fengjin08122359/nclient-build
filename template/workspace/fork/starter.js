require('shelljs/global');

console.log(`child pid is ${process.pid}`);

process.on("message",(data) => {
  if (data.type == 'start') {
    exec(`cd ${data.path} && pm2 start ./node_modules/@vue/cli-service/bin/vue-cli-service.js serve --name ${data.name}  -- serve --fix --open`)
  } else if (data.type == 'stop') {
    exec('pm2 stop ' + data.name)
    process.kill()
  }
  console.log(`[child] get a data from parent is ${data.msg}\n`);
});