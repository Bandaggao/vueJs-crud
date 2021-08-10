export default class employee {
  constructor (apiClient) {
    this.http = apiClient
  }

  getAll () {
    return this.http.get('/employees')
  }
  create (formData) {
    return this.http.post('/employees', formData)
  }

  getEmployeeById (id) {
    return this.http.get(`/employees/${id}`)
  }

  updateEmployeeById (id, employee) {
    return this.http.put(`/employees/${id}`, employee)
  }

  deleteEmployeeById (id) {
    return this.http.delete(`/employees/${id}`)
  }
  // getAll(query = '', page = 1, limit = 5) {
  //   return this.http.get(`/products?q=${query}&page=${page}&limit=${limit}`);
  // }
}
