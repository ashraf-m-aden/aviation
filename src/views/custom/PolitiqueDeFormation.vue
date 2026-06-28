<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__overlay"></div>
      <div class="page-hero__inner">
        <span class="page-hero__eyebrow">À propos de nous</span>
        <h1 class="page-hero__title">Politique de formation</h1>
      </div>
    </header>

    <div class="page-body">
      <article class="prose">
        <h2>Politique et engagement du Directeur Général</h2>

        <p>
          Notre capacité de supervision de la sécurité et de la sûreté ne peut
          être effective, efficace et s'améliorer continuellement que grâce à
          l'établissement des conditions optimums de connaissances et
          d'expériences pour l'ensemble du personnel de l'AAC à travers des
          formations initiales (formations de base), spécialisées, en cours
          d'emploi (FCE / OJT) et continues (périodiques ou recyclages), et
          qualifications adéquates.
        </p>
        <p>
          Ces formations planifiées permettent d'avoir un personnel bien formé,
          disposant d'une part d'un niveau de connaissances normalisées, et
          d'autre part d'un niveau de qualifications et d'expériences le plus
          haut possible. Ces compétences acquises permettent d'élaborer et de
          contrôler efficacement l'application de la réglementation nationale en
          vigueur en matière de sécurité, de sûreté, de la facilitation et
          d'environnement dans le domaine de l'aviation civile.
        </p>

        <p class="lead">À cet effet, le Directeur Général s'engage à :</p>
        <ul>
          <li>
            mettre en œuvre un plan de formation, assurer sa gestion pour toutes
            les spécialités de manière à répondre aux normes de l'OACI et aux
            évolutions technologiques du secteur de l'aviation civile ;
          </li>
          <li>
            promouvoir au sein de l'AAC une culture de compétence et
            d'apprentissage essentielle à l'accomplissement de ses missions et
            attributions en tant qu'Autorité nationale en charge de la
            supervision de la sécurité et de la sûreté de l'aviation civile en
            République de Djibouti ;
          </li>
          <li>
            faire de l'AAC une organisation apprenante et d'excellence qui
            investit dans l'apprentissage initial et continu de ses employés ;
          </li>
          <li>
            garantir un plan de formation personnalisé à tous les employés de
            l'Autorité ;
          </li>
          <li>
            trouver des moyens pour financer la formation. Le cas échéant, des
            démarches auprès des organismes externes sont entreprises pour le
            financement de la formation ;
          </li>
          <li>
            augmenter les dépenses consacrées à la formation et au
            perfectionnement du personnel après l'entrée en vigueur de la
            présente politique ;
          </li>
          <li>
            évaluer le maintien des compétences du personnel et des formateurs
            de l'AAC par des contrôles réguliers, des audits externes avec des
            indicateurs quantifiables ;
          </li>
          <li>
            mesurer les progrès du développement de l'AAC en une organisation
            apprenante, vouée à l'apprentissage continu, par le biais
            d'objectifs quantifiables ;
          </li>
          <li>
            planifier, recruter, former et parrainer les jeunes cadres pour
            assurer une gestion continue, efficace et effective de la relève en
            tenant compte des départs à la retraite ;
          </li>
          <li>
            créer des conditions attractives de travail pour maintenir et
            attirer du personnel qualifié et éviter la fuite des cerveaux ou un
            taux de roulement inacceptable.
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolitiqueDeFormation",
  metaInfo() {
    return {
      title: "Politique de formation",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Politique de formation de l'Autorité de l'Aviation Civile de Djibouti",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
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
    font-size: 32px;
    font-weight: 800;
    margin-top: 6px;
  }
}
.page-body {
  max-width: 860px;
  margin: 0 auto;
  padding: 36px 24px 64px;
}
.prose {
  color: $ink;
  font-size: 15.5px;
  line-height: 1.8;
  h2 {
    font-family: "Spectral", Georgia, serif;
    color: $navy;
    font-size: 21px;
    margin: 0 0 18px;
  }
  p {
    margin-bottom: 1.1em;
    text-align: justify;
  }
  .lead {
    font-weight: 600;
    color: $navy;
  }
  ul {
    margin: 0 0 1.3em;
    padding-inline-start: 22px;
    list-style: disc;
  }
  li {
    margin-bottom: 0.55em;
  }
  li::marker {
    color: $sky;
  }
}
@media (max-width: 560px) {
  .page-hero {
    min-height: 160px;
  }
  .page-hero__title {
    font-size: 23px;
  }
}
</style>
