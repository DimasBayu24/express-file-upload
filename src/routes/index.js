const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.post("/createkategori", controller.createKategori);
  router.post("/createsubkategori", controller.createSubKategori);
  router.patch("/updatesoal", controller.updateSoal);
  router.patch("/updatekategori", controller.updateKategori);
  router.patch("/updatesubkategori", controller.updateSubKategori);
  router.get("/files/:name", controller.download);
  router.get("/get", controller.getAll);
  router.get("/getkategori", controller.getKategori);
  router.get("/getsubkategori", controller.getSubKategori);
  router.delete("/deletesoal", controller.deleteSoal);
  router.delete("/deletesoalbykategori", controller.deleteSoalByKategori);
  router.delete("/deletesoalbysubkategori", controller.deleteSoalBySubKategori);
  router.delete("/deletekategori", controller.deleteKategori);
  router.delete("/deletesubkategori", controller.deleteSubKategori);

  app.use(router);
};

module.exports = routes;
