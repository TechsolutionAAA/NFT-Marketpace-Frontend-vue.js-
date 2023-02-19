<script>
import loading from "../../images/loading.gif";
export default {
  name: "Modal",
  data() {
    return {
      loading,
    };
  },
};
</script>

<template>
  <transition name="loading-fade">
    <div class="loading-backdrop">
      <div class="loading">
        <img :src="loading" alt="" id="loading"/>
      </div>
    </div>
  </transition>
</template>

<style>
.loading-backdrop {
    padding: 50px 10px;
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
}
.loading {
    margin-left: 30%;
    background: transparent;
    display: flex;
}
#loading{
 width: 200px;
}
</style>