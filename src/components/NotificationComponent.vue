<template>
  <transition name="toast">
    <div v-if="notif" class="toast" :class="success ? 'toast--success' : 'toast--warning'" role="alert" aria-live="assertive">
      <span class="toast__bar"></span>
      <span class="toast__ic">
        <svg v-if="success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
      </span>
      <p class="toast__msg">{{ message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NotificationComponent",
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
$navy: #0a2b4e;
$green: #4a9e3f;
$red: #e0322b;

.toast {
  position: fixed;
  top: 20px;
  inset-inline-end: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 380px;
  padding: 14px 18px 14px 14px;
  background: #fff;
  border: 1px solid #e7eef3;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(10, 43, 78, 0.16);
  overflow: hidden;

  &__bar {
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    bottom: 0;
    width: 4px;
  }
  &__ic {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    flex: none;
  }
  &__msg {
    margin: 0;
    font-size: 13.5px;
    font-weight: 500;
    color: $navy;
    line-height: 1.4;
  }

  &--success {
    .toast__bar { background: $green; }
    .toast__ic { background: rgba(74, 158, 63, 0.12); color: $green; }
  }
  &--warning {
    .toast__bar { background: $red; }
    .toast__ic { background: rgba(224, 50, 43, 0.1); color: $red; }
  }
}

/* animation d'apparition / disparition */
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 520px) {
  .toast {
    inset-inline: 16px;
    min-width: 0;
    max-width: none;
  }
}
</style>
