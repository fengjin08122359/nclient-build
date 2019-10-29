import {DataHandle} from 'nclient-microfront';

class Component extends DataHandle{
  constructor() {
    super('componentClass')
  }
  init () {
    console.log('Component init')
  }
}

export {
  Component
}