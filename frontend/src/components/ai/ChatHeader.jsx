import { Sparkles, ShieldCheck } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="bg-gradient-to-r from-[#6A38C2] to-indigo-600 text-white rounded-2xl p-6 shadow-lg">

      <div className="flex justify-between items-center">

        <div>

          <div className="flex items-center gap-2">

            <Sparkles className="w-7 h-7" />

            <h1 className="text-3xl font-bold">
              CareerSync AI
            </h1>

          </div>

          <p className="mt-2 text-violet-100">
            Resume • Jobs • Companies • Interview Preparation
          </p>

        </div>

        <div className="bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2">

          <ShieldCheck className="w-5 h-5" />

          <span className="font-medium">
            Resume Indexed
          </span>

        </div>

      </div>

    </div>
  );
};

export default ChatHeader;