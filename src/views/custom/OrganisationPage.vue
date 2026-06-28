<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__overlay"></div>
      <div class="page-hero__inner">
        <span class="page-hero__eyebrow">À propos de nous</span>
        <h1 class="page-hero__title">Organisation</h1>
      </div>
    </header>

    <div class="page-body">
      <article class="prose">
        <p>
          L'Autorité de l'Aviation Civile est dirigée par un Directeur Général
          qui a sous son autorité un Directeur Général Adjoint, un Service et
          trois Directions :
        </p>
        <ul class="org-list">
          <li>Le Directeur Général Adjoint</li>
          <li>Le Service des Affaires Juridiques</li>
          <li>La Direction Administrative et Financière</li>
          <li>La Direction Normes et Sécurité des vols</li>
          <li>La Direction de la Navigation Aérienne</li>
        </ul>

        <figure class="orga">
          <img src="@/assets/orga.png" alt="Organigramme de l'AAC" />
          <figcaption>
            Organigramme de l'Autorité de l'Aviation Civile
          </figcaption>
        </figure>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrganisationPage",
  metaInfo() {
    return {
      title: "Organisation",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Organisation de l'Autorité de l'Aviation Civile de Djibouti",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$muted: #5b6b78;
$line: #dde6ec;
$ink: #2a3a47;

.page {
  background: #fff;
}
.page-hero {
  position: relative;
  min-height: 240px;
  display: flex;
  align-items: flex-end;
  background: $navy;
  &__bg {
    position: absolute;
    inset: 0;
    background: url("../../assets/article.jpeg") center / cover no-repeat;
  }
  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 43, 78, 0.4) 0%,
      rgba(10, 43, 78, 0.86) 100%
    );
  }
  &__inner {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 26px 24px;
  }
  &__eyebrow {
    color: #bcd4e6;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  &__title {
    font-family: "Spectral", Georgia, serif;
    color: #fff;
    font-size: 34px;
    font-weight: 800;
    margin-top: 6px;
  }
}
.page-body {
  max-width: 900px;
  margin: 0 auto;
  padding: 36px 24px 64px;
}
.prose {
  color: $ink;
  font-size: 15.5px;
  line-height: 1.8;
  p {
    margin-bottom: 1.1em;
    text-align: justify;
  }
}
.org-list {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: grid;
  gap: 10px;
  li {
    background: $sky-soft;
    border-inline-start: 3px solid $sky;
    border-radius: 8px;
    padding: 12px 16px;
    color: $navy;
    font-weight: 600;
    font-size: 14.5px;
  }
}
.orga {
  margin: 0;
  img {
    width: 100%;
    border: 1px solid $line;
    border-radius: 12px;
    display: block;
  }
  figcaption {
    text-align: center;
    color: $muted;
    font-size: 12.5px;
    margin-top: 10px;
    font-style: italic;
  }
}
@media (max-width: 560px) {
  .page-hero {
    min-height: 160px;
  }
  .page-hero__title {
    font-size: 24px;
  }
}
</style>
