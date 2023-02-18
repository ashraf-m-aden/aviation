<template>
  <div>
    <v-card class="mx-auto">
      <v-card-text>
        <div>
          <label for="">Pseudo</label>
          <input type="text" class="form-control w-25" v-model="staff.pseudo" />
          <label for="">Mot de passe</label>
          <input
            type="text"
            class="form-control w-25"
            v-model="staff.password"
          />
          <label for="">Administrateur</label>
          <input
            type="checkbox"
            class="form-control w-25"
            v-model="staff.isAdmin"
          />

          <button class="btn btn-group btn-primary mt-5" @click="postUser">
            Enregistrer
          </button>
          <span v-show="false">{{ myStaff }}</span>
        </div>
        <button
          class="btn btn-group btn-danger mt-5 ml-auto"
          @click="deleteUser"
        >
          Supprimer
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
      staff: [],
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
        return sta._id == this.$route.query.id;
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
    deleteUser() {
      authS.deleteStaff(this.staff).then(() => {
        this.$router.push({ path: "/gestionMedia" });
      });
    },
    getStaff(sta) {
      this.staff = sta;
    },
  },
};
</script>
