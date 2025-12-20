import React from "react";
import { getSkillGap } from "../utils/skillMatcher";
import { calculateATSScore } from "../utils/atsScoring";
import { getSuggestions } from "../utils/suggestions";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
  resumeText?: string;
  jobDescription?: string;
}

const ATS: React.FC<ATSProps> = ({
  score,
  suggestions,
  resumeText,
  jobDescription,
}) => {
  // ===== Enhanced logic =====
  let matched: string[] = [];
  let missing: string[] = [];
  let enhancedScore = score;
  let enhancedSuggestions = suggestions.map((s) => s.tip);

  if (resumeText && jobDescription) {
    const skillResult = getSkillGap(resumeText, jobDescription);
    matched = skillResult.matched;
    missing = skillResult.missing;

    const atsResult = calculateATSScore(
      resumeText,
      matched.length,
      matched.length + missing.length
    );

    enhancedScore = atsResult.total;
    enhancedSuggestions = getSuggestions(resumeText, missing);
  }

  // ===== UI logic based on enhanced score =====
  const gradientClass =
    enhancedScore > 69
      ? "from-emerald-900/40"
      : enhancedScore > 49
      ? "from-amber-900/40"
      : "from-red-900/40";

  const iconSrc =
    enhancedScore > 69
      ? "/icons/ats-good.svg"
      : enhancedScore > 49
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  const subtitle =
    enhancedScore > 69
      ? "Great Job!"
      : enhancedScore > 49
      ? "Good Start"
      : "Needs Improvement";

  return (
    <div
      className={`bg-gradient-to-br ${gradientClass} to-slate-800 rounded-2xl shadow-lg border border-emerald-500/20 w-full p-6`}
    >
      {/* Top section */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <h2 className="text-3xl font-display font-bold text-slate-100">
          ATS Score - {enhancedScore}/100
        </h2>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-slate-100 mb-2">
          {subtitle}
        </h3>
        <p className="text-slate-300 mb-4">
          This score represents how well your resume is likely to perform in
          Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions */}
        <div className="space-y-3">
          {enhancedSuggestions.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src="/icons/warning.svg"
                alt="Suggestion"
                className="w-5 h-5 mt-1"
              />
              <p className="text-orange-400 font-medium">{tip}</p>
            </div>
          ))}
        </div>

        {/* Missing skills */}
        {missing.length > 0 && (
          <p className="text-slate-300 mt-4">
            <b>Missing Skills:</b> {missing.join(", ")}
          </p>
        )}
      </div>

      {/* Footer */}
      <p className="text-slate-300 italic font-medium">
        Keep refining your resume to improve your chances of getting past ATS
        filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;
