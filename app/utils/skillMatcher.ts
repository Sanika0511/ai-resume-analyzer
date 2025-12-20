const SKILLS = [
  "java",
  "python",
  "c++",
  "javascript",
  "react",
  "node",
  "spring",
  "spring boot",
  "sql",
  "mongodb",
  "html",
  "css",
  "git"
];

export function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  return SKILLS.filter(skill => lower.includes(skill));
}

export function getSkillGap(resumeText: string, jdText: string) {
  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jdText);

  const matched = resumeSkills.filter(skill =>
    jdSkills.includes(skill)
  );

  const missing = jdSkills.filter(skill =>
    !resumeSkills.includes(skill)
  );

  return { matched, missing };
}
