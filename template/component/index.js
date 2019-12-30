import {DataHandle} from 'nclient-microfront';

class ComponentComp extends DataHandle{
  constructor(_uid) {
    super('componentComp', _uid)
  }
  init () {
    console.log('Component init')
  }
  created () {
    console.log('component created')
  }
  mounted () {
    console.log('component mounted')
  }
}

export {
  ComponentComp
}