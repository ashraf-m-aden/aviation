<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-4">
        <router-link
          to="/Textes-reglementaires/Reglementation aeronautique de Djibouti"
        >
          <div class="card text-left">
            <img class="card-img-top" src="../../assets/safety.png" alt="" />
            <div class="card-body">
              <h4 class="card-title">
                Réglementation aéronautique de Djibouti
              </h4>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-md-4">
        <router-link to="/Textes-reglementaires/Arretes">
          <div class="card text-left">
            <img class="card-img-top" src="../../assets/safety.png" alt="" />
            <div class="card-body">
              <h4 class="card-title">Arretés</h4>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-md-4">
        <router-link to="/Textes-reglementaires/Decrets">
          <div class="card text-left">
            <img class="card-img-top" src="../../assets/safety.png" alt="" />
            <div class="card-body">
              <h4 class="card-title">Decréts</h4>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-img-top {
  width: 10rem;
}
</style>
