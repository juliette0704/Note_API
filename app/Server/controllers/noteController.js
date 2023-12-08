const Note = require('../models/notes.model');
const { User } = require('../models')

exports.shareNote = async (req, res) => {
    try {
        const { noteId, userId } = req.body;

        const note = await Note.findByPk(noteId);
        const user = await User.findByPk(userId);

        if (!note || !user) {
            return res.status(404).send('Note ou utilisateur non trouvé');
        }
        await user.addNote(note);

        res.status(200).send('Note partagée avec succès');
    } catch (error) {
        console.error('Erreur lors du partage de la note:', error);
        res.status(500).send(error.message);
    }
};


exports.createNote = async (req, res) => {
    try {
        const { title, multimedia, content, userId } = req.body;
        const note = await Note.create({ title, content, multimedia  });
        const user = await User.findByPk(userId);
        if (user) {
            await user.addNote(note);
            res.status(201).json(note);
        } else
            res.status(404).send('Utilisateur non trouvé');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserNotes = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, {
            include: [{
                model: Note,
                through: { attributes: [] },
                attributes: ['id', 'title', 'content' , 'multimedia']
            }]
        });

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        res.json(user.Notes);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send(error.message);
    }
};


exports.modifInNote = async (req, res) => {
    try {
        const id = req.params.noteId;
        const { title, content, multimedia  } = req.body;
        const note = await Note.findByPk(id);
        if (note) {
            note.title = title;
            note.content = content;
            note.multimedia = multimedia;
            await note.save();
            res.json(note);
        } else {
            res.status(404).send('Note pas trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteNote = async (req, res) => {
    try {
        const id = req.params.noteId;
        const note = await Note.findByPk(id);
        if (note) {
            await note.destroy();
            res.send('Note supprimée');
        } else
            res.status(404).send('Note non trouvée');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
