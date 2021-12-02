<template>
  <div class="all">
    <!-- 始め -->
    {{ number1 }}
    {{ number2 }}
    {{ number3 }}
    <div v-show="!gameSet" class="gameZone">
      <div v-show="gameStart">
        <div class="result">
          {{ result }}
        </div>
        <button
          type="button"
          @click="playBall()"
          class="waves-effect waves-light btn"
        >
          プレイボール！
        </button>
      </div>
      <div v-show="!gameStart">
        <form name="form">
          <span class="answerZone">
            <input
              type="text"
              class="answer"
              v-model="answer1"
              ref="enterAnswer1"
              maxlength="1"
          /></span>
          <span class="answerZone">
            <input
              type="text"
              class="answer"
              v-model="answer2"
              ref="enterAnswer2"
              maxlength="1"
          /></span>
          <span class="answerZone">
            <input
              type="text"
              class="answer"
              v-model="answer3"
              ref="enterAnswer3"
              maxlength="1"
          /></span>
        </form>
        <div v-show="!gameSet">
          <button
            type="button"
            @click="attack()"
            class="waves-effect waves-light btn attackBtn"
          >
            攻撃
          </button>
          <table class="striped">
            <thead>
              <tr>
                <th>回</th>
                <th>1桁目</th>
                <th>2桁目</th>
                <th>3桁目</th>
                <th>結果</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, i) of resultArray" :key="result.answer1">
                <td>{{ i + 1 }}回の攻撃</td>
                <td>{{ result.answer1 }}</td>
                <td>{{ result.answer2 }}</td>
                <td>{{ result.answer3 }}</td>
                <td>{{ result.result }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-show="gameSet">
      <div class="end">あなたの勝ちです('ω')</div>
      <img src="/hanabi.gif" />
    </div>
    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Result } from "../types/result";
export default defineComponent({
  // 始め
  data() {
    //   変数始め
    const number1 = 0;
    const number2 = 0;
    const number3 = 0;
    const answer1 = "";
    const answer2 = "";
    const answer3 = "";
    const result = "";
    const hit = 0;
    const homerun = 0;
    const gameSet = false;
    const resultArray = new Array<Result>();
    const enterAnswer1 = "";
    const gameStart = true;
    return {
      number1,
      number2,
      number3,
      answer1,
      answer2,
      answer3,
      result,
      hit,
      homerun,
      gameSet,
      resultArray,
      enterAnswer1,
      gameStart,
    };
    // 変数終わり
  },

  methods: {
    //関数始め
    playBall(): void {
      this.getNumber1();
      this.getNumber2();
      this.getNumber3();
      this.gameStart = false;
    },

    getNumber1(): void {
      this.number1 = Math.floor(Math.random() * 10);
    },
    getNumber2(): void {
      this.number2 = Math.floor(Math.random() * 10);
      while (this.number1 === this.number2) {
        this.number2 = Math.floor(Math.random() * 10);
      }
    },
    getNumber3(): void {
      this.number3 = Math.floor(Math.random() * 10);
      while (this.number1 === this.number3 || this.number2 === this.number3) {
        this.number3 = Math.floor(Math.random() * 10);
      }
    },
    attack() {
      this.homerun = 0;
      this.hit = 0;
      this.result = "";
      //全問正解だった場合
      if (
        this.number1 === Number(this.answer1) &&
        this.number2 === Number(this.answer2) &&
        this.number3 === Number(this.answer3)
      ) {
        this.gameSet = true;
      } else {
        //ヒット
        if (
          this.number1 === Number(this.answer2) ||
          this.number1 === Number(this.answer3)
        ) {
          this.hit += 1;
        }
        if (
          this.number2 === Number(this.answer1) ||
          this.number2 === Number(this.answer3)
        ) {
          this.hit += 1;
        }
        if (
          this.number3 === Number(this.answer1) ||
          this.number3 === Number(this.answer2)
        ) {
          this.hit += 1;
        }
        //ホームラン
        if (this.number1 === Number(this.answer1)) {
          this.homerun += 1;
        }
        if (this.number2 === Number(this.answer2)) {
          this.homerun += 1;
        }
        if (this.number3 === Number(this.answer3)) {
          this.homerun += 1;
        }
        this.result = `${this.homerun}ホームラン${this.hit}ヒット`;
      }
      //結果を収納
      this.resultArray.push(
        new Result(
          Number(this.answer1),
          Number(this.answer2),
          Number(this.answer3),
          `${this.homerun}ホームラン${this.hit}ヒット`
        )
      );
      //9回で終了
      if (this.resultArray.length === 9) {
        this.result = "ゲームセット！あなたの負けです。";
        this.gameSet = true;
      }
      this.answer1 = "";
      this.answer2 = "";
      this.answer3 = "";
    },
    //関数終わり
  },
  //   終わり
});
</script>

<style scoped>
.gameZone {
  margin: 50px;
}

table,
tr,
th,
td {
  /* border: solid black 1px; */
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}

table {
  width: 1000px;
  margin-left: -110px;
}

form {
  display: flex;
  width: 300px;
  margin-left: 200px;
}

.answerZone {
  margin-left: 30px;
}

.btn {
  margin: 30px 0px 10px 300px;
}

.attackBtn {
  margin-left: 335px;
}

.all {
  margin-left: 200px;
}

input {
  text-align: center;
}

.result {
  font-size: 20px;
  margin-left: 390px;
}

.end {
  font-size: 30px;
  margin-left: 150px;
}

img {
  width: 200px;
  margin-left: 200px;
}
</style>
