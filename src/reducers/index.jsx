// reducers

import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  SEARCHBOX_CHANGE,
  SELECT_GITUSER,
  INVALIDATE_GITUSER,
  REQUEST_GITUSER,
  RECEIVE_GITUSER,
  DELETE_GITUSER,
  ERROR,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  RECEIVE_REPOS,
  ADD_REPOS_TO_GITUSER,
} from '../actions';

const searchboxValue = (state = '', action) => {
  switch (action.type) {
    case SEARCHBOX_CHANGE:
      return action.searchboxValue;
    default:
      return state;
  }
};

const selectedGituser = (state = 'gaearon', action) => {
  switch (action.type) {
    case SELECT_GITUSER:
      return action.gituser;
    default:
      return state;
  }
};

const gituser = (
  state = {
    isRequesting: false, // an async request flag
    isInvalid: false, // a sync UI flag
  },
  action,
) => {
  switch (action.type) {
    case INVALIDATE_GITUSER:
      return {
        ...state,
        isInvalid: true,
      };
    case REQUEST_GITUSER:
      return {
        ...state,
        isRequesting: true,
        isInvalid: false,
      };
    case RECEIVE_GITUSER:
      return {
        ...state,
        isRequesting: false,
        isInvalid: false,
        info: action.info,
        lastUpdate: action.receivedAt,
      };
    case ADD_REPOS_TO_GITUSER:
      return {
        ...state,
        repos: _.map(action.reposArray, repo => repo.id),
      };
    default:
      return state;
  }
};

const gitusers = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_GITUSER:
    case REQUEST_GITUSER:
    case RECEIVE_GITUSER:
    case ADD_REPOS_TO_GITUSER:
      return {
        ...state,
        [action.gituser]: gituser(state[action.gituser], action),
      };
    case DELETE_GITUSER:
      return _.reduce(state, (result, value, key) => {
        if (!_.isEqual(action.gituser, key)) {
          result[key] = value;
        }
        return result;
      }, {});
    default:
      return state;
  }
};

const repos = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_REPOS: {
      const newrepos = _.reduce(action.reposArray, (result, value) => {
        result[value.id] = value;
        return result;
      }, {});
      return {
        ...state,
        ...newrepos,
      };
    }
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        [action.receivedAt]: action.error,
      };
    default:
      return state;
  }
};

const notifications = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        [action.receivedAt]: action.text,
      };
    case DELETE_NOTIFICATION:
      return _.reduce(state, (result, value, key) => {
        if (!_.isEqual(key, String(action.receivedAt))) {
          result[key] = value;
        }
        return result;
      }, {});
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchboxValue,
  selectedGituser,
  gitusers,
  errors,
  notifications,
  repos,
});

export default rootReducer;
