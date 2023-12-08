<template>
    <div id="login">
        <h1>Connexion</h1>
        <div class="form-row">
            <span class="p-input-icon-left">
                <i class="pi pi-user"></i>
                <InputText type="text" name="username" v-model="input.username" placeholder="Nom d'utilisateur" />
            </span>
        </div>
        <div class="form-row">
            <span class="p-input-icon-left">
                <i class="pi pi-lock"></i>
                <InputText type="password" name="password" v-model="input.password" placeholder="Mot de passe" />
            </span>
        </div>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="form-row">
            <Button type="button" v-on:click="login()">Connection</button>
        </div>
        <div class="form-row">
            <router-link to="/register">Pas encore de compte? Inscrivez-vous ici</router-link>
        </div>
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
                const response = await axios.post('http://localhost:4000/login', {
                    username: this.input.username,
                    password: this.input.password
                });
                if (response.data && response.data.token) {
                    const base64Url = response.data.token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const payload = JSON.parse(window.atob(base64));
                    this.$router.push(`/my-notes/${payload.userId}`);
                }
            } catch (error) {
                console.error('Erreur de login:', error);
                this.errorMessage = 'Email ou mot de passe incorrecte';
            }
        } 
    }
};
</script>


<style>
    #login {
        margin: auto;
        width: 300px;
        padding: 20px;
    }

    .form-row {
        margin-bottom: 10px;
    }

    .p-input-icon-left {
        width: 100%;
        display: flex;
        align-items: center;
    }


    .error-message {
        color: red;
        margin-bottom: 10px;
    }
</style>