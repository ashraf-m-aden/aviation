<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12">
        <h1>Gestion des documents</h1>
      </div>
      <div class="col-12">
        <md-tabs>
          <md-tab id="tab-Intern" md-label="Documents publiques">
            <Public></Public>
          </md-tab>
          <md-tab id="tab-Public" md-label="Documents en internes">
            <Intern></Intern>
          </md-tab>
        </md-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Intern from "../gestion/DocumentsIntern.vue";
import Public from "../gestion/DocumentsPublic.vue";
export default {   

  computed: {
    isAdmin() {
      return this.$store.state.user.user.isAdmin;
    },
  },
  metaInfo() {
    // if no subcomponents specify a metaInfo.title, this title will be used
    return {
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
        {
          name: "googlebot",
          content: "noindex",
        },
      ],
    };
  },
  components: {
    Intern,
    Public,
  },
};
</script>
