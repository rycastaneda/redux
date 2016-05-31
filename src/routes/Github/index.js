import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'github',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Github = require('./containers/GithubContainer').default
      const reducer = require('./modules/githubRepos').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'github', reducer })

      /*  Return getComponent   */
      cb(null, Github)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
