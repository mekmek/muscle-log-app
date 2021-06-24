<template>
  <div class="container">
    <!-- トレーニングの設定画面 -->
    <div class="row date">
      トレーニングの設定
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <div>登録種目一覧</div>
            <div class="btn btn-sm btn-primary" @click="showTrainingModal">新規登録</div>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group row">
                <label class="col-3 col-form-label">部位</label>
                <select class="col-8 form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">グループ</label>
                <select class="col-8 form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </form>
            <ul class="border menus">
              <li v-for="item in trainingItems" :key="item.name">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <div>登録内容詳細・変更</div>
            <div class="btn btn-sm btn-primary">変更を適用</div>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group row">
                <label class="col-3 col-form-label">種目名</label>
                <input type="text" class="form-control col-8" id="pa">
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">部位</label>
                <input type="text" class="form-control col-8">
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">グループ名</label>
                <input type="text" class="form-control col-8">
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">メモ</label>
                <textarea class="form-control col-8 training-memo"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- トレーニング設定の「新規登録」モーダル -->
    <modal name="training-modal" height="auto">
      <div class="modal-header">
        トレーニング種目の新規登録
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true" @click="hideTrainingModal">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="modal-form">
          <div class="form-group row">
            <label class="col-3 col-form-label">種目名</label>
            <input type="text" class="form-control col-8" v-model="tName">
          </div>
          <div class="form-group row">
            <label class="col-3 col-form-label">部位</label>
            <input type="text" class="form-control col-8" v-model="tPart">
          </div>
          <div class="form-group row">
            <label class="col-3 col-form-label">グループ名</label>
            <input type="text" class="form-control col-8" v-model="tGroup">
          </div>
          <div class="form-group row">
            <label class="col-3 col-form-label">メモ</label>
            <textarea class="form-control col-8 training-memo" v-model="tMemo"></textarea>
          </div>
        </form>
        <div class="text-center">
          <button class="btn btn-primary" @click="registerTraining">登録実行</button>
        </div>
      </div>
    </modal>

    <!-- 体組成の設定画面 -->
    <div class="row date">
      体組成の設定
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <div>登録項目一覧</div>
            <div class="btn btn-sm btn-primary">新規登録</div>
          </div>
          <div class="card-body">
            <ul class="border menus">
              <li>test</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <div>登録内容詳細・変更</div>
            <div class="btn btn-sm btn-primary">変更を適用</div>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group row">
                <label class="col-3 col-form-label">種目名</label>
                <input type="text" class="form-control col-8" id="pa">
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">単位</label>
                <input type="text" class="form-control col-8">
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">メモ</label>
                <textarea class="form-control col-8 body-memo"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 体組成の設定の「新規登録」モーダル -->
    <modal name="body-modal">
      <div>モーダルで表示するコンテンツ</div>
    </modal>

  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('training-items/listenTrainingItems')
  },
  data() {
    return {
      date: this.$route.params.date,
      tName: '',
      tPart: '',
      tGroup: '',
      tMemo: ''
    }
  },
  computed: {
    displayDate() {
      const t = new Date(Number(this.date))
      const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
      return `${t.getFullYear()}年${t.getMonth()}月${t.getDate()}日(${daysOfWeek[t.getDay()]})`
    },
    trainingItems() {
      return this.$store.getters['training-items/trainingItems']
    }
  },
  methods: {
    showTrainingModal() {
      this.$modal.show("training-modal")
    },
    hideTrainingModal() {
      this.$modal.hide("training-modal")
    },
    showBodyModal() {
      this.$modal.show("body-modal")
    },
    hideBodyModal() {
      this.$modal.hide("body-modal")
    },
    registerTraining() {
      this.hideTrainingModal()
      const tInfo = {
        name: this.tName,
        part: this.tPart,
        group: this.tGroup,
        memo: this.tMemo
      }
      this.$store.dispatch('training-items/registerTraining', tInfo)
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.menus {
  width: 100%;
  height: 300px;
  overflow: auto;
  white-space: nowrap;
  padding: 0;
  border-radius: 5px;
  li {
    padding: 5px 10px;
    list-style: none;
    &:hover {
      cursor: pointer;
      background-color: rgba(100, 100, 100, 0.1);
    }
  }
}

.training-memo {
  overflow: auto;
  white-space: nowrap;
  height: 246px;
}

.body-memo {
  overflow: auto;
  white-space: nowrap;
  height: 192px;
}

.modal-form {
  padding: 10px;
}

.modal-header {
  font-size: 20px;
}
</style>