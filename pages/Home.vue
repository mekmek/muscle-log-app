<template>
  <div class="container">
    <div class="row">
      <div class="col-7">
        <Calendar />
      </div>
      <div class="col-5">
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from '~/components/Calendar.vue'

  export default {
    components: {
      Calendar
    }
  }
</script>