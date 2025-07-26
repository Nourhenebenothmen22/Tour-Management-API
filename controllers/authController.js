const User = require("../models/User"); // Importer le modèle User
exports.registerUser = async (req, res) => {
  const { username, email, password, photo, role } = req.body; // Récupérer les données de l'utilisateur
  try {
    // Créer un nouvel utilisateur avec les données fournies
    const newUser = await User.create({ 
      username, 
      email, 
      password,
      photo,
      role // Le rôle est optionnel et a une valeur par défaut dans le modèle
    });
    res.status(201).json(newUser); // Retourner l'utilisateur créé avec le code 201
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retourner une erreur si la création échoue
  }
}