import Driver from '#models/driver'
import { InputDriver } from '../type/interface.js'

export class DriverRepository {
  getActive() {
    return Driver.query().where('active', true).orderBy('rank', 'desc')
  }

  updateOrCreate(inputDrivers: InputDriver[]) {
    return Driver.updateOrCreateMany('idApi', inputDrivers)
  }
}
