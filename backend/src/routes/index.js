const express = require("express");
const router = express.Router();
const entrenamientoController = require("../controllers/entrenamientoController");
const checkListController = require("../controllers/checkListController");
const matrizController = require("../controllers/matrizController");
const authController = require("../controllers/authController");
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

// Ejemplo de ruta
router.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando" });
});

router.post("/login", authController.login);

// Protegidas por rol
router.get(
  "/entrenamientos",
  auth(["admin", "entrenador", "jefeGrupo"]),
  entrenamientoController.getEntrenamientos
);
router.post(
  "/entrenamientos",
  auth(["admin", "entrenador"]),
  entrenamientoController.createEntrenamiento
);
router.get(
  "/entrenamientos/:id",
  auth(["admin", "entrenador", "jefeGrupo"]),
  entrenamientoController.getEntrenamientoById
);
router.put(
  "/entrenamientos/:id",
  auth(["admin", "entrenador"]),
  entrenamientoController.updateEntrenamiento
);
router.delete(
  "/entrenamientos/:id",
  auth(["admin"]),
  entrenamientoController.deleteEntrenamiento
);

router.get(
  "/checklists",
  auth(["admin", "entrenador", "jefeGrupo"]),
  checkListController.getCheckLists
);
router.post(
  "/checklists",
  auth(["admin", "entrenador"]),
  checkListController.createCheckList
);
router.get(
  "/checklists/:id",
  auth(["admin", "entrenador", "jefeGrupo"]),
  checkListController.getCheckListById
);
router.put(
  "/checklists/:id",
  auth(["admin", "entrenador"]),
  checkListController.updateCheckList
);
router.delete(
  "/checklists/:id",
  auth(["admin"]),
  checkListController.deleteCheckList
);

router.get(
  "/matrices",
  auth(["admin", "entrenador", "jefeGrupo"]),
  matrizController.getMatrices
);
router.post("/matrices", auth(["admin"]), matrizController.createMatriz);
router.get(
  "/matrices/:id",
  auth(["admin", "entrenador", "jefeGrupo"]),
  matrizController.getMatrizById
);

// CRUD de usuarios solo para admin
router.get("/usuarios", auth(["admin"]), usuarioController.getUsuarios);
router.post("/usuarios", auth(["admin"]), usuarioController.createUsuario);
router.put("/usuarios/:id", auth(["admin"]), usuarioController.updateUsuario);
router.delete(
  "/usuarios/:id",
  auth(["admin"]),
  usuarioController.deleteUsuario
);

module.exports = router;
