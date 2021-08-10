<template>
  <div>
    <b-modal ref="my-modal" hide-footer title="Are you sure you want to delete this employee? ">
      <div class='d-block text-center'>
        <b-form inline @submit.prevent='handleSubmit'>
        <div class='formfields' style='display: flex; flex-wrap: wrap; justify-content: space-between;'>

                  <div class="col-md-12 d-flex mt-3 mb-3">
            <div v-if="isSubmittingEmployee" class="col-md-6 pl-0">
              <b-button
                :disabled="isSubmittingEmployee"
                block
                variant="outline-success"
                type="submit"
              >
              <b-spinner small v-if="isSubmittingEmployee"></b-spinner>
                  <span v-if="isSubmittingEmployee"> Delete </span>
              </b-button>
            </div>
            <div v-else class="col-md-6 pl-0">
              <b-button variant="outline-success"
              block
              type="submit"
              >Delete</b-button>
            </div>
            <div class="col-md-6 pr-0">
              <b-button variant="outline-danger" block @click="hideModal">Cancel</b-button>
            </div>
          </div>
        </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('employee', ['isSubmittingEmployee'])
  },
  methods: {
    ...mapActions('employee', ['getAllEmployees']),
    handleSubmit () {
      this.submitted = true
      // this.$v.$touch()
      this.$emit('onDelete')
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
      this.form.employeess = ''
      this.form.solClassificationId = null
      this.form.solCategoryId = null
    }
  },
  mounted () {
    this.$root.$on('openConfimationModal', () => {
      this.$refs['my-modal'].show()
    })
    this.$root.$on('hideAddEmployeeModal', (reset = false) => {
      this.$refs['my-modal'].hide()
      // if (reset) this.$v.$reset()
    })
  }
}
</script>
