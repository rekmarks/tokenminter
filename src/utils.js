
export const ROUTES = {
  home: getPath('/'),
  actions: {
    mint: getPath('/actions/mint'),
  },
}

export function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getPath (path) {
  if (path.charAt(0) !== '/') return process.env.PUBLIC_URL + '/' + path
  return process.env.PUBLIC_URL + path
}
