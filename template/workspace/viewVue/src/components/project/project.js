import {Handle, DataHandle, httplink} from 'nclient-microfront';

class Project extends DataHandle{
  constructor() {
    super('project')
    this.list = []
    this.distpath = ''
  }
  init () {
    console.log('Project init')
    this.getProjects()
  }
  getProjects () {
    httplink('getProjects','/project/',{})
    .then(result => {
      this.list = result.res.floder
    })
  }
  add (name) {
    httplink('addProject','/project/add',{name})
    .then(() => {
      alert('添加成功')
      this.getProjects()
    })
  }
  remove (name) {
    httplink('removeProject','/project/remove',{name})
    .then(() => {
      alert('删除成功')
      this.getProjects()
    })
  }
  start (name) {
    httplink('startServerSingle','/starter/startServerSingle',{name})
    .then(() => {
      alert('启动')
    })
  }
  stop (name) {
    httplink('stopServerSingle','/starter/stopServerSingle',{name})
    .then(() => {
      alert('停止')
    })
  }
  build (name) {
    httplink('build','/starter/build',{name})
    .then((result) => {
      alert('build')
      if (result.res && result.res.distpath) {
        this.distpath = result.res.distpath
      }
    })
  }
}

let project = new Project()

let handle = new Handle({
  name: 'project',
  created () {
    project.init()
    console.log('project created')
  },
  mounted () {
    console.log('project mounted')
  },
  remove(name) {
    project.remove(name)
  },
  refresh() {
    project.getProjects()
  },
  add (name) {
    project.add(name)
  },
  start (name) {
    project.start(name)
  },
  stop (name) {
    project.stop(name)
  },
  build (name) {
    project.build(name)
  },
})

export default handle

export {
  project
}