<template>
  <div class="staff">
    <div class="new">
      <label for="">Nom</label>
      <input type="text" class="form-control" v-model="staff.name" />
      <label for="">Email</label>
      <input type="text" class="form-control" v-model="staff.email" />
      <label for="">Mot de passe</label>
      <input type="text" class="form-control" v-model="staff.password" />
      <label for="">Administrateur</label>
      <input type="checkbox" class="form-control" v-model="staff.isAdmin" />

      <button
        v-if="!loading"
        class="btn btn-group btn-primary m-5"
        @click="postUser"
      >
        Enregistrer
      </button>
      <button
        v-if="loading"
        class="btn disabled small btn-group btn-outline-success"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </button>
      <div class="alert alert-danger" v-if="alert" role="alert">
        {{ errorMessage }}
        Une erreur est survenue. Notez aussi que le mot de passe doit etre au minimum
        de 7 lettres <br />
      </div>
    </div>
    <div class="all">
      <div class="table" data-app>
        <v-container fluid>
          <!-- <v-data-iterator
            :items="staffs"
            v-model:items-per-page="itemsPerPage"
            :page="page"
            hide-default-footer
          > -->
          <table class="table table-striped">
            <thead class="table-dark">
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Est Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(staf, index) in staffs"
                :key="index"
                class="staff-details"
                @click="goStaff(staf)"
              >
                <td>{{ staf.name }}</td>
                <td v-if="staf.isAdmin">Oui</td>
                <td v-if="!staf.isAdmin">Non</td>
              </tr>
            </tbody>
          </table>
          <template v-slot:footer>
            <div class="table-footer">
              <div>
                <span class="mr-4 grey--text">
                  Page {{ page }} / {{ numberOfPages }}
                </span>
                <v-btn
                  small
                  fab
                  dark
                  color="#E6EE9C"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  small
                  fab
                  dark
                  color="#E6EE9C"
                  class="ml-1"
                  @click="nextPage"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import authS from "../../services/auth.service";
export default {
  data() {
    return {
      staff: {
        email: "",
        name: "",
        password: "",
        isAdmin: false,
        enabled: true
      },
      sortDesc: false,
      page: 1,
      sortBy: "name",
      itemsPerPage: 6,
      itemsPerPageArray: [4, 8, 12],
      alert: false,
      loading: false,
      errorMessage: ""
    };
  },
  mounted() {
    this.$store.dispatch("getStaffs");
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.staffs.length / this.itemsPerPage);
    },
    staffs() {
      return this.$store.state.user.staff;
    },
  },
  methods: {
    postUser() {
      this.alert = false;
      this.loading = true;
      authS
        .postStaff(this.staff)
        .then(() => {
          this.$store.dispatch("getStaffs");
          this.staff = {
            pseudo: "",
            password: "",
            isAdmin: false,
          };
          this.loading = false;
        })
        .catch((error) => {
          this.alert = true;
          this.loading = false;
          this.errorMessage = error
        });
    },
    goStaff(staff) {
      this.$router.push({ path: "/staff", query: { id: staff.id } });
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../sass/main.scss";

.staff {
  width: 100% !important;
  display: flex;
  justify-content: space-around;
  height: 100%;

  .new {
    width: 40%;
  }

  &-details {
    cursor: pointer;
    margin-bottom: 2rem;
  }
}
.alert {
  animation: moveInBottom 3s;
}
</style>
