/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const LeaguesController = () => import('#controllers/leagues_controller')
const AdminsController = () => import('#controllers/admins_controller')

router
  .group(() => {
    router.post('register', [UsersController, 'register'])
    router.post('login', [UsersController, 'login'])
  })
  .prefix('user')

router
  .group(() => {
    router.post('create', [LeaguesController, 'create'])
    router.get('join/:code', [LeaguesController, 'join'])
    router.get('start/:leagueId/:homeAway', [LeaguesController, 'start'])
  })
  .prefix('league')
  .use(middleware.auth())

router
  .group(() => {
    router.get('test', [AdminsController, 'test'])
  })
  .prefix('admin')

router
  .get('me', async ({ auth, response }) => {
    const user = await auth.authenticate()
    return response.ok(user)
  })
  .use(middleware.auth())
