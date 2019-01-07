<template>
  <section class="vertical">
    <h1>Phone Number Generator</h1>
    <transition name="slide-in" mode="out-in">
      <div :class="messageClass" v-if="message">{{ message }}</div>
    </transition>
    <form @submit.prevent="generateNumbers" class="vertical">
      <label for="total">Enter total number of phone numbers to be generated</label>
      <div>
        <input
          autocomplete="off"
          @focus="clearMessage"
          id="total"
          type="number"
          v-model="input.total"
          required
        >
        <span class="error">{{ input.error }}</span>
      </div>
      <button type="submit">Generate</button>
    </form>
    <div v-show="downloadLink">
      Click
      <a download :href="downloadLink">Here</a> to download the numbers
    </div>
  </section>
</template>

<script>
import axios from "axios";
const API = "http://localhost:3000/api/v1/phone-numbers";
export default {
  name: "app",
  data() {
    return {
      input: { total: "", error: "" },
      downloadLink: "",
      message: "",
      error: false
    };
  },
  methods: {
    generateNumbers() {
      return axios
        .post(API, { total: this.input.total })
        .then(({ data }) => {
          this.downloadLink = API + "/" + data.id;
          this.message = data.message;
          this.input.total = "";
          this.input.error = "";
          this.error = false;
        })
        .catch(error => {
          if (error.response.status < 500) {
            this.input.error = error.response.data.error.message;
          } else {
            this.message = error.response.data.error.message;
            this.error = true;
          }
        });
    },
    clearMessage() {
      this.message = "";
      this.input.error = "";
      this.downloadLink = "";
    },
    messageClass() {
      return this.error ? "message error" : "message error-message";
    }
  }
};
</script>

<style>
:root {
  --text-color: #2c3e50;
  --primary-color: #42b983;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
}

section {
  max-width: 500px;
  height: 100%;
  margin: auto;
  padding: 30px;
}

section * {
  margin-bottom: 20px;
}
h1 {
  text-align: center;
}

.vertical {
  display: flex;
  flex-direction: column;
}

form * {
  color: var(--text-color);
  font-size: 1.1rem;
}

button {
  background: none;
  border: 2px solid currentColor;
  color: var(--primary-color);
  font-weight: bold;
  height: 40px;
  transition: all 0.2s ease-in;
  outline: none;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: var(--primary-color);
  color: white;
}

input {
  width: 100%;
  border: 2px solid var(--primary-color);
  outline: none;
  padding: 10px;
}
input:focus {
  border: 2px dashed var(--primary-color);
}
.error {
  color: red;
  font-size: 0.7rem;
}

.message {
  background-color: aquamarine;
  color: #182413;
  font-weight: bold;
  padding: 2rem;
}

.error-message {
  background-color: red;
}

a {
  color: #42b983;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-in-enter,
.slide-in-leave-to {
  transform: scaleX(0);
}
</style>
