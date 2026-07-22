<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-hero__bg" :style="heroBgStyle"></div>
      <div class="page-hero__overlay"></div>
      <div class="page-hero__inner">
        <span class="page-hero__eyebrow">{{ parentLabel }}</span>
        <h1 class="page-hero__title">{{ heroTitle }}</h1>
      </div>
    </header>

    <div class="page-body">
      <article class="prose">
        <p>
          L'Autorité de l'Aviation Civile (AAC), créée conformément à la Loi
          n°108/AN/10/6<sup>ème</sup>L du 10 janvier 2011, est un établissement
          public administratif, rattaché au Ministère de l'Équipement et des
          Transports en République de Djibouti. Elle est chargée de la mise en
          œuvre de la politique aéronautique nationale, notamment de la
          règlementation et de la supervision de l'aviation civile, en matière
          de sécurité, de sûreté, de la protection de l'environnement et
          d'économie. Son objectif est de veiller au développement sûr, ordonné
          et efficient de l'aviation civile en République de Djibouti.
        </p>
        <p>
          Cette création a répondu au souci du gouvernement Djiboutien de mettre
          son aviation civile au standard de l'Organisation de l'Aviation Civile
          Internationale (OACI) qui préconise la cession de la gestion de
          l'aviation civile à des organismes autonomes à l'image de ce qui se
          fait déjà dans plusieurs pays environnants.
        </p>

        <p class="lead">
          À cet effet, l'Autorité de l'Aviation Civile (AAC) est chargée :
        </p>
        <ul>
          <li>
            d'assister le Gouvernement dans la définition et la conduite de la
            politique aéronautique nationale en tenant compte des besoins du
            pays mais aussi des normes et des conventions internationales ;
          </li>
          <li>
            d'exécuter la politique de l'État en matière d'aviation civile ;
          </li>
          <li>
            d'élaborer et de gérer le programme national de sécurité et le
            programme national de sûreté de l'aviation civile, en collaboration
            et en coordination avec les parties concernées ;
          </li>
          <li>
            d'établir la réglementation, en suivre l'exécution et l'évolution en
            élaborant les amendements appropriés ; comme responsable du contrôle
            et de la coordination de l'application de la réglementation
            nationale et des conventions internationales ratifiées par la
            République de Djibouti quant à la sécurité aérienne et à la sûreté
            de l'aviation civile et de l'efficacité du transport aérien ;
          </li>
          <li>
            de définir des doctrines concernant le recrutement, la formation et
            l'emploi des personnels techniques, chargés d'assurer la régularité
            et la sécurité du trafic aérien, d'organiser et d'assumer la
            formation aéronautique ;
          </li>
          <li>
            d'assurer la supervision et la certification des organes et du
            personnel aéronautique de la navigation aérienne, notamment :
            <ul>
              <li>des exploitants aériens,</li>
              <li>des organismes de sûreté et de sécurité aérienne,</li>
              <li>
                des organismes de gestion des espaces aériens et des aéroports,
              </li>
              <li>des organismes de maintenance des avions,</li>
              <li>des aéronefs,</li>
              <li>
                des personnels techniques d'entretien et des navigants aériens.
              </li>
            </ul>
          </li>
          <li>de superviser la fourniture de l'assistance météorologique ;</li>
          <li>
            de superviser la fourniture de service de la navigation aérienne ;
          </li>
          <li>
            de participer à tous travaux et négociations à caractère
            international concernant l'aviation civile, d'assister et conseiller
            le Gouvernement dans la négociation des accords internationaux.
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
import { driveImageUrl } from "@/utils/drive";
import fallbackHero from "@/assets/article.jpeg";

export default {
  name: "PresentationPage",
  computed: {
    heroTitle() {
      return this.$t("pages.presentation.title");
    },
    parentLabel() {
      return this.$t("pages.about.eyebrow");
    },
    headerImage() {
      return this.$store.getters.getHeaderImage;
    },
    heroBgUrl() {
      const h = this.headerImage;
      if (h?.driveId) return driveImageUrl(h.driveId, 1200);
      if (h?.url) return h.url;
      return fallbackHero;
    },
    heroBgStyle() {
      return { backgroundImage: `url(${this.heroBgUrl})` };
    },
  },
  metaInfo() {
    return {
      title: "Présentation",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Présentation de l'Autorité de l'Aviation Civile de Djibouti",
        },
      ],
    };
  },
  created() {
    if (!this.$store.state.media.headerImage) {
      this.$store.dispatch("getHeaderImage");
    }
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
    background-size: cover;
    background-position: center;
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
  max-width: 860px;
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
    margin-bottom: 0.5em;
  }
  li::marker {
    color: $sky;
  }
  ul ul {
    margin: 0.5em 0 0.8em;
    list-style: circle;
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
