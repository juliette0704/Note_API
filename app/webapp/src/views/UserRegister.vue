<template>
    <div id="login">
        <h1>Bienvenue</h1>
        <span class="p-input-icon-left">
            <i class="pi pi-user"></i>
            <InputText type="text" name="username" v-model="input.username" placeholder="Nom d'utilisateur" />
        </span>
        <span class="p-input-icon-left">
            <i class="pi pi-folder"></i>
            <InputText type="text" name="email" v-model="input.email" placeholder="jaipasdidée@gmail.com" />
        </span>
        <span class="p-input-icon-left">
            <i class="pi pi-lock"></i>
            <InputText type="password" name="password" v-model="input.password" placeholder="Mot de passe" />
        </span>
        
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <Button type="button" v-on:click="login()">S'enregister</button>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import axios from 'axios';

export default {
    components: {
        InputText,
        Button
    },
    data() {
        return {
            input: {
                username: '',
                password: ''
            },
            errorMessage:""
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/register', {
                    username: this.input.username,
                    password: this.input.password,
                    email: this.input.email
                });
                if (response.data && response.data.token) {
                    const base64Url = response.data.token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const payload = JSON.parse(window.atob(base64));
                    this.$router.push(`/my-notes/${payload.userId}`);
                }
            } catch (error) {
                console.error('Erreur de sauvagarde:', error);
                this.errorMessage = 'Veuillez réessayé';
            }
        } 
    }
};
</script>

<style>
    .error-message {
        color: red;
    }
</style>
