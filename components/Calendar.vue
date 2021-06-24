<template>
  <div>
    <div class="row justify-content-between calendar-bar">
      <div class="btn btn-dark" @click="changeMonth(-1)">&lt;</div>
      <div class="month">{{ displayYearAndMonth }}</div>
      <div class="btn btn-dark" @click="changeMonth(1)">&gt;</div>
    </div>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th v-for="d in daysOfWeek" :key="d">{{ d }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, idx) in monthData" :key="idx">
          <td 
            v-for="d in week"
            :key="d"
            @click="showLog(d)"
          >
            {{ d }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      daysOfWeek: ['日', '月', '火', '水', '木', '金', '土'],
      displayMonth: new Date().getMonth() + 1,
      displayYear: new Date().getFullYear()
    }
  },
  computed: {
    displayYearAndMonth() {
      return `${this.displayYear}年${this.displayMonth}月`;
    },
    monthData() {
      const firstDate = new Date(this.displayYear, this.displayMonth, 1);
      const endDate = new Date(this.displayYear, this.displayMonth + 1, 0);
      let monthData = [];
      let week = [];
      let cnt = 0;
  
      // 第1週
      for (let i = 0; i < 7; i++) {
        if (i < firstDate.getDay()) {
          week.push('');
        } else {
          week.push(++cnt);
        }
      }
      monthData.push(week);
  
      // 第2週以降
      const weekCnt = Math.floor((endDate.getDate() - cnt) / 7);
      for (let i = 0; i < weekCnt; i++) {
        week = [];
        for (let j = 0; j < 7; j++) {
          week.push(++cnt);
        }
        monthData.push(week);
      }
      
      // 最終週
      const left = endDate.getDate() - cnt;
      if (left > 0) {
        week = [];
        for (let i = 0; i < 7; i++) {
          if (i < left) {
            week.push(++cnt);
          } else {
            week.push('');
          }
        }
        monthData.push(week);
      }
      return monthData;
    }
  },
  methods: {
    changeMonth(num) {
      this.displayMonth += num;
    },
    showLog(d) {
      const t = new Date(this.displayYear, this.displayMonth, d).getTime()
      this.$router.push(`/log/${t}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-bar {
  margin: 20px 0;
  font-size: 25px;
  font-weight: bold;
}

th {
  text-align: center;
}

td {
  &:first-child {
    color: red;
  }
  &:last-child {
    color: blue;
  }
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
    cursor: pointer;
  }
}
</style>