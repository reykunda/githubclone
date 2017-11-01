// actions

import axios from 'axios';

export const SEARCHBOX_CHANGE = 'SEARCHBOX_CHANGE';
export const searchboxChange = searchboxValue => ({
  type: SEARCHBOX_CHANGE,
  searchboxValue,
});

export const SELECT_GITUSER = 'SELECT_GITUSER';
export const selectGituser = gituser => ({
  type: SELECT_GITUSER,
  gituser,
});

export const INVALIDATE_GITUSER = 'INVALIDATE_GITUSER';
export const invalidateGituser = gituser => ({
  type: INVALIDATE_GITUSER,
  gituser,
});

export const REQUEST_GITUSER = 'REQUEST_GITUSER';
export const requestGituser = gituser => ({
  type: REQUEST_GITUSER,
  gituser,
});

export const RECEIVE_GITUSER = 'RECEIVE_GITUSER';
export const receiveGituser = (gituser, info = 'hello') => ({
  type: RECEIVE_GITUSER,
  gituser,
  info,
  receivedAt: Date.now(),
});

export const DELETE_GITUSER = 'DELETE_GITUSER';
export const deleteGituser = gituser => ({
  type: DELETE_GITUSER,
  gituser,
});

export const RECEIVE_REPOS = 'RECEIVE_REPOS';
export const receiveRepos = reposArray => ({
  type: RECEIVE_REPOS,
  reposArray,
});

export const ADD_REPOS_TO_GITUSER = 'ADD_REPOS_TO_GITUSER';
export const addReposToGituser = (gituser, reposArray) => ({
  type: ADD_REPOS_TO_GITUSER,
  gituser,
  reposArray,
});

export const ERROR = 'ERROR';
export const sendError = (error, receivedAt) => ({
  type: ERROR,
  error,
  receivedAt,
});

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const addNotification = (notification, text, receivedAt) => ({
  type: ADD_NOTIFICATION,
  notification,
  text,
  receivedAt,
});

export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const deleteNotification = receivedAt => ({
  type: DELETE_NOTIFICATION,
  receivedAt,
});

export const showNotification = (notification, text, receivedAt) => (
  (dispatch) => {
    dispatch(addNotification(notification, text, receivedAt));
    setTimeout(() => {
      dispatch(deleteNotification(receivedAt));
    }, 5000);
  }
);

export const requestRepos = (gituser, url) => (
  (dispatch) => {
    axios.get(url)
      .then((response) => {
        const { data } = response;
        dispatch(receiveRepos(data));
        dispatch(addReposToGituser(gituser, data));
      })
      .catch((error) => {
        const receivedAt = Date.now();
        dispatch(sendError(error.response, receivedAt));
        dispatch(showNotification(error.response, error.response.statusText, receivedAt));
      });
  }
);

export const requestUser = gituser => (
  (dispatch) => {
    dispatch(requestGituser(gituser));
    axios.get(`https://api.github.com/users/${gituser}`)
      .then((response) => {
        const { data } = response;
        dispatch(receiveGituser(gituser, data));
        dispatch(requestRepos(gituser, data.repos_url));
      })
      .catch((error) => {
        const receivedAt = Date.now();
        dispatch(sendError(error.response, receivedAt));
        dispatch(showNotification(error.response, error.response.statusText, receivedAt));
      });
  }
);

export const takeSearchInput = gituser => (
  (dispatch, getState) => {
    const state = getState();
    if (state.gitusers[gituser]) {
      const receivedAt = Date.now();
      dispatch(sendError('gituser already added', receivedAt));
      dispatch(showNotification('gituser already added', 'gituser already added', receivedAt));
    }
    dispatch(requestUser(gituser));
    dispatch(searchboxChange(''));
  }
);
