export const getUtcTime = () => {
  const now = new Date();

  const day = now.getUTCDate().toString().padStart(2, "0");
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() returns 0-11
  const year = now.getUTCFullYear();
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");

  return `${day}${month}${year}${hours}${minutes}${seconds}`;
};
