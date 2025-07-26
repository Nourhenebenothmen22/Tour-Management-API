const User = require("../models/User"); // Importer le modèle User
const bcrypt = require("bcryptjs"); // Importer bcrypt pour le hachage des mots de passe
const jwt = require("jsonwebtoken"); // Importer jsonwebtoken pour la gestion des tokens
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
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Récupérer les données de connexion
  try {
    // Trouver l'utilisateur par son email
    const user = await User.find({ email });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" }); // Si l'utilisateur n'existe pas
    }
    // Vérifier le mot de passe
    const isPasswordValid = bcrypt.compareSync(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" }); // Si le mot de passe est invalide
    }
    const token = jwt.sign({ id: user[0]._id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Générer un token JWT
    res.cookie("accessToken", token, { httpOnly: true }); // Stocker le token dans un cookie HTTP-only
    user[0].password = undefined; // Ne pas retourner le mot de passe dans la réponse
    user[0].role = undefined; // Ne pas retourner le rôle dans la réponse
    res.status(200).json({ message: "Connexion réussie", user: user[0] }); // Retourner l'utilisateur connecté
  } catch (error) {
    res.status(500).json({ message: error.message }); //     const helmet = require("helmet");
  }
}