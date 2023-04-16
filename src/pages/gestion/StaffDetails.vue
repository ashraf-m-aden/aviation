<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title>
        <h2>Modification des informations de l'utilisateur</h2>
      </v-card-title>
      <v-card-text>
        <div>
          <label for="">Pseudo</label>
          <input type="text" class="form-control w-25" v-model="myStaff.email" />
          <label for="">Mot de passe</label>
          <input
            type="text"
            class="form-control w-25"
            v-model="myStaff.password"
          />
          <label for="">Administrateur</label>
          <input
            type="checkbox"
            class="form-control w-25"
            v-model="myStaff.isAdmin"
          />

          <button class="btn btn-group btn-primary mt-5" @click="postUser">
            Enregistrer
          </button>
          <span v-show="false">{{ myStaff }}</span>
        </div>
        <button
          class="btn btn-group btn-danger mt-5 ml-auto"
          @click="deleteUser(myStaff.id)"
        >
          Supprimer
        </button>
        <button
          class="btn btn-group btn-danger mt-5 ml-auto"
          @click="cancel()"
        >
          Annuler
        </button>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import authS from "../../services/auth.service";
export default {

  data() {
    return {

    };
  },
  mounted() {
    this.$store.dispatch("getStaffs");
  },
  computed: {
    staffs() {
      return this.$store.state.user.staff;
    },
    myStaff() {
      const user = this.staffs.filter((sta) => {
        return sta.id == this.$route.query.id;
      });
      this.getStaff(user[0]);
      return user[0];
    },
  },
  methods: {
    postUser() {
      authS.modifyStaff(this.staff).then(() => {
        this.$router.push({ path: "/gestionMedia" });
      });
    },
    deleteUser(id) {
      authS.deleteStaff(id).then(() => {
        this.$router.push({ path: "/gestionMedia" });
      });
    },
    getStaff(sta) {
      this.staff = sta;
    },
    cancel(){
      this.$router.back()
    }
  },
};
</script>
