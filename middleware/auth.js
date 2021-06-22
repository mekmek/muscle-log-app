import Cookies from 'universal-cookie'

export default ({ req, route, redirect }) => {
  const cookie = req ? new Cookies(req.headers.cookie) : new Cookies()
  const credential = cookie.get('credential')
  
  if (credential && ['/', '/Register'].includes(route.path)) redirect('/Home')
  if (!credential && !['/', '/Register'].includes(route.path)) redirect({ path: '/', query: { redirected: 'noCredential' } })
}