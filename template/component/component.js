import {Handle, DataHandle} from 'nclient-microfront';

class Component extends DataHandle{
  constructor() {
    super('component')
  }
  init () {
    console.log('Component init')
  }
}

let component = new Component()

let handle = new Handle({
  name: 'component',
  created () {
    component.init()
    console.log('component created')
  },
  mounted () {
    console.log('component mounted')
  },
})

export default handle

export {
  component
}