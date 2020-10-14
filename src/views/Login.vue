<template>
  <div>
    <h1 class="text-center mt-3">Login Page</h1>
    <b-card class="col-3 card-form">
      <b-form @submit.prevent="login">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-1"
            v-model="username"
            type="text"
            required
            placeholder="Username"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
          <!-- // ! Pesan Error -->
          <div class="errors" v-if="pesan">
            <small class="text-danger">{{ pesan }}</small>
          </div>
        </b-form-group>
        <b-form-group class="text-center">
          <b-button
            type="submit"
            class="form-control"
            variant="info"
            size="sm"
            :disabled="loading"
          >
            {{ loading ? "" : "Login" }}
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
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      pesan: null,
    };
  },
  methods: {
    login() {
      this.loading = true;
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then((response) => {
          console.log(response);
          if (response.data) {
            this.pesan = response.data.errorMessage;
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
        .catch((response) => {
          console.log(response);
        });
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