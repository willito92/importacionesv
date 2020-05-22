const notesCtrl = {};
const Note = require('../models/Notes');

notesCtrl.renderNoteForm = (req, res) => {
    console.log(req.user);
    res.render('notes/new-note');
}

notesCtrl.createNewNote = async(req, res) => {
    const {title, description}=req.body;
    const newNote= new Note({title, description});
    newNote.user=req.user.id;
    await newNote.save();
    req.flash('success_msg', 'nota agregada');
    res.redirect('/notes')
}

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({user:req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('notes/all-notes', {notes});

}

notesCtrl.renderEditForm = async (req, res) => {
    const note= await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        req.flash('error_msg', 'Usuario No Autorizado');
        return res.redirect('/notes');   
       }
    res.render('notes/edit-note', {note});

}

notesCtrl.updateNote = async(req, res) => {
    const {title, description}=req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Comentario actualizado');
    res.redirect('/notes');
}

notesCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Comentario Eliminado');
    res.redirect('/notes')
}







module.exports = notesCtrl;
