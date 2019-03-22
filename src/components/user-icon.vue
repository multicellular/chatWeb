<template>
  <div class="user-icon">
    <div class="user-con">
      <div class="avatar-con">
        <img class="uavatar" :src="uavator">
      </div>
      <div>
        <div class="uname">{{uname}}</div>
        <div class="ubio">{{ubio}}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "user-icon",
  props: ["uavator", "uname", "ubio"]
};
</script>

<style lang="scss" scoped>
.user-icon {
  display: flex;
  justify-content: space-between;
}
.user-con {
  display: flex;
  align-items: center;
  .avatar-con {
    margin-right: 12px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    .uavatar {
      max-width: 100%;
      max-height: 100%;
      // border-radius: 50%;
    }
  }
  .uname {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2e3135;
  }
  .ubio {
    font-size: 13px;
    color: #8a9aa9;
  }
}
</style>