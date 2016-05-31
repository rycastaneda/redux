import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_REPO = 'SELECT_REPO'
export const REQUEST_REPOS = 'REQUEST_REPOS'
export const RECEIVE_REPOS = 'RECEIVE_REPOS'
// ------------------------------------
// Actions
// ------------------------------------
export function requestRepos (user) {
    return {
        type: REQUEST_REPOS,
        fetching: true,
        user
    };
}

export function receiveRepos (user, repos) {
  console.log("repos", repos);
  return {
      type: RECEIVE_REPOS,
      repos,
      fetching: false,
      receivedAt: Date.now()
  };
}
// export function selectRepo (index) {
//     return {
//         type: SELECT_REPO,
//         index
//     };
// }

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const fetchRepos = () => {
    return (dispatch, getState) => {
      let state = getState().github;
      dispatch(requestRepos(state.user))
      console.log("dispatch, state", dispatch, state);
      return fetch(`https://api.github.com/users/${state.user}/repos`)
          .then(response => response.json())
          .then(data => dispatch(receiveRepos(state.user, data)));
    }
}

export const actions = {
  fetchRepos,
  requestRepos,
  receiveRepos,
  // selectRepo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_REPOS]: (state, action) => {
    console.log("state,action, REQUEST_REPOS", state,action);
    return Object.assign({}, state, {
            user: action.user,
           fetching: false
          })
  },
  [RECEIVE_REPOS]: (state, action) => {
    console.log("state,action, RECEIVE_REPOS", state,action);
     // return ({...state, repos: state.repos, fetching: false});

     return Object.assign({}, state, {
             repos: action.repos, fetching: false
           })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: 'rycastaneda',
    repos: [],
    index: 0
}


export default function githubReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
