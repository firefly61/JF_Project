<template>
  <div>
    <ul class="box">
      <li v-for="value in dataList" :key="value.type">
        <div><strong class="type">{{value.type}}</strong></div>
        <div>{{value.data}}</div>
        <!-- <div class="percent">{{value.data/totalData}}</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TotalDataCom',
    props: {
      dataList: Array
    },
    data() {
      return {
        // dataList: totalMember.total.data
      }
    },
    created() {
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    display: flex;
    justify-content: space-evenly;
    flex-flow: wrap;
    padding: 1rem 0 0;
  }

  .box li:first-child {
    background: linear-gradient(45deg, #c3c2c2, #ebeaea);
  }

  .box li:nth-child(2) {
    background: linear-gradient(45deg, #7c8df7, #b9c0f6);
  }

  .box li:nth-child(3) {
    background: linear-gradient(45deg, #e7ba87, #f3dcbb);
  }

  .box li:nth-child(4) {
    background: linear-gradient(45deg, #fb97c8, #ffd4ec);
  }



  .box li {
    display: block;
    width: 38%;
    background: #fff;
    margin-bottom: 0.625rem;
    padding: 0.625rem;
    border-radius: 3px;
  }

  /* .van-grid-item__content {
    padding: 0.625rem !important;
  } */

  .type {
    font-size: 0.825rem;
    color: #003366;
  }

  .percent {
    font-size: 0.625rem;
    color: #333;
  }
</style>