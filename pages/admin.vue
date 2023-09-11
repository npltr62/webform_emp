<template>
  <div>
    
 <b-form @submit="submitForm" class="d-flex" v-if="!loginsuccess">
    <b-form-group id="username" label="Username:" label-for="input-username" class="mb-2 mr-2">
      <b-form-input id="input-username" v-model="username" required></b-form-input>
    </b-form-group>

    <b-form-group id="password" label="Password:" label-for="input-password" class="mb-2 mr-2">
      <b-form-input id="input-password" type="password" v-model="password" required></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary" class="align-self-end">Login</b-button>
  </b-form>
  <b-row  v-if="loginsuccess">
    <b-col cols=4>
      <h3>Formulaires enregistrés</h3>
      <Admin/>
    </b-col>
    <b-col cols=8>
      <h3>A modifier</h3>
      <transition name='fade'>
      <Form/>
      </transition>
    </b-col>
  </b-row>
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
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>