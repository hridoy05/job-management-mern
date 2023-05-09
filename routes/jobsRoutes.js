import express from "express";
const router = express.Router();

import {
  httpCreateJob,
  httpDeleteJob,
  getAllJobs,
  httpUpdateJob,
  showStats,
} from "../controllers/jobsController.js";

router.route("/").post(httpCreateJob).get(getAllJobs);
// remember about :id
router.route("/stats").get(showStats);
router.route("/:id").delete(httpDeleteJob).patch(httpUpdateJob);

export default router;
