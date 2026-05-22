/**
 * Parse the raw evaluation text from the AI into structured sections.
 * Expected format (loose):
 *   Score: X/10
 *   Strengths: ...
 *   Weaknesses: ...
 */
export function parseEvaluation(text) {
  if (!text) return { score: null, strengths: [], weaknesses: [], raw: '' }

  const scoreMatch = text.match(/score[:\s]+(\d+(?:\.\d+)?)\s*(?:\/\s*10)?/i)
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : null

  const strengthsMatch = text.match(/strengths?[:\s]+([\s\S]*?)(?=weakness|improvement|$)/i)
  const weaknessesMatch = text.match(/weaknesses?[:\s]+([\s\S]*?)(?=improvement|suggestion|$)/i)

  const parseList = (str) => {
    if (!str) return []
    return str
      .split(/\n|;|•|-|\d+\./)
      .map((s) => s.trim())
      .filter((s) => s.length > 5)
      .slice(0, 5)
  }

  return {
    score,
    strengths: parseList(strengthsMatch?.[1]),
    weaknesses: parseList(weaknessesMatch?.[1]),
    raw: text,
  }
}

/** Returns a Tailwind color class based on score 0-10 */
export function scoreColor(score) {
  if (score === null) return 'text-gray-400'
  if (score >= 8) return 'text-brand-400'
  if (score >= 5) return 'text-yellow-400'
  return 'text-red-400'
}

/** Returns a friendly label for the candidate level */
export function levelLabel(level) {
  const map = {
    fresher: 'Fresher',
    intermediate: 'Mid-Level',
    expert: 'Senior / Expert',
  }
  return map[level?.toLowerCase()] || level || 'Unknown'
}

/** Format file size */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Clamp a number between min and max */
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
