export function getSuggestions(
  resumeText: string,
  missingSkills: string[]
) {
  const suggestions: string[] = [];

  if (!resumeText.toLowerCase().includes("project")) {
    suggestions.push("Add a projects section to showcase practical experience.");
  }

  if (!resumeText.match(/\d+/)) {
    suggestions.push("Use measurable achievements (numbers, impact, results).");
  }

  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider adding these skills: ${missingSkills.join(", ")}`
    );
  }

  return suggestions;
}
