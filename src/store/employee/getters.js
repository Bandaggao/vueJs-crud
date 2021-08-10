export default {
  getEmployees: (state) => {
    if (state.employeeQuery === '') return []
    return state.employees.filter(employee => {
      const regex = new RegExp(state.employeeQuery, 'gi')
      return employee.name.match(regex)
    })
  },
  getEmployeeCount: (state) => {
    return state.employee.length
  }
}
