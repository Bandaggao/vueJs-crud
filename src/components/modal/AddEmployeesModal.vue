<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title= modalState >
      <div class='d-block text-center'>
        <b-form inline @submit.prevent='handleSubmit'>
        <div class='formfields' style='display: flex; flex-wrap: wrap; justify-content: space-between;'>
             <b-input-group prepend class="col-md-6 mt-2 d-flex">
              <label for="inline-form-input-name">Name</label>
              <b-input
                type="text"
                v-model="employee.name"
                id="name"
                name="name"
                placeholder="Name"
                class="form-control"
                style="width:100%;"
                :class="{ 'is-invalid': submitted && $v.employee.name.$error }"
              ></b-input>
              <div
                v-if="submitted && !$v.employee.name.required"
                class="invalid-feedback"
              >Name is required</div>
              <div
                v-if="submitted && !$v.employee.name.alpha"
                class="invalid-feedback"
              >Special characters are no allowed except for "-"</div>
            </b-input-group>
            <b-input-group prepend class="col-md-6 mt-2 d-flex">
              <label for="inline-form-input-mobile">Mobile</label>
              <b-input
                type="text"
                v-model="employee.mobile"
                id="name"
                name="name"
                placeholder="mobile"
                class="form-control"
                style="width:100%;"
                :class="{ 'is-invalid': submitted && $v.employee.mobile.$error }"
              ></b-input>
              <div
                v-if="submitted && !$v.employee.mobile.required"
                class="invalid-feedback"
              >Name is required</div>
              <div
                v-if="submitted && !$v.employee.name.alpha"
                class="invalid-feedback"
              >Special characters are no allowed except for "-"</div>
            </b-input-group>

            <b-input-group prepend class="col-md-12 mt-2 d-flex">
              <label for="inline-form-input-name">Email</label>
              <b-form-textarea
                type="text"
                v-model="employee.email"
                id="Email"
                name="name"
                placeholder="Email"
                class="form-control"
                style="width:100%;"
                :class="{ 'is-invalid': submitted && $v.employee.email.$error }"
              ></b-form-textarea>
              <div
                v-if="submitted && !$v.employee.email.required"
                class="invalid-feedback"
              >Email is required</div>
            </b-input-group>
        </div>
                  <div class="col-md-12 d-flex mt-3 mb-3">
            <div v-if="isSubmittingEmployee" class="col-md-6 pl-0">
              <b-button
                :disabled="isSubmittingEmployee"
                block
                variant="outline-success"
                type="submit"
              >
              <b-spinner small v-if="isSubmittingEmployee"></b-spinner>
                  <span v-if="isSubmittingEmployee"> {{modalState}}</span>
              </b-button>
            </div>
            <div v-else class="col-md-6 pl-0">
              <b-button variant="outline-success"
              block
              type="submit"
              >{{ modalState }}</b-button>
            </div>
            <div class="col-md-6 pr-0">
              <b-button variant="outline-danger" block @click="hideModal">Cancel</b-button>
            </div>
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    employee: {
      type: Object,
      required: true
    },
    isNewEntry: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isNewEntry (val) {
      if (val) {
        this.modalState = 'Add New Employee'
      } else {
        this.modalState = 'Update Employee'
      }
    }
  },
  data () {
    return {
      modalState: 'Add New Employee',
      submitted: false
    }
  },
  validations: {
    employee: {
      name: { required },
      email: { required, email },
      mobile: { required }
    }
  },
  computed: {
    ...mapState('employee', ['isSubmittingEmployee'])
  },
  methods: {
    ...mapActions('employee', ['getAllEmployees']),
    handleSubmit () {
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) this.$emit('onSubmit')
    },
    hideModal (reset = false) {
      this.$refs['my-modal'].hide()
      // if (reset) this.$v.$reset()
    },
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    resetForm () {
      this.form.name = ''
      this.form.employees = ''
      this.form.solClassificationId = null
      this.form.solCategoryId = null
    }
  },
  mounted () {
    this.$root.$on('openAddEmployeeModal', () => {
      this.$refs['my-modal'].show()
    })
    this.$root.$on('hideAddEmployeeModal', (reset = false) => {
      this.$refs['my-modal'].hide()
      // if (reset) this.$v.$reset()
    })
    if (this.isNewEntry) {
      this.modalState = 'Add New Employee'
    } else {
      this.modalState = 'Update Employee'
    }
  }
}
</script>
