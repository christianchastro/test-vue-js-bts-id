<template>
  <header>
    <b-navbar class="navbar">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link
            to="/login"
            class="nav-link navbar-menu-item"
            v-if="!authUser"
            >Login</router-link
          >
          <router-link
            to="/register"
            class="nav-link navbar-menu-item"
            v-if="!authUser"
            >Register</router-link
          >
          <b-nav-item-dropdown right v-else>
            <template v-slot:button-content>
              <em>Hey {{ authUser.username }}</em>
            </template>
            <b-dropdown-item href="#" @click="logout()"
              >Log Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<script>
export default {
  computed: {
    authUser() {
      return this.$store.getters.pengguna;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: rgb(182, 199, 0);
  min-height: 56px;
  max-height: 56px;
}
.navbar-menu-item {
  color: rgb(228, 243, 118) !important;
}
.navbar-menu-item:hover {
  color: rgb(228, 243, 188) !important;
}
header {
  width: 100%;
  padding: 0px;
  background-color: rgb(182, 199, 0);
}
.toggle-button {
  padding: 0px 0px 0px 0px;
  font-size: 40px;
  color: rgb(228, 243, 118);
}
.toggle-button:hover {
  cursor: pointer;
  color: rgb(228, 243, 188);
}
</style>