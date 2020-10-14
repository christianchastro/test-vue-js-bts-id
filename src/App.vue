<template>
  <div id="app">
    <div class="wrapper">
      <div id="page-container">
        <Navbar />
        <div id="content-wrap">
          <main>
            <router-view></router-view>
          </main>
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Footer,
    Navbar,
  },
};
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
  border-radius: 0px;
}
body {
  background-color: rgb(243, 249, 215) !important;
}
</style>
