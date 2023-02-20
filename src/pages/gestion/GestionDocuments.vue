<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12">
        <h1>Gestion des documents</h1>
      </div>
      <div class="col-12">
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="Documents publiques">Documents publiques</v-tab>
          <v-tab value="Documents en internes">Documents en internes</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="Documents publiques">
            <Public></Public>
          </v-window-item>

          <v-window-item value="Documents en internes">
            <Intern></Intern>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>
</template>

<script>
import Intern from "../gestion/DocumentsIntern.vue";
import Public from "../gestion/DocumentsPublic.vue";
export default {
  data() {
    return {
      tab: null,
    };
  },
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
