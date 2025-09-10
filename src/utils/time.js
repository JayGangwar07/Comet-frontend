export default function timeAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const seconds = Math.floor((now - created) / 1000);

  // Years
  let interval = seconds / 31536000;
  if (interval > 1) {
    const years = Math.floor(interval);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }

  // Months
  interval = seconds / 2592000;
  if (interval > 1) {
    const months = Math.floor(interval);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  // Weeks
  interval = seconds / 604800;
  if (interval > 1) {
    const weeks = Math.floor(interval);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  // Days
  interval = seconds / 86400;
  if (interval > 1) {
    const days = Math.floor(interval);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  // Hours
  interval = seconds / 3600;
  if (interval > 1) {
    const hours = Math.floor(interval);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // Minutes
  interval = seconds / 60;
  if (interval > 1) {
    const minutes = Math.floor(interval);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  // Seconds
  const secs = Math.floor(seconds);
  if (secs < 5) {
    return 'just now';
  }
  return `${secs} second${secs > 1 ? 's' : ''} ago`;
}

// Example usage with a MongoDB ObjectId's timestamp
// Assuming you have a document with a `createdAt` field
const doc = {
  // A hypothetical MongoDB ObjectId, the first part is the timestamp
  _id: '64f7c5e8b4e7a2d3c1b0a9f8',
  createdAt: new Date('2025-08-01T10:00:00.000Z')
};

console.log(timeAgo(doc.createdAt)); // Example output: "1 month ago" 
console.log(timeAgo(new Date('2025-09-03T10:00:00.000Z'))); // Example output: "1 day ago"
console.log(timeAgo(new Date('2025-09-04T19:25:00.000Z'))); // Example output: "4 minutes ago" (assuming current time is 7:29 PM)
console.log(timeAgo(new Date('2025-09-04T19:29:35.000Z'))); // Example output: "3 seconds ago"
