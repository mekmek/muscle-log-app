<template>
  <div class="container">
    <div class="row date">
      {{ displayDate }} の記録
    </div>
    
    <div class="row">
      <div class="col-lg">
        <div class="card">
          <div class="card-header">
            体組成
          </div>
          <div class="card-body">
            <div class="border memo">
              メモを表示する
            </div>
            <div class="row">
              <div class="col"></div>
              <div class="col">今回</div>
              <div class="col">前回</div>
            </div>
            <div class="row">
              <div class="col">体重</div>
              <div class="col">kg</div>
              <div class="col">kg</div>
            </div>
            <div class="row">
              <div class="col">体脂肪率</div>
              <div class="col">%</div>
              <div class="col">%</div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <div>種目リスト</div>
            <div>
              <button class="btn btn-info btn-sm">種目を選択</button>
              <button class="btn btn-info btn-sm">テンプレ呼出</button>
            </div>
          </div>
          <div class="card-body">
            <ul>
              <li>種目を選択</li>
              <li>種目を選択</li>
              <li>種目を選択</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="col-lg">
        <div class="card">
          <div class="card-header">
            トレーニング記録
          </div>
          <div class="card-body">
            <div class="border memo">
              メモを表示する
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: this.$route.params.date
    }
  },
  computed: {
    displayDate() {
      const t = new Date(Number(this.date))
      const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
      return `${t.getFullYear()}年${t.getMonth()}月${t.getDate()}日(${daysOfWeek[t.getDay()]})`
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  font-size: 30px;
  font-weight: bold;
  padding: 15px;
  text-decoration: underline;
}

.card {
  margin-bottom: 20px;
}

.memo {
  margin-bottom: 20px;
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}
</style>