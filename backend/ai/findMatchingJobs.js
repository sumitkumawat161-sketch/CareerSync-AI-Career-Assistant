import { Job } from "../models/job.model.js";

export const findMatchingJobs = async (role) => {
    const regexRole = role
    .replace(/-/g, " ")
    .replace(/\s+/g, " ");
    const jobs = await Job.find({
        title: { $regex: role, $options: "i" }
    })
    .populate("company")
    .limit(10);

    return jobs;
};