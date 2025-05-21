import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="flex flex-row items-center gap-1 text-xs md:text-sm font-semibold mb-6 px-2 py-1 rounded-full border border-[rgb(var(--cta))] bg-[rgb(var(--cta)/0.1)] text-[rgb(var(--cta))] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-1 transition-all duration-200"
    >
      <ArrowLeft className="w-4 h-4 text-[rgb(var(--cta))]" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
