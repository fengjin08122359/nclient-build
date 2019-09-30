import {DataHandle} from 'nclient-microfront';

class Component extends DataHandle{
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
  Component
}