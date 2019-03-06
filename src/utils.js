
export const ROUTES = {
  home: '/',
  actions: {
    mint: '/actions/mint',
  },
}

export function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
