export const calculateCountdown = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingMinutes = Math.floor(difference / (1000 * 60));

  return {
    minutes: remainingMinutes,
    isExpired: remainingMinutes <= 0,
  };
};
