<template>
    <div>
          <b-navbar type="light" variant="light">
                <b-navbar-brand href="/">
      <!-- <b-img src="..\static\FD49.png" class="d-inline-block align-top" alt="Kitten"> </b-img> -->
      <h3>Formulaire Empoissonnement</h3>
    </b-navbar-brand>
    <b-navbar-nav>
    <b-nav-item active :prefetch="true" to="/admin" :disabled="login =false">Administration</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template #button-content>
    <b-icon icon="person-fill" font-scale="1.5"></b-icon>
    </template>
          <b-dropdown-form @submit="submitForm">
            <b-form-group>
              <b-form-input id="input-username" v-model="username" required size="sm"
                    placeholder="nom"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input id="input-password" type="password" v-model="password" size="sm"  placeholder="mdp" c></b-form-input>
            </b-form-group>
            <b-button block variant="light" class="btn-outline-dark my-3" @click="login = true">Accès<b-icon icon="chevron-double-right" animation="cylon" font-scale="1" class="ml-3"></b-icon></b-button>
            </b-dropdown-form>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            username: '',
            password: '',
            loginsuccess: false
          }
        },
        methods: {
              submitForm() {
      // Replace this with your server-side authentication logic
      // For this example, we will use a fake authentication
      if (this.username === 'fripoche' && this.password === 'ripoche') {
        // alert('Login successful!'); // In a real application, redirect to the user dashboard
        this.loginsuccess = true
      } else {
        alert('Invalid credentials. Please try again.');
      }
    }

        },
    }
</script>

<style lang="scss" scoped>

</style>