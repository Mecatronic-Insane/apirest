import {Router} from "express";
import {methods as brandController } from "./../controllers/brand.controller";
import {methods as modelController } from "./../controllers/model.controller";

const router = Router();

router.get("/api/brands", brandController.getBrands);
router.get("/api/brands/:id", brandController.getBrand);
router.get("/api/brands/:id/models", brandController.getModelFromBrand);
router.post("/api/brands", brandController.addBrands);
router.post("/api/brands/:id/models", brandController.addModelFromBrand);
router.put("/api/brands/:id", brandController.updateBrand);
router.delete("/api/brands/:id", brandController.deleteBrand);

router.get("/api/models", modelController.getModels);
router.put("/api/models/:id", modelController.updateModel);

module.exports = router;