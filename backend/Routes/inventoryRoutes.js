const express = require("express");
const {
  getAllInventory,
  addGrocery,
  updateGrocery,
  deleteGrocery,
} = require("../Controllers/inventoryApi");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.route("/").get(protect, getAllInventory);

router.route("/addGrocery").post(protect, addGrocery);
router.route("/:id").put(protect, updateGrocery).delete(protect, deleteGrocery);

module.exports = router;
