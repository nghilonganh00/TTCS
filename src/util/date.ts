const Timestamp = {
  toString: (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000);
    const dateString = date.toDateString();

    return dateString;
  },
  toDDMMYYYY: (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  },
  toHHMMDDMMYYYY: (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
  },
};

const secondsToTime = (seconds: number | undefined) => {
  if (!seconds) {
    return "00:00:00";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const secondsToMinutes = (seconds: number | undefined) => {
  if (!seconds) return 0;
  return Math.round(seconds / 60);
};

export { Timestamp, secondsToTime, secondsToMinutes };
