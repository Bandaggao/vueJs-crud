export default {
  SET_EMPLOYEES: (state, employees) => {
    state.employees = employees
  },
  SET_EMPLOYEE: (state, employee) => {
    state.employee = employee
  },
  SET_EMPLOYEE_MODAL: (state, isOpen) => {
    state.openAddEmployeeModal = isOpen
  },
  SET_EMPLOYEE_QUERY: (state, query) => {
    state.employeeQuery = query
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading
  },
  SET_ERROR: (state, isError) => {
    state.isError = isError
  },
  SET_TOTAL_PAGE: (state, totalPage) => {
    state.totalPage = totalPage
  },
  SET_SUBMITTING_EMPLOYEE: (state, isSubmitting) => {
    state.isSubmittingEmployee = isSubmitting
  },
  SET_ERROR_SUBMITTING_EMPLOYEE: (state, isError) => {
    state.isErrorSubmittingEmployee = isError
  }
}
