const User=require("../models/User");
exports.createUser=async(req,res)=>{
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser); // Retourne l'utilisateur créé avec le code 201
    } catch (error) {
        res.status(400).json({ message: error.message }); // Retourne une erreur si la création échoue
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

    
