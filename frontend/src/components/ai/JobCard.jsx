const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">

      <h3 className="text-lg font-bold">
        {job.title}
      </h3>

      <p className="text-gray-600 mt-2">
        Company: {job.company?.name}
      </p>

      <p className="text-gray-600">
        Location: {job.location}
      </p>

    </div>
  );
};

export default JobCard;