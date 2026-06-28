<template>
  <div class="staff">
    <div class="staff__head">
      <div>
        <h2>Personnel</h2>
        <p>Gérer les comptes des agents et leurs droits.</p>
      </div>
      <button class="btn-add" @click="openAdd">+ Ajouter un agent</button>
    </div>

    <div class="staff__table" v-if="staffs.length">
      <div class="trow thead">
        <span>Nom</span><span>E-mail</span><span>Rôle</span
        ><span class="ta-end">Actions</span>
      </div>
      <div class="trow" v-for="s in staffs" :key="s.id">
        <span class="name">{{ s.name || "—" }}</span>
        <span class="email">{{ s.email }}</span>
        <span>
          <span
            class="badge"
            :class="s.isAdmin ? 'badge--admin' : 'badge--agent'"
          >
            {{ s.isAdmin ? "Administrateur" : "Agent" }}
          </span>
        </span>
        <span class="actions">
          <button class="ico" @click="openEdit(s)" title="Modifier">✎</button>
          <button class="ico del" @click="remove(s)" title="Désactiver">
            🗑
          </button>
        </span>
      </div>
    </div>
    <p v-else class="staff__empty">Aucun agent enregistré pour le moment.</p>

    <!-- Modale ajout / édition (téléportée dans <body> pour être toujours visible) -->
    <Teleport to="body">
      <div class="overlay" v-if="modal.open" @click.self="close">
        <div class="dlg">
          <div class="dlg__head">
            <h4>{{ modal.edit ? "Modifier l'agent" : "Nouvel agent" }}</h4>
            <button class="dlg__x" @click="close">✕</button>
          </div>
          <div class="dlg__body">
            <div class="fld">
              <label>Nom</label>
              <input
                class="inp"
                type="text"
                v-model="form.name"
                placeholder="Nom complet"
              />
            </div>
            <div class="fld">
              <label>E-mail</label>
              <input
                class="inp"
                type="email"
                v-model="form.email"
                :disabled="modal.edit"
                placeholder="agent@aac.dj"
              />
              <p v-if="modal.edit" class="note">
                L'e-mail ne peut pas être modifié (lié au compte).
              </p>
            </div>
            <div class="fld" v-if="!modal.edit">
              <label>Mot de passe</label>
              <input
                class="inp"
                type="text"
                v-model="form.password"
                placeholder="Mot de passe initial"
              />
            </div>
            <label class="check">
              <input type="checkbox" v-model="form.isAdmin" />
              <span>Administrateur (accès complet)</span>
            </label>

            <div v-if="modal.edit" class="reset">
              <button class="btn-reset" @click="sendReset" :disabled="busy">
                Envoyer un lien de réinitialisation du mot de passe
              </button>
            </div>
          </div>
          <div class="dlg__foot">
            <button class="mbtn cancel" @click="close">Annuler</button>
            <button
              class="mbtn save"
              :disabled="!canSave || busy"
              @click="save"
            >
              {{ busy ? "…" : "Enregistrer" }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import authS from "@/services/auth.service";

function emptyForm() {
  return { id: null, name: "", email: "", password: "", isAdmin: false };
}

export default {
  name: "StaffDetails",
  metaInfo() {
    return { meta: [{ name: "robots", content: "noindex" }] };
  },
  data() {
    return {
      modal: { open: false, edit: false },
      form: emptyForm(),
      busy: false,
    };
  },
  computed: {
    staffs() {
      return this.$store.state.user.staff || [];
    },
    canSave() {
      if (!this.form.name.trim()) return false;
      if (this.modal.edit) return true;
      return Boolean(this.form.email.trim() && this.form.password.trim());
    },
  },
  methods: {
    openAdd() {
      this.form = emptyForm();
      this.modal = { open: true, edit: false };
    },
    openEdit(staff) {
      this.form = {
        id: staff.id,
        name: staff.name || "",
        email: staff.email || "",
        password: "",
        isAdmin: Boolean(staff.isAdmin),
      };
      this.modal = { open: true, edit: true };
    },
    close() {
      this.modal = { open: false, edit: false };
    },
    async save() {
      this.busy = true;
      try {
        if (this.modal.edit) {
          await authS.modifyStaff({
            id: this.form.id,
            name: this.form.name,
            isAdmin: this.form.isAdmin,
          });
          this.$store.dispatch("successNotif", "Agent mis à jour.");
        } else {
          await authS.postStaff({
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            isAdmin: this.form.isAdmin,
          });
          this.$store.dispatch("successNotif", "Agent créé.");
        }
        await this.$store.dispatch("getStaffs");
        this.close();
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      } finally {
        this.busy = false;
      }
    },
    async remove(staff) {
      if (
        !confirm(`Désactiver le compte de « ${staff.name || staff.email} » ?`)
      )
        return;
      try {
        await authS.deleteStaff(staff.id);
        this.$store.dispatch("successNotif", "Agent désactivé.");
        await this.$store.dispatch("getStaffs");
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      }
    },
    async sendReset() {
      this.busy = true;
      try {
        await authS.resetPassword(this.form.email);
        this.$store.dispatch(
          "successNotif",
          "Lien de réinitialisation envoyé.",
        );
      } catch (e) {
        this.$store.dispatch("warningNotif", e.message || "Échec de l'envoi.");
      } finally {
        this.busy = false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("getStaffs");
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$green: #4a9e3f;
$red: #e0322b;
$muted: #5b6b78;
$line: #dde6ec;

.staff {
  max-width: 960px;
  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
    h2 {
      font-size: 22px;
      color: $navy;
      font-family: "Spectral", Georgia, serif;
    }
    p {
      font-size: 13px;
      color: $muted;
    }
  }
  &__empty {
    color: $muted;
    font-size: 14px;
  }
  &__table {
    background: #fff;
    border: 1px solid $line;
    border-radius: 12px;
    overflow: hidden;
  }
}
.btn-add {
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 9px;
  padding: 10px 18px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: $navy-700;
  }
}
.trow {
  display: grid;
  grid-template-columns: 1.2fr 1.6fr 1fr 0.8fr;
  gap: 12px;
  align-items: center;
  padding: 13px 18px;
  border-bottom: 1px solid $line;
  &:last-child {
    border-bottom: none;
  }
  &.thead {
    background: #f4f7f9;
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: $muted;
  }
}
.name {
  font-weight: 600;
  color: $navy;
}
.email {
  color: $muted;
  font-size: 13.5px;
}
.ta-end {
  text-align: end;
}
.actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}
.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  &--admin {
    background: $sky-soft;
    color: $sky;
  }
  &--agent {
    background: #eef4ee;
    color: $green;
  }
}
.ico {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: $muted;
  &:hover {
    color: $navy;
    border-color: #b9cde0;
  }
  &.del:hover {
    color: #fff;
    background: $red;
    border-color: $red;
  }
}

/* Modale */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 20, 35, 0.55);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 20px;
}
.dlg {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid $line;
    h4 {
      font-size: 18px;
      color: $navy;
    }
  }
  &__x {
    border: none;
    background: none;
    cursor: pointer;
    color: $muted;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    &:hover {
      background: #f4f7f9;
      color: $red;
    }
  }
  &__body {
    padding: 22px;
  }
  &__foot {
    display: flex;
    justify-content: flex-end;
    gap: 9px;
    padding: 15px 22px;
    border-top: 1px solid $line;
    background: #fafcfd;
  }
}
.fld {
  margin-bottom: 15px;
  label {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 7px;
  }
}
.inp {
  width: 100%;
  padding: 10px 13px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13.5px;
  outline: none;
  &:focus {
    border-color: $sky;
  }
  &:disabled {
    background: #f4f7f9;
    color: $muted;
  }
}
.note {
  font-size: 11.5px;
  color: $muted;
  margin-top: 5px;
}
.check {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13.5px;
  color: $navy;
  cursor: pointer;
  input {
    width: 16px;
    height: 16px;
  }
}
.reset {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid $line;
}
.btn-reset {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: $sky;
  background: $sky-soft;
  border: none;
  border-radius: 8px;
  padding: 9px 14px;
  cursor: pointer;
  &:hover {
    background: #d8eefa;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
.mbtn {
  padding: 10px 20px;
  border-radius: 9px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  &.cancel {
    background: #fff;
    border-color: $line;
    color: #16242f;
  }
  &.save {
    background: $navy;
    color: #fff;
    &:hover {
      background: $navy-700;
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}

@media (max-width: 720px) {
  .trow {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .trow.thead {
    display: none;
  }
  .actions {
    justify-content: flex-start;
  }
}
</style>
