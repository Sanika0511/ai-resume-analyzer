export function calculateATSScore(
  resumeText: string,
  matchedSkills: number,
  totalSkills: number
) {
  const keywordScore = totalSkills === 0 ? 0 : (matchedSkills / totalSkills) * 40;
  const lengthScore = resumeText.length > 1000 ? 20 : 10;
  const experienceScore = resumeText.toLowerCase().includes("experience") ? 20 : 10;
  const formattingScore = resumeText.includes("•") || resumeText.includes("-") ? 20 : 10;

  const total =
    keywordScore +
    lengthScore +
    experienceScore +
    formattingScore;

  return {
    total: Math.round(total),
    breakdown: {
      keywordScore: Math.round(keywordScore),
      lengthScore,
      experienceScore,
      formattingScore
    }
  };
}
