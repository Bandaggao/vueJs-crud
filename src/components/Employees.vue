<template>
  <div>
    <div>
      <ConfirmationModal @onDelete="deleteEmployee"/>
      <AddEmployeeModal :employee="employee" :isNewEntry="isNewEntry" @onSubmit="handleSubmit"/>
    </div>
    <div class="table-top">
    </div>
    <div class="nav-with-table d-flex justify-content-center flex-column align-items-center">
    <b-container>
      <b-row>
      <div class="table-top-body d-flex " style="justify-content:space-between; width: 100%; margin:20px 0;">
       <b-input-group-append>
          <b-input v-model="filter" placeholder="Type to Search"></b-input>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
        <b-button variant='outline-success' @click='openAddEmployeeModal'>
        <span class='fa fa-plus'></span> &nbsp;
        New
      </b-button>
    </div>
    <b-table :fields='fields' :items='employees' striped :busy="isLoading"
     @row-clicked='redirecToProdcutInfo' hover :filter="filter"
     >
        <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner variant="primary" class="align-middle"></b-spinner>
        </div>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button variant="danger" size="sm" @click="openConfirmationModal(row.item, row.index)" class="mr-1">
          Delete
        </b-button>
      </template>
     </b-table>
      </b-row>
      <p
        v-if="employees.length === 0"
        class="d-flex flex-column align-items-center justify-content-center mt-5"
        style="font-size:30px;color:#61DAE0; font-weight:bold;"
      >
        <span class="fa fa-flushed" style="color:#61DAE0;font-size:35px;transform:rotate(23deg)"></span>
        No data is available.
      </p>
    </b-container>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AddEmployeeModal from './modal/AddEmployeesModal.vue'
import ConfirmationModal from './modal/confirmationModal.vue'
export default {
  computed: {
    ...mapState('employee', ['employees', 'totalPage', 'isLoading', 'isError'])
  },
  components: {
    AddEmployeeModal,
    ConfirmationModal
  },
  data () {
    return {
      perPage: 5,
      currentPage: 1,
      rows: 1,
      filter: null,
      selectedItem: {},
      selectedIndex: 0,
      employee: {
        name: '',
        email: '',
        mobile: ''
      },
      employeeName: '',
      isNewEntry: false,
      submitted: false,
      fields: [
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'mobile',
          label: 'Mobile Numer'
        },
        {
          key: 'actions',
          label: 'Action'
        }
      ]
    }
  },
  async mounted () {
    await this.getAllEmployees({
      query: '',
      page: 1,
      limit: this.limit
    })
    // console.log(solutionCategory)
    // this.rows = this.solutions.length;
  },
  methods: {
    ...mapActions('employee', ['getAllEmployees']),

    handleSubmit () {
      if (this.isNewEntry) {
        this.$store.dispatch('employee/create', this.employee).then(result => {
          this.employees.push(result)
          this.$root.$emit('hideAddEmployeeModal', true)
        /**
         * TODO:
         * - Show an success alert notification after creation of project.
         * - Redirect to project/:slug/edit page
           */
        })
        window.location.reload()
      } else {
        this.$store.dispatch('employee/updateEmployeeById', { id: this.employeeId, employee: this.employee }).then(result => {
          this.$root.$emit('hideAddEmployeeModal', true)
        })
      }
      // alert('submitted!')
    },
    openAddEmployeeModal () {
      this.employee = {
        name: '',
        mobile: '',
        email: ''
      }
      this.isNewEntry = true
      this.$root.$emit('openAddEmployeeModal')
    },
    redirecToProdcutInfo (employee) {
      this.isNewEntry = false
      this.employee = employee
      this.employeeId = employee.id
      this.$root.$emit('openAddEmployeeModal')
    },
    deleteEmployee () {
      // console.log({ item, index })
      this.$store.dispatch('employee/deleteEmployeeById', { id: this.selectedItem.id, index: this.selectedIndex })
      this.$root.$emit('hideAddEmployeeModal', true)
    },
    openConfirmationModal (item, index) {
      this.selectedItem = item
      this.selectedIndex = index
      this.$root.$emit('openConfimationModal')
    }
  }
}
</script>
