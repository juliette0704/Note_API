<template>
    <div>
        <h1>Mes Notes</h1>
        <div v-if="notes.length > 0">
            <h2>Liste des Notes</h2>
            <ul v-for="note in notes" :key="note.id">
                {{ note.title }} : {{ note.content }} : 
                <div v-if="note.multimedia">
                    <img :src="note.multimedia" alt="Contenu multimédia" />
                </div>
                <button @click="editNote(note)">Éditer</button>
                <button @click="deleteNote(note)">Supprimer</button>
                <button @click="shareNote(note)">Partager</button>
            </ul>
        </div>
        <div>
            <h2>{{ editing ? 'Modifier la Note' : 'Créer une Nouvelle Note' }}</h2>
            <form @submit.prevent="saveNote">
                <div class="form-row">
                    <label for="title">Titre:</label>
                    <input type="text" id="title" v-model="noteForm.title" />
                </div>
                <div class="form-row">
                    <label for="content">Contenu:</label>
                    <textarea id="content" v-model="noteForm.content"></textarea>
                </div>
                <div class="form-row">
                    <label for="multimedia">Contenu Multimédia (URL) :</label>
                    <input type="text" id="multimedia" v-model="noteForm.multimedia" />
                </div>
                <div class="form-row">
                    <button type="submit">{{ editing ? 'Mettre à Jour' : 'Créer' }}</button>
                    <button type="button" @click="cancelEdit" v-if="editing">Annuler</button>
                </div>
            </form>
        </div>
        <div v-if="sharing">
            <h3>Partager la Note</h3>
            <form @submit.prevent="sendShare">
                <div class="form-row">
                    <label for="shareWith">Partager Avec (ID Utilisateur) :</label>
                    <input type="text" id="shareWith" v-model="shareForm.userId" />
                </div>
                <div class="form-row">
                    <button type="submit">Partager</button>
                    <button type="button" @click="cancelShare">Annuler</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            notes: [],
            noteForm: {
                title: '',
                content: '',
            },
            editing: false,
            editedNote: null,
            sharing: false,
            sharedNote: null,
            shareForm: {
                userId: '',
                noteId: ''
            },
        };
    },
    methods: {
        cancelShare() {
            this.sharing = false;
            this.sharedNote = null;
            this.shareForm = { userId: '', noteId: '' };
        },

        async sendShare() {
            const shareData = {
                noteId: this.sharedNote.id,
                userId: this.shareForm.userId
            };
            try {
                await axios.post('http://localhost:3000/share-note', shareData);
                alert('J\'ai partagé!');
            } catch (error) {
                console.error('Mauvais numéro d\'utilisateur...', error);
            }
            this.cancelShare();
        },
        async shareNote(note) {
            this.sharing = true;
            this.sharedNote = note;
            this.shareForm.noteId = note.id;
        },
        async loadNotes() {
            const userId = this.$route.params.userId;
            try {
                const response = await axios.get(`http://localhost:3000/notes/${userId}`);
                this.notes = response.data;
                console.log(response.data)
            } catch (error) {
                console.error('Erreur des notes aux chargement:', error);
            }
        },
        async createNote() {
            const userId = this.$route.params.userId;
            const noteData = {
                title: this.noteForm.title,
                content: this.noteForm.content,
                multimedia: this.noteForm.multimedia,
                userId: userId
            };
            try {
                const response = await axios.post('http://localhost:3000/new-note', noteData);
                this.notes.push(response.data);
                this.clearForm();
            } catch (error) {
                console.error('Erreur de création:', error);
            }
        },
        async updateNote() {
            const updatedNoteData = {
                title: this.noteForm.title,
                content: this.noteForm.content,
                multimedia: this.noteForm.multimedia
            };
            try {
                await axios.put(`http://localhost:3000/modif-note/${this.editedNote.id}`, updatedNoteData);
                window.location.reload();
            } catch (error) {
                console.error('Erreur de maj de note:', error);
            }
        },
        async deleteNote(noteToDelete) {
            try {
                await axios.post(`http://localhost:3000/delete-note/${noteToDelete.id}`);
                const indexToDelete = this.notes.findIndex((note) => note.id === noteToDelete.id);
                if (indexToDelete !== -1) {
                    this.notes.splice(indexToDelete, 1);
                }
            } catch (error) {
                console.error('Erreur de delete des notes:', error);
            }
        },
        editNote(noteToEdit) {
            this.editing = true;
            this.editedNote = noteToEdit;
            this.noteForm.title = noteToEdit.title;
            this.noteForm.content = noteToEdit.content;
        },
        cancelEdit() {
            this.editing = false;
            this.editedNote = null;
            this.clearForm();
        },
        clearForm() {
            this.noteForm.title = '';
            this.noteForm.content = '';
        },
        saveNote() {
            if (this.editing) {
                this.updateNote();
            } else {
                this.createNote();
            }
            this.clearForm();
            this.editing = false;
            this.editedNote = null;
        },
    },
    mounted() {
        this.loadNotes();
    },
};
</script>

<style>
    div {
        margin: 10px;
    }
    h1, h2, h3 {
        color: #333;
    }
    form {
        display: table;
        border-collapse: separate;
        border-spacing: 10px;
        margin: 0 auto;
    }
    .form-row {
        display: table-row;
    }
    label, input, textarea, button {
        display: table-cell;
        margin-bottom: 10px;
        vertical-align: middle;
    }
    label {
        padding-right: 10px;
        text-align: right;
        vertical-align: top;
    }
    input[type="text"], textarea {
        width: 100%;
        /* padding: 5px; */
    }
    textarea {
        height: 100px;
    }
    button {
        margin-top: 10px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    img {
        max-width: 100px;
        max-height: 100px;
        margin: 10px 0;
    }
    button {
        margin-right: 10px;
    }
</style>
