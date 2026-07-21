import { Job } from "../models/job.model.js";

export const getRelevantJobs = async (role) => {

    const jobs = await Job.find({
        title: {
            $regex: role,
            $options: "i"
        }
    })
    .populate("company")
    .limit(5);

    return jobs;
};