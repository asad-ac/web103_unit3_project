import express from "express"
import locationsController from "../controllers/locationsController.js"

const router = express.Router()

router.get("/", locationsController.getLocations)
router.get("/:locationId", locationsController.getLocationById)
router.get("/:locationId/events", locationsController.getEventsByLocation)

export default router
