<template>
  <div class="flex h-dvh ">
    <div class="my-auto w-full mx-3 p-3 ">
      <div class="text-2xl text-center font-bold text-black">
      <!-- <Icon name="entypo:login"/> -->
        login
      </div>

      <label class="form-control w-full">
  <div class="label">
    <span class="label-text font-semibold text-black">username</span>
  </div>
  <input v-model="loginForm.username" type="text" placeholder="username" class="input input-bordered w-full bg-white  border-sky-500 placeholder:text-sky-500" />
</label>

<label class="form-control w-full">
  <div class="label">
    <span class="label-text font-semibold text-black">password</span>
  </div>
  <input :class="{'input-error': hasErrors.username}" v-model="loginForm.password" type="password" placeholder="password" class="input input-bordered w-full bg-white border-sky-500 placeholder:text-sky-500" />

  <div class="label">
    <span v-show="hasErrors.username" class="label-text-alt text-error">{{ hasErrors.username }}</span>
  </div>
</label>


      <button @click="login" className="btn btn-block mt-3 bg-sky-500 text-white text-xl font-bold">Login</button>
    </div>

    <dialog ref="alertModal" id="my_modal_3" class="modal">
      <div class="modal-box">

        <h3 class="font-bold text-lg">Alert</h3>
        <p class="py-4">Username or password is invalid</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

  </div>
</template>

<script lang="ts" setup>

import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

let loginForm = reactive({
  username: "",
  password: "",
});

let hasErrors = reactive({
  username: null,
  password: null,
});

const alertModal = ref<HTMLDialogElement>();
const router = useRouter();

async function login() {
  let data = JSON.stringify({
    "usr": loginForm.username,
    "pwd": loginForm.password
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.1.104:8000/api/method/water_api.api.water_login',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
        },
    data: data
  };

  try {
    const response = await axios.request(config);

    // Handle login success, e.g., navigate to another route
    localStorage.setItem("role",response.data.message.roles[0])
    await router.push({path: '/home'});
  } catch (error) {
    console.error(error);
    // Handle login failure, e.g., show error message
    alertModal.value?.showModal();
    hasErrors.username = "Username or password is invalid";
  }
}
</script>

<style></style>