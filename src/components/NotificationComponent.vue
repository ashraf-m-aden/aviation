<template>
  <div class="toast-container position-fixed" v-show="notif">
    <div
      v-show="success"
      id="liveToast"
      class="toast success"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <img
          src="../assets/casa.png"
          class="rounded me-2"
          alt="aviation djibouti"
        />
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
    <div
      v-show="!success"
      id="liveToast"
      class="toast warning"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <img
          src="../assets/casa.png"
          class="rounded me-2"
          alt="aviation djibouti"
        />
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters.getMessage;
    },
    success() {
      return this.$store.getters.getSuccess;
    },
    notif() {
      return this.$store.getters.getNotif;
    },
  },
};
</script>

<style lang="scss" scoped>
.rounded {
  width: 3rem;
}
.toast-container {
  z-index: 999;
  right: 0;
}
.success {
  padding: 5px;
  background: linear-gradient(
    90deg,
    rgba(0, 212, 255, 1) 40%,
    rgba(25, 0, 255, 0.4430147058823529) 89%
  );
  border-radius: 5%;
}

.warning {
  padding: 5px;
  background: linear-gradient(
    90deg,
    rgb(219, 177, 86) 40%,
    rgba(235, 9, 9, 0.836) 89%
  );
  border-radius: 5%;
}

.toast-body {
  color: white;
  font-size: 1rem;
  font-weight: 500;
}
</style>
