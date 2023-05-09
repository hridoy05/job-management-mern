import Job from "../models/Job.model.js";
async function createJob(jobData) {
  const job = new Job({ ...jobData });
  const savedJob = await job.save();
  return savedJob;
}

async function getJobById(jobId) {
  return await Job.findOne({ _id: jobId });
}
async function updateJob(jobId, jobData) {
  return await Job.findOneAndUpdate({ _id: jobId }, jobData, {
    new: true,
    runValidators: true,
  });
}

async function deleteJob(jobId) {
  const removedJob = await Task.findByIdAndDelete({ _id: jobId });
  return removedJob;
}

export { createJob, getJobById, updateJob, deleteJob };
