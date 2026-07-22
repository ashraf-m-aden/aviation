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
          L'AAC, de par ses attributions, est garante de la supervision de la
          sécurité et de la sûreté de l'aviation civile. À ce titre et
          conformément aux normes et pratiques recommandées de l'Organisation de
          l'Aviation Civile Internationale (OACI), elle se doit de surveiller
          les fournisseurs de services et toute l'industrie aéronautique afin de
          s'assurer que les conditions de délivrance des autorisations,
          licences, certificats et agréments sont maintenues dans le respect des
          règlements aéronautiques en vigueur.
        </p>
        <p>
          La présente politique de surveillance a pour objet de guider les
          activités de surveillance de l'AAC, et ce, en application du Code de
          l'Aviation Civile et des autres textes règlementaires relatifs à la
          supervision de la sécurité et de la sûreté de l'aviation civile.
        </p>
        <p>
          La politique de surveillance continue prend également en compte les
          documents de l'OACI ci-après :
        </p>
        <ul>
          <li>Doc 9734 (Manuel de supervision de la sécurité) ;</li>
          <li>Doc 10047 (Manuel de supervision de la sûreté).</li>
        </ul>
        <p>
          La surveillance continue constitue un des éléments cruciaux du système
          de supervision de la sécurité et de la sûreté institués par l'OACI et
          est intégrée dans les programmes nationaux de sécurité et de sûreté de
          l'aviation civile. Elle présente les fonctions et responsabilités des
          Directions de l'AAC en charge du maintien d'une exigence acceptable
          d'exploitation et de pratiques opérationnelles sûres et sécurisées.
        </p>
        <p>
          Elle sert en outre à évaluer le progrès sur l'amélioration continue du
          niveau de la sécurité et de la sûreté implémenté par les détenteurs de
          Certificat, de Licence ou d'Agrément ainsi que sur l'efficacité des
          mesures prises.
        </p>
        <p>
          La politique de surveillance continue est mise en œuvre pour s'assurer
          de façon proactive que les entités chargées de la sécurité et de la
          sûreté continuent de satisfaire aux exigences établies et opèrent à un
          niveau de sécurité et de sûreté acceptable par l'AAC.
        </p>
        <p>
          Elle s'applique à tout le personnel de l'AAC engagé dans la conduite
          ou la gestion des activités de surveillance continue relative à la
          sécurité et à la sûreté de l'aviation civile à l'égard de l'industrie
          de l'aviation.
        </p>

        <p class="lead">
          Les entités ci-après, sans s'y limiter, sont assujetties à la
          surveillance des Directions techniques de l'AAC :
        </p>
        <ul>
          <li>
            Exploitants d'aéronefs nationaux et étrangers desservant les
            plateformes ;
          </li>
          <li>Exploitants d'aéronefs effectuant des vols commerciaux ;</li>
          <li>
            Exploitants d'aéronefs effectuant des vols d'aviation générale ;
          </li>
          <li>Exploitants d'aérodromes ;</li>
          <li>
            Organismes de maintenance et organismes de maintien de la
            navigabilité ;
          </li>
          <li>Organismes de formation aéronautique ;</li>
          <li>Centre d'expertise médicale du personnel aéronautique ;</li>
          <li>
            Personnel aéronautique détenteur de licence, qualification,
            certificat ou d'autorisation ;
          </li>
          <li>Prestataires de services de sûreté de l'aviation civile ;</li>
          <li>
            Toutes les entités impliquées dans la chaîne de transport des
            marchandises dangereuses ;
          </li>
          <li>Opérateurs postaux ;</li>
          <li>Services de fret ;</li>
          <li>
            Transitaires et expéditeurs intervenant sur les plates-formes
            aéroportuaires ;
          </li>
          <li>Prestataires de services de navigation aérienne ;</li>
          <li>Prestataires de services d'assistance en escale ;</li>
          <li>Prestataires de services carburant et huiles ;</li>
          <li>Prestataires de services de commissariat (catering).</li>
        </ul>
        <p>
          La surveillance continue consiste à évaluer systématiquement la
          capacité et la volonté de l'exploitant à se conformer de manière
          pérenne aux dispositions législatives et réglementaires applicables.
        </p>
        <p>
          La surveillance continue des exploitants est menée de façon ordonnée
          et normalisée pour permettre aux inspecteurs de procéder aux
          vérifications nécessaires. À cette fin, chaque type d'inspection /
          audit comporte des objectifs spécifiques et est généralement réalisé,
          à chaque fois, de la même façon, conformément aux instructions et
          indications.
        </p>
      </article>
    </div>
  </div>
</template>

<script>
import { driveImageUrl } from "@/utils/drive";
import fallbackHero from "@/assets/article.jpeg";

export default {
  name: "PolitiqueDeSupervision",
  computed: {
    heroTitle() {
      return this.$t("pages.supervisionPolicy.title");
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
      title: "Politique de supervision",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Politique de supervision de l'Autorité de l'Aviation Civile de Djibouti",
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
