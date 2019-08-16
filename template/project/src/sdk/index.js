import {changeTitle} from 'nclient-microfront'

export default {
  init () {
    document.title = 'abc'
    changeTitle.init()
  }
}