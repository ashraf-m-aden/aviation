<template>
  <div class="lang-switcher" role="group" aria-label="Choix de la langue">
    <button
      v-for="l in locales"
      :key="l.code"
      type="button"
      class="lang-switcher__btn"
      :class="{ 'is-active': l.code === current }"
      :aria-pressed="l.code === current"
      @click="choose(l.code)"
    >
      {{ l.short }}
    </button>
  </div>
</template>

<script>
import { SUPPORTED_LOCALES, setLocale } from "@/i18n";

export default {
  name: "LanguageSwitcher",
  data() {
    return { locales: SUPPORTED_LOCALES };
  },
  computed: {
    current() {
      return this.$i18n.locale;
    },
  },
  methods: {
    choose(code) {
      // on passe le store pour garder l'ancien flag `lang` synchronisé
      setLocale(code, this.$store);
    },
  },
};
</script>

<style lang="scss" scoped>
.lang-switcher {
  display: inline-flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 2px;

  &__btn {
    font: inherit;
    font-size: 12px;
    line-height: 1;
    color: #bcd4e6;
    background: none;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover {
      color: #fff;
    }
    &.is-active {
      background: #fff;
      color: #0a2b4e;
      font-weight: 700;
    }
  }
}
</style>
