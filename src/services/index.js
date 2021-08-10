import Employee from './Employee'
import ApiClient from '../lib/api'

let client = new ApiClient()
let http = client.getClient()

const EmployeeService = new Employee(client)

export {
  http,
  EmployeeService
}
