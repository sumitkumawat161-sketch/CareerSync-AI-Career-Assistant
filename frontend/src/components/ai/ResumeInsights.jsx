const ResumeInsights = ({ role }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 border">

      <h2 className="text-xl font-bold mb-3">
        Resume Insights
      </h2>

      <div className="flex items-center gap-2">
        <span className="font-semibold">
          Predicted Role:
        </span>

        <span className="text-blue-600 font-bold">
          {role || "Loading..."}
        </span>
      </div>

    </div>
  );
};

export default ResumeInsights;