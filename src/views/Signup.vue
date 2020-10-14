<template>
  <div>
    <h1 class="text-center mt-3">Register Page</h1>
    <b-card class="col-3 card-form">
      <b-form @submit.prevent="signup">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-1"
            v-model="emailAddress"
            type="email"
            required
            placeholder="Email"
          ></b-form-input>
          <!-- <div class="errors" v-if="!$v.emailAddress">
            <small class="text-danger" v-if="!$v.emailAddress"
              >Alamat Email Dibutuhkan</small
            >
            <small class="text-danger" v-else-if="!$v.emailAddress.email"
              >Alamat Email Tidak Valid</small
            >
          </div> -->
        </b-form-group>
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-2"
            v-model="username"
            type="text"
            required
            placeholder="Username"
          ></b-form-input>
          <!-- <div class="errors" v-if="!$v.username.required">
            <small class="text-danger">Username dibutuhkan</small>
          </div> -->
        </b-form-group>
        <b-form-group id="input-group-3">
          <b-form-input
            id="input-3"
            v-model="password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
          <!-- <div class="errors" v-if="!$v.password.required">
            <small class="text-danger">Password dibutuhkan</small>
          </div> -->
        </b-form-group>
        <b-form-group class="text-center">
          <b-button
            type="submit"
            class="form-control"
            variant="info"
            size="sm"
            :disabled="loading"
          >
            {{ loading ? "" : "Register" }}
            <ring-loader
              class="loading-page"
              color="white"
              :size="25"
              v-if="loading"
            />
          </b-button>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      emailAddress: "",
      username: "",
      password: "",
      loading: false,
      pesan: null,
    };
  },
  validations: {
    form: {
      emailAddress: { required, email },
      username: { required },
      password: { required },
    },
  },
  methods: {
    signup() {
      this.loading = true;
      //   this.$v.$touch();
      //   if (this.$v.$invalid) {
      //     this.loading = false;
      //   } else {
      let email = this.emailAddress;
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("signup", { email, password, username })
        .then((response) => {
          if (response.data.statusCode == 401) {
            this.pesan = response.data.errorMessage;
            this.loading = false;
          } else if (response.data.statusCode == 200) {
            this.loading = false;
          }
        })
        .catch((response) => {
          console.log(response);
        });
      //   }
    },
  },
};
</script>
<style scoped>
.card-form {
  border: 5px solid black;
  background-color: rgba(255, 255, 255, 0);
  margin: auto;
  margin-top: 25vh;
  width: 60%;
}

.btn-form {
  padding: 4px 20px;
  font-size: 15px;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  background-color: rgb(17, 122, 139);
  border: none;
  text-align: center;
}

.btn-form:disabled,
.btn-form:disabled:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(17, 122, 139);
  cursor: default;
}

.btn-form:hover {
  font-size: 15px;
  color: rgb(255, 255, 255);
  background-color: rgb(20, 145, 163);
  cursor: pointer;
}

/* // ! CSS Loading Page */
.loading-page {
  margin: auto;
}
.loading-text {
  color: rgb(32, 165, 6);
}
</style>