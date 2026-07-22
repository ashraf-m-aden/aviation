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
        <aside class="director">
          <img
            class="director__photo"
            src="@/assets/DG.jpg"
            alt="Daoud Ali Abdou"
          />
          <div class="director__id">
            <b>Daoud Ali Abdou</b>
            <span
              >Directeur de l'Autorité de l'Aviation Civile de Djibouti</span
            >
          </div>
        </aside>

        <p>
          La barre des 4 milliards de passagers transportés dans le monde a été
          atteinte pour la première fois en 2017, soit 127 passagers qui
          prennent un avion chaque seconde. Face à la croissance exponentielle
          du transport aérien considéré comme le mode de transport le plus sûr
          au monde, les États doivent mettre en place une législation
          aéronautique de base et des règlements aéronautiques avec des
          procédures qui en découlent les plus exhaustives possible afin
          d'assurer la sécurité et la sûreté de l'aviation civile.
        </p>
        <p>
          À Djibouti, l'Autorité de l'Aviation Civile (AAC) est chargée de la
          mise en œuvre de la politique aéronautique nationale, notamment de la
          règlementation et du contrôle de l'aviation civile, en matière de
          sécurité et de sûreté. Son objectif est de veiller à une utilisation
          sûre et ordonnée de l'aviation civile en République de Djibouti.
        </p>
        <p>
          C'est dans cette optique que l'AAC a mis en place un système national
          d'aviation civile viable et efficient afin de maintenir un haut niveau
          de sécurité et de sûreté du transport aérien qui constitue la
          préoccupation majeure de cette institution. L'AAC a mis en place la
          règlementation aéronautique nationale et assure la surveillance de
          l'ensemble de l'industrie aéronautique (opérateurs, personnels
          navigants, contrôleurs aériens, industriels, etc.).
        </p>
        <p>
          Pour atteindre ses objectifs et ses missions liés à la supervision de
          la sécurité et de la sûreté de l'aviation civile, l'AAC s'est dotée de
          moyens humains et financiers en adéquation avec ses activités. Elle
          s'est dotée aujourd'hui d'un arsenal juridique en phase avec les
          normes et pratiques recommandées de l'Organisation de l'Aviation
          Civile Internationale (OACI). Ainsi, elle est régie par le Code de
          l'Aviation Civile renforcé par la règlementation aéronautique de
          Djibouti (RAD) et des procédures sur lesquelles sont réalisées toutes
          les activités au quotidien.
        </p>
        <p>
          Dans la droite lignée de ses objectifs, l'AAC a donné une priorité au
          recrutement de jeunes cadres et a entrepris un vaste programme de
          formation de son personnel technique avec la définition de plans de
          formation qui permet de savoir le profil, le niveau et l'évolution
          future du personnel de l'AAC et même de prévoir des éventuelles
          nécessités de recrutements.
        </p>
        <p>
          Afin d'assurer de manière continue la supervision de la sécurité et de
          la sûreté, l'AAC a mis en place un calendrier programmé d'audit,
          d'inspections de son industrie mais également fixé un nombre important
          d'inspections inopinées des exploitants nationaux et étrangers
          présents sur notre plateforme pour apprécier si le travail est réalisé
          tel que dicté par la règlementation nationale.
        </p>
        <p>
          Le secteur du transport aérien étant très concurrentiel, l'AAC traite
          aussi de questions d'ordre économique et social en assurant également
          des fonctions de régulateur du transport aérien. Elle se retrouve
          ainsi être l'interlocuteur privilégié des compagnies aériennes et des
          aéroports.
        </p>
        <p>
          Ce site web va permettre de faire connaître nos missions, de faciliter
          l'accès à la règlementation à l'industrie et aux particuliers qui
          souhaitent connaître les pré-requis pour obtenir des privilèges liés à
          la certification ou à la délivrance des licences et même initier les
          plus jeunes au secteur du transport aérien.
        </p>
        <p class="signoff">
          Je vous souhaite une bonne navigation sur notre page !
        </p>
      </article>
    </div>
  </div>
</template>

<script>
import { driveImageUrl } from "@/utils/drive";
import fallbackHero from "@/assets/article.jpeg";

export default {
  name: "MotDuDirecteur",
  metaInfo() {
    return {
      title: "Mot du directeur",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Mot du directeur de l'Autorité de l'Aviation Civile de Djibouti, M. Daoud Ali Abdou.",
        },
      ],
    };
  },
  computed: {
    heroTitle() {
      return this.$t("pages.directorWord.title");
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
  max-width: 880px;
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
  .signoff {
    font-style: italic;
    color: $navy;
    font-weight: 600;
  }
}
.director {
  float: right;
  width: 240px;
  margin: 4px 0 18px 24px;
  background: #fff;
  border: 1px solid $line;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(10, 43, 78, 0.1);
  &__photo {
    width: 100%;
    height: 270px;
    object-fit: cover;
    display: block;
  }
  &__id {
    padding: 13px 15px;
    border-top: 3px solid $sky;
  }
  &__id b {
    display: block;
    color: $navy;
    font-size: 15px;
  }
  &__id span {
    color: $muted;
    font-size: 12.5px;
    line-height: 1.35;
    display: block;
    margin-top: 3px;
  }
}
@media (max-width: 620px) {
  .director {
    float: none;
    width: 100%;
    margin: 0 0 20px;
  }
  .director__photo {
    height: 320px;
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
