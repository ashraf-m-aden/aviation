<template>
    <div class="row justify-content-center mt-5">
        <div class="col-sm-12 col-md-5 card p-5 border-info mt-5 mb-5">
            <h4 class="mr-auto ml-auto mb-5">Réinitialisation de mot de passe</h4>
            <div class="form-group">
                <div class="form-group">
                    <label class="form-check-label small font-italic font-weight-bold">Votre addresse email</label>
                    <input id="email" v-model="email" type="text" class="form-control" placeholder="email" />
                </div>

                <div class="form-group d-flex">
                    <button v-if="!loading" class="btn btn-group btn-outline-success" @click="submit()"
                        :disabled="email == ''">
                        Envoyez moi un email de Réinitialisation
                    </button>
                    <button class="btn btn-group btn-outline-success" v-if="loading">
                        Loading...
                    </button>
                </div>

                <router-link to="/login">
                    <h6>Se connecter</h6>
                </router-link>

            </div>
            <span class="text-danger bg-white rounded-pill text-center" v-if="error">{{ errorMessage }}</span>
        </div>
    </div>
</template>
  
<script>
import authService from "../services/auth.service";
export default {
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
    data() {
        return {
            email: "",
            newPassword: "",
            errorMessage: "",
            error: false,
            loading: false,
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            this.error = false;
            var email = this.email;
            var newPassword = this.newPassword;
            try {
                await authService.resetPassword(email).then(async (link) => {
                    this.loading = false;

                    this.$store.dispatch("successNotif", "L'email de réinitialisation a été envoyé.");

                }).catch((error) => {
                    this.loading = false;
                    // this.error = true;
                    // this.errorMessage = error;
                    this.$store.dispatch("warningNotif", error);
                });
            }
            catch (error) {
                this.loading = false;
                // this.error = true;
                // this.errorMessage = error;
                this.$store.dispatch("warningNotif", error);
            }
        },
    },
};
</script>
  