// Mock data
import notifications from "./data";

export const getNotifications = (limit = 6) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        notifications: notifications.slice(0, limit),
        notificationsCount: notifications.length
      });
    }, 700);
  });
};
