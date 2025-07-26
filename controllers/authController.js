const User = require("../models/User"); // Importer le modèle User
const bcrypt = require("bcryptjs"); // Importer bcrypt pour le hachage des mots de passe
exports.registerUser = async (req, res) => {
  const { username, email, password, photo, role } = req.body; // Récupérer les données de l'utilisateur
  try {
    const salt=bcrypt.genSaltSync(10); // Générer un sel pour le hachage
    const hashedPassword = bcrypt.hashSync(password, salt); // Hacher le mot de passe
    // Créer un nouvel utilisateur avec les données fournies
    const newUser = await User.create({ 
      username, 
      email, 
      password: hashedPassword, // Utiliser le mot de passe haché
      photo,
      role // Le rôle est optionnel et a une valeur par défaut dans le modèle
    });
    res.status(201).json(newUser); // Retourner l'utilisateur créé avec le code 201
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retourner une erreur si la création échoue
  }
}