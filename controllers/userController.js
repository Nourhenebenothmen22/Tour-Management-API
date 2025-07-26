const User=require("../models/User");
exports.createUser = async (req, res) => {
    // Vérifiez que tous les champs requis sont présents
    const { username, email, password, photo, role } = req.body; // ✅
    try {
        // Incluez tous les champs du modèle
        const newUser = await User.create({ 
            username, 
            email, 
            password,
            photo,
            role // Optionnel (le modèle a une valeur par défaut)
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.getAllUsers=async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users); // Retourne la liste des utilisateurs
    } catch (error) {
        res.status(500).json({ message: error.message }); // Retourne une erreur serveur
    }
}

exports.getUserById=async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" }); // Si non trouvé
        res.status(200).json(user); // Retourne l'utilisateur trouvé
    } catch (error) {
        res.status(500).json({ message: error.message }); // Retourne une erreur serveur
    }
}
// Récupérer les utilisateurs ayant le rôle "admin"
exports.getAdminUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Limite le nombre de résultats
  try {
    // Recherche les utilisateurs avec le rôle "admin"
    const admins = await User.find({ role: "admin" }).limit(limit);
    
    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur admin trouvé" });
    }

    res.status(200).json(admins); // Retourne la liste des admins
  } catch (error) {
    res.status(500).json({ message: error.message }); // Gestion d'erreur serveur
  }
};
exports.getUserCount = async (req, res) => {
  try {
    // Compte le nombre total d'utilisateurs
    const count = await User.countDocuments();
    res.status(200).json({ count }); // Retourne le nombre d'utilisateurs
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retourne une erreur serveur
  }
};

exports.updateUser=async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" }); // Si non trouvé
        res.status(200).json(user); // Retourne l'utilisateur trouvé
    } catch (error) {
        res.status(400).json({ message: error.message }); // Retourne une erreur si la mise à jour échoue
    }
}
exports.deleteUser=async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" }); // Si non trouvé
        res.status(200).json({ message: "Utilisateur supprimé avec succès" }); // Confirmation de suppression
    } catch (error) {
        res.status(500).json({ message: error.message }); // Retourne une erreur serveur
    }
}

    
