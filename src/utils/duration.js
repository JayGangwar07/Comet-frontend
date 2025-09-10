export default function formatDuration(duration) {
  // Ensure duration is a number
  if (typeof duration !== "number" || isNaN(duration)) return "00:00";

  // Convert float -> integer seconds
  const totalSeconds = Math.floor(duration);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


