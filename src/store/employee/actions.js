import { EmployeeService } from '@/services'

export default {
  getAllEmployees: async ({ commit }) => {
    commit('SET_LOADING', true)
    commit('SET_ERROR', false)
    try {
      const result = await EmployeeService.getAll()
      commit('SET_EMPLOYEES', result.data)
    } catch (error) {
      commit('SET_ERROR', true)
    }
    commit('SET_LOADING', false)
  },

  deleteEmployeeById: ({ commit, state }, { id, index }) => {
    commit('SET_SUBMITTING_EMPLOYEE', true)
    commit('SET_ERROR_SUBMITTING_EMPLOYEE', false)
    return EmployeeService.deleteEmployeeById(id)
      .then(result => {
        commit('SET_SUBMITTING_EMPLOYEE', false)
        state.employees.splice(index, 1)
        // commit('SET_CUSTOMER_QUERY', '')
        // dispatch('openOpportunityModal')
      })
      .catch(() => {
        commit('SET_SUBMITTING_EMPLOYEE', false)
        commit('SET_ERROR_SUBMITTING_EMPLOYEE', true)
      })
  },

  updateEmployeeById: ({ commit }, { id, employee }) => {
    commit('SET_SUBMITTING_EMPLOYEE', true)
    commit('SET_ERROR_SUBMITTING_EMPLOYEE', false)
    return EmployeeService.updateEmployeeById(id, employee)
      .then(result => {
        commit('SET_SUBMITTING_EMPLOYEE', false)
        // commit('SET_CUSTOMER_QUERY', '')
        // dispatch('openOpportunityModal')
        return result.data
      })
      .catch(() => {
        commit('SET_SUBMITTING_EMPLOYEE', false)
        commit('SET_ERROR_SUBMITTING_EMPLOYEE', true)
      })
  },

  create: ({ commit }, employee) => {
    commit('SET_SUBMITTING_EMPLOYEE', true)
    commit('SET_ERROR_SUBMITTING_EMPLOYEE', false)

    return EmployeeService.create(employee)
      .then(result => {
        commit('SET_SUBMITTING_EMPLOYEE', false)
        commit('SET_EMPLOYEE_QUERY', '')
        // dispatch('openOpportunityModal')
        return result.data
      })
      .catch(() => {
        commit('SET_SUBMITTING_EMPLOYEE', false)
        commit('SET_ERROR_SUBMITTING_EMPLOYEE', true)
      })
  },
  getEmployee: async ({ commit }, id) => {
    commit('SET_LOADING', true)
    // commit('SET_LOADING_CUSTOMER_CONTACTS', true)
    commit('SET_ERROR', false)
    try {
      const Employee = await EmployeeService.getEmployeeById(id)
      commit('SET_Employee', Employee.data)
      /**
       * TODO: This will load only if 'target dates' tab is active. For now, I load data asynchronously.
       */
      // dispatch('getCustomerContacts', state.project.id)
      // dispatch('customerContact/getAllByCustomerID', state.project.customer_id, { root: true })
      // dispatch('getTargetDates', state.project.id)
      // dispatch('getAllComments', state.project.id)
    } catch (error) {
      commit('SET_ERROR', true)
    }
    commit('SET_LOADING', false)
  }
  // getAllProducts: async ({ commit }, payload) => {
  //   commit('SET_LOADING', true)
  //   commit('SET_ERROR', false)
  //   try {
  //     const { query, page, limit } = payload
  //     const result = await EmployeeService.getAll(query, page, limit)
  //     commit('SET_ProductS', result.data.Products)
  //     commit('SET_TOTAL_PAGE', result.data.totalPage)
  //   } catch (error) {
  //     commit('SET_ERROR', true)
  //   }
  //   commit('SET_LOADING', false)
  // },
}
