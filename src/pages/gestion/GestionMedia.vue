<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12">
        <v-tabs v-model="tab">
          <v-tab value="Bannieres">Bannieres </v-tab>
          <v-tab value="Articles">Articles </v-tab>
          <v-tab value="Staffs">Staffs </v-tab>
        </v-tabs>

        <v-card>
          <v-window v-model="tab">
            <v-window-item value="Bannieres"  >
              <Banner></Banner>
            </v-window-item>
            <v-window-item value="Articles">
              <News></News>
            </v-window-item>
            <v-window-item value="Staffs">
              <Staff></Staff>
            </v-window-item>
          </v-window>
        </v-card>
        <!-- <md-tabs>
          <md-tab md-label="Bannieres">
            <Banner></Banner>
          </md-tab>

          <md-tab md-label="Articles">
            <News></News>
          </md-tab>
          <md-tab md-label="Staffs">
            <Staff></Staff>
          </md-tab>
        </md-tabs> -->
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "./BannerPage.vue";
import News from "./NewsPage.vue";
import Staff from "./StaffPage.vue";
export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    Banner,
    News,
    Staff,
  },
};
</script>
