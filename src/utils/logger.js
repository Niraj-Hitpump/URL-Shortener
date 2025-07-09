import { v4 as uuidv4 } from 'uuid';

export const logMiddleware = (action, data) => {
  const timestamp = new Date().toISOString();
  localStorage.setItem(
    `log-${uuidv4()}`,
    JSON.stringify({ timestamp, action, data })
  );
};