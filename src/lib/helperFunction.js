import { jwtDecode } from "jwt-decode";

export const dateString = (date) => {
  const d = new Date(date);

  if (d == "Invalid Date") return "N/A";

  const formattedDate = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
};

export const timeAgo = (dateInput) => {
  const now = new Date();
  const date = new Date(dateInput);

  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 5) return "just now";

  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);

  return `${days} days ago`;
};

export const tokenDecode = (token) => {
  try {
    const decoded = jwtDecode(token);

    const currTime = Math.floor(new Date().getTime() / 1000);

    if (decoded.exp < currTime) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};

export const statusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-warning";

    case "success":
    case "active":
    case "delivered":
    case "solved":
      return "text-success";

    case "failed":
    case "canceled":
    case "rejected":
    case "blocked":
      return "text-error";

    case "onTheWay":
      return "text-accent";

    case "reached":
      return "text-info";
    default:
      return "";
  }
};
