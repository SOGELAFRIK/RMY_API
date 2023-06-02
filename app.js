const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json())

sequelize.initDb();

app.get('/', (req, res) => {
    res.json('Hello, World !🖐️')
})

//ici nos future points de terminaison

/*ARTICLE */
require('./src/routes/article/createArticle')(app);
require('./src/routes/article/deleteArticle')(app);
require('./src/routes/article/findAllArticle')(app);
require('./src/routes/article/findArticleById')(app);
require('./src/routes/article/updateArticle')(app);

/*CHAPITRE */
require('./src/routes/chapitre/createChapitre')(app);
require('./src/routes/chapitre/deleteChapitre')(app);
require('./src/routes/chapitre/findAllChapitre')(app);
require('./src/routes/chapitre/findChapitreById')(app);
require('./src/routes/chapitre/updateChapitre')(app);

/* CONSOLIDATION */
require('./src/routes/consolidation/createConsolidation')(app);
require('./src/routes/consolidation/deleteConsolidation')(app);
require('./src/routes/consolidation/findAllConsolidation')(app);
require('./src/routes/consolidation/findConsolidationById')(app);
require('./src/routes/consolidation/updateConsolidation')(app);

/* ENTITE */
require('./src/routes/entite/createEntite')(app)
require('./src/routes/entite/deleteEntite')(app)
require('./src/routes/entite/findAllEntite')(app)
require('./src/routes/entite/findEntiteById')(app)
require('./src/routes/entite/updateEntite')(app)

/*NIVEAU DE RISQUE */
require('./src/routes/niveauRisque/createRisque')(app);
require('./src/routes/niveauRisque/deleteRisqueLevel')(app);
require('./src/routes/niveauRisque/findAllRisqueLevel')(app);
require('./src/routes/niveauRisque/finfRisqueLevelById')(app);
require('./src/routes/niveauRisque/updateRisqueLevel')(app);

/* OBLIGATIONS */
require('./src/routes/obligation/createObligation')(app)
require('./src/routes/obligation/deleteObligation')(app)
require('./src/routes/obligation/finfAllObligation')(app)
require('./src/routes/obligation/findBobligationById')(app)
require('./src/routes/obligation/updtaeObligation')(app)

/*PERIODICITE */
require('./src/routes/periodicite/createPeriodicite')(app);
require('./src/routes/periodicite/deletePeriodicite')(app);
require('./src/routes/periodicite/findAllPeriodicite')(app);
require('./src/routes/periodicite/findPeriodiciteById')(app);
require('./src/routes/periodicite/updatePeriodicite')(app);

/*SUIVI OBLIGATION */
require('./src/routes/suivi_obligation/createSuiviObligation')(app);
require('./src/routes/suivi_obligation/deleteSuiviObligation')(app);
require('./src/routes/suivi_obligation/findAllSuiviObligation')(app);
require('./src/routes/suivi_obligation/findSuiviObligationById')(app);
require('./src/routes/suivi_obligation/updateSuiviObligation')(app);

/* ROLE */
require('./src/routes/role/createRole')(app)
require('./src/routes/role/deleteRole')(app)
require('./src/routes/role/findAllRole')(app)
require('./src/routes/role/findRoleByRole')(app)
require('./src/routes/role/updateRole')(app);

/* SUIVI OBLIGATION */
require('./src/routes/suivi_obligation/createSuiviObligation')(app);
require('./src/routes/suivi_obligation/deleteSuiviObligation')(app);
require('./src/routes/suivi_obligation/findAllSuiviObligation')(app);
require('./src/routes/suivi_obligation/findSuiviObligationById')(app);
require('./src/routes/suivi_obligation/updateSuiviObligation')(app);

/*TEXTE */
require('./src/routes/texte/createTexte')(app);
require('./src/routes/texte/deleteTexte')(app);
require('./src/routes/texte/findAllTexte')(app);
require('./src/routes/texte/findTexteById')(app);
require('./src/routes/texte/updateTexte')(app);

/* UTILISATEUR */
require('./src/routes/user/createUser')(app)
require('./src/routes/user/findUserById')(app)
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/findAllUser')(app)
require("./src/routes/user/updateMDP")(app);
require("./src/routes/user/forgortPassword")(app);




/* WORKFLOW */
require('./src/routes/workflow/createWorkflow')(app);
require('./src/routes/workflow/updateWorkflow')(app);
require('./src/routes/workflow/deleteWorkflow')(app)
require('./src/routes/workflow/findAllWorkflow')(app);
require('./src/routes/workflow/findWorkflowById')(app)

/* LOGIN */
require('./src/routes/login')(app);

app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demander! vous pouver essayer une autre URL"
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre application Node est demarée sur : http://localhost:${port}`))