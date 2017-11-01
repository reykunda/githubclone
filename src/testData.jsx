// users:
// gaearon
// timdorr
// acdlite
// omnidan
// ellbee
// markerikson
// emmenko
// mindjuice
//
// users api: https://api.github.com/users/<username>

export const initialState = {
  selectedGituser: 'me',
  gitusers: {
    me: {
      isRequesting: false,
      isInvalid: false,
      info: { company: 'Qolsys', repos: [1, 2, 3] },
      lastUpdate: 1970,
    },
    gaearon: {
      isRequesting: false,
      isInvalid: false,
      info: { company: 'else', repos: [1, 2, 3] },
      lastUpdate: 486545,
    },
    acdlite: {
      isRequesting: false,
      isInvalid: false,
      info: { company: 'something', repos: [1, 2, 3] },
      lastUpdate: 2166665,
    },
  },
};
