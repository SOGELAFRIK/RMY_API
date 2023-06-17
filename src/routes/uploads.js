const auth = require("../auth/auth");
const getUserRole = require("../auth/getUserRole");
const multer = require("multer");

// Configuration de Multer pour spécifier le dossier de destination des fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads"); // Remplacez "uploads/" par le chemin de destination souhaité
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Middleware Multer pour gérer le téléchargement de fichiers
const upload = multer({ storage: storage });

module.exports = (app) => {
  app.post(
    "/api/upload",
    auth(1, getUserRole),
    upload.single("file"),
    (req, res) => {
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Aucun fichier n'a été téléchargé" });
      }
      const fileUrl = `http://localhost:4000/uploads/${req.file.filename}`;
      // Vous pouvez ajouter ici d'autres logiques de traitement du fichier, si nécessaire
      return res.json({ fileUrl });
    }
  );
};
