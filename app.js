const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const Task = require('./models/Task');

mongoose.connect('mongodb://127.0.0.1:27017/to-do-db')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log('Connexion à MongoDB échouée !',e));

  
app.use(express.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.get("/api/tasks/",(req,res) => {
    Task.find()
    .then((tasks) => {
        res.status(200).json({
            model: tasks,
            message:"success",
        })
    }).catch((error)=>{
res.status(400).json({
    errore:error.message,
    message:"probleme d'ex"
})
    })
})
  app.post('/api/tasks', (req, res) => {

   const taskObject = new Task(req.body) ; 
   taskObject.save().then(() =>{
    res.status(201).json({
      model : taskObject , 
      message : "Object cree !"
    })
   }).catch((error)=>{
    res.status(400).json({
        errore:error.message,
        message:"probleme d'ex"
    })
        })

    
  });


  app.patch("/tasks/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    const update = req.body; // Les données à mettre à jour, envoyées dans le corps de la requête.
  
    try {
      // Utilisez findOneAndUpdate pour mettre à jour la tâche par son ID.
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId },
        update,
        { new: true } // Pour retourner la tâche mise à jour.
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche" });
    }
  });


  app.get("/tasks/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
  
    try {
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération de la tâche" });
    }
  });
app.get('/api/getTasks', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

  app.delete("/tasks/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
  
    try {
      const deletedTask = await Task.findByIdAndRemove(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      res.json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la suppression de la tâche" });
    }
  });








module.exports = app;