import {Handle, DataHandle, httplink} from 'nclient-microfront';

let {entries} = Object; 

class Starter extends DataHandle{
  constructor() {
    super('starter')
    this.serverList = {}
    this.current = {}
    this.currentName = ''
    this.port = ''
    this.proxyArray = []
  }
  init () {
    console.log('Starter init')
  }
  getSingle (name) {
    httplink('getSingle','/starter/getSingle',{name})
    .then(result => {
      this.serverList[name] = result.res;
      this.current = result.res
      this.currentName = name
      this.port = result.res.port
      this.proxyArray = []
      for (let [key, value] of entries(result.res.proxy)) {
        this.proxyArray.push({
          key: key,
          target: value.target
        })
      } 
    })
  }
  saveSingle () {
    var name = this.currentName;
    if (name) {
      var params = {
        port:  this.port,
        proxy: { }
      }
      this.proxyArray.forEach(item => {
        if (item.key && item.target) {
          params.proxy[item.key] = {
            changeOrigin: true,
            target: item.target
          }
        }
      })
      params = JSON.stringify(params)
      httplink('saveSingle','/starter/saveSingle',{name: name, params})
      .then(() => {
        alert('保存成功')
        this.getSingle(name)
      })
    }
  }
}

let starter = new Starter()

let handle = new Handle({
  name: 'starter',
  created () {
    starter.init()
    console.log('starter created')
  },
  mounted () {
    console.log('starter mounted')
  },
  getSingle (name) {
    starter.getSingle(name)
  },
  save () {
    starter.saveSingle()
  }
})

export default handle

export {
  starter
}