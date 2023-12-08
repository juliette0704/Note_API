const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();

router.post('/new-note', noteController.createNote);
router.put('/modif-note/:noteId', noteController.modifInNote);
router.post('/delete-note/:noteId', noteController.deleteNote);
router.get('/notes/:userId', noteController.getUserNotes);
router.post('/share-note', noteController.shareNote);

module.exports = router;
