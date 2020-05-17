const { Router } = require('express');
const router = Router();
const{isAuthenticated}=require('../helpers/auth');

const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote } = require('../controllers/notes.controller');
router.get('/notes/add/', isAuthenticated, renderNoteForm);
//new note
router.post('/notes/new-note', isAuthenticated, createNewNote);
//get all notes
router.get('/notes', isAuthenticated, renderNotes);
//editar notas
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
//Actualizar Notas
router.put('/notes/edit/:id', isAuthenticated, updateNote);
//Eliminar nota
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;
