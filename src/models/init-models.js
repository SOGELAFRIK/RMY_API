var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _chapitre = require("./chapitre");
var _consolidation = require("./consolidation");
var _entité = require("./entité");
var _niveau_risque = require("./niveau_risque");
var _obligation = require("./obligation");
var _periodicite = require("./periodicite");
var _role = require("./role");
var _status_conformite = require("./status_conformite");
var _suivi_obligation = require("./suivi_obligation");
var _texte = require("./texte");
var _utilisateur = require("./utilisateur");
var _workflow = require("./workflow");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var chapitre = _chapitre(sequelize, DataTypes);
  var consolidation = _consolidation(sequelize, DataTypes);
  var entité = _entité(sequelize, DataTypes);
  var niveau_risque = _niveau_risque(sequelize, DataTypes);
  var obligation = _obligation(sequelize, DataTypes);
  var periodicite = _periodicite(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var status_conformite = _status_conformite(sequelize, DataTypes);
  var suivi_obligation = _suivi_obligation(sequelize, DataTypes);
  var texte = _texte(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);
  var workflow = _workflow(sequelize, DataTypes);

  obligation.belongsTo(article, { as: "id_article_associe_article", foreignKey: "id_article_associe"});
  article.hasMany(obligation, { as: "obligations", foreignKey: "id_article_associe"});
  article.belongsTo(chapitre, { as: "id_chapitre_chapitre", foreignKey: "id_chapitre"});
  chapitre.hasMany(article, { as: "articles", foreignKey: "id_chapitre"});
  obligation.belongsTo(entité, { as: "id_entite_entité", foreignKey: "id_entite"});
  entité.hasMany(obligation, { as: "obligations", foreignKey: "id_entite"});
  utilisateur.belongsTo(entité, { as: "id_entite_entité", foreignKey: "id_entite"});
  entité.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "id_entite"});
  obligation.belongsTo(niveau_risque, { as: "id_niveau_risque_niveau_risque", foreignKey: "id_niveau_risque"});
  niveau_risque.hasMany(obligation, { as: "obligations", foreignKey: "id_niveau_risque"});
  suivi_obligation.belongsTo(obligation, { as: "id_obligation_obligation", foreignKey: "id_obligation"});
  obligation.hasMany(suivi_obligation, { as: "suivi_obligations", foreignKey: "id_obligation"});
  workflow.belongsTo(obligation, { as: "id_obligation_obligation", foreignKey: "id_obligation"});
  obligation.hasMany(workflow, { as: "workflows", foreignKey: "id_obligation"});
  obligation.belongsTo(periodicite, { as: "id_periodicite_periodicite", foreignKey: "id_periodicite"});
  periodicite.hasMany(obligation, { as: "obligations", foreignKey: "id_periodicite"});
  utilisateur.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(utilisateur, { as: "utilisateurs", foreignKey: "role_id"});
  suivi_obligation.belongsTo(status_conformite, { as: "id_status_conformite_status_conformite", foreignKey: "id_status_conformite"});
  status_conformite.hasMany(suivi_obligation, { as: "suivi_obligations", foreignKey: "id_status_conformite"});
  chapitre.belongsTo(texte, { as: "id_texte_texte", foreignKey: "id_texte"});
  texte.hasMany(chapitre, { as: "chapitres", foreignKey: "id_texte"});
  chapitre.belongsTo(utilisateur, { as: "id_createur_utilisateur", foreignKey: "id_createur"});
  utilisateur.hasMany(chapitre, { as: "chapitres", foreignKey: "id_createur"});
  obligation.belongsTo(utilisateur, { as: "id_commenditaire_utilisateur", foreignKey: "id_commenditaire"});
  utilisateur.hasMany(obligation, { as: "obligations", foreignKey: "id_commenditaire"});
  obligation.belongsTo(utilisateur, { as: "id_executeur_utilisateur", foreignKey: "id_executeur"});
  utilisateur.hasMany(obligation, { as: "id_executeur_obligations", foreignKey: "id_executeur"});
  obligation.belongsTo(utilisateur, { as: "id_controleur_utilisateur", foreignKey: "id_controleur"});
  utilisateur.hasMany(obligation, { as: "id_controleur_obligations", foreignKey: "id_controleur"});
  suivi_obligation.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(suivi_obligation, { as: "suivi_obligations", foreignKey: "id_utilisateur"});
  suivi_obligation.belongsTo(utilisateur, { as: "reponsable_mise_oeuvre_utilisateur", foreignKey: "reponsable_mise_oeuvre"});
  utilisateur.hasMany(suivi_obligation, { as: "reponsable_mise_oeuvre_suivi_obligations", foreignKey: "reponsable_mise_oeuvre"});
  texte.belongsTo(utilisateur, { as: "id_createur_utilisateur", foreignKey: "id_createur"});
  utilisateur.hasMany(texte, { as: "textes", foreignKey: "id_createur"});

  return {
    article,
    chapitre,
    consolidation,
    entité,
    niveau_risque,
    obligation,
    periodicite,
    role,
    status_conformite,
    suivi_obligation,
    texte,
    utilisateur,
    workflow,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
