<template>
  <section class="notfound">
    <div class="notfound__inner">
      <!-- chevrons d'ailes (signature design A) -->
      <svg class="notfound__wings" width="120" height="30" viewBox="0 0 120 30" aria-hidden="true">
        <g fill="#1B9DD9">
          <path d="M0 14h46l-9 4H0z" opacity=".4" />
          <path d="M14 3h46l-9 4H14z" />
          <path d="M7 25h46l-9 4H7z" opacity=".3" />
        </g>
      </svg>

      <div class="notfound__code">{{ $t("notFound.code") }}</div>
      <h1 class="notfound__title">{{ $t("notFound.title") }}</h1>
      <p class="notfound__text">{{ $t("notFound.text") }}</p>

      <router-link to="/" class="notfound__btn">
        {{ $t("notFound.back") }}
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "PageNotFound",
  metaInfo: {
    title: "404",
    meta: [{ vmid: "description", name: "description", content: "Page non trouvée" }],
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
$muted: #5b6b78;
$serif: "Spectral", Georgia, serif;

.notfound {
  position: relative;
  min-height: 64vh;
  display: grid;
  place-items: center;
  padding: 64px 24px;
  background: radial-gradient(120% 120% at 80% -10%, #15406e 0%, $navy 55%, #07223e 100%);
  color: #eaf3fa;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(135deg, rgba(27, 157, 217, 0.06) 0 1px, transparent 1px 26px);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    text-align: center;
    max-width: 460px;
  }
  &__wings {
    margin: 0 auto 20px;
    display: block;
  }
  &__code {
    font-family: $serif;
    font-size: 88px;
    font-weight: 800;
    line-height: 1;
    color: #fff;
    letter-spacing: 0.02em;
  }
  &__title {
    font-family: $serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin: 8px 0 14px;
  }
  &__text {
    font-size: 15px;
    color: #bcd4e6;
    margin-bottom: 28px;
    line-height: 1.6;
  }
  &__btn {
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    padding: 12px 24px;
    border-radius: 8px;
    background: $sky;
    color: #fff;
    text-decoration: none;
    transition: background 0.15s;
    &:hover {
      background: #1689bf;
    }
  }
}
</style>
