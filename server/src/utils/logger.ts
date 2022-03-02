import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  prettifier: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format('HH:mm:ss')}"`,
});

export default log;
