import express from 'express'
const router = express.Router()

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats
} from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobs)
// remember about :id

router.route('/:id').delete(deleteJob).patch(updateJob)
router.get('/stats', showStats)

export default router