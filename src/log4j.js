import log4js from 'log4js';
import log4js_config from './config/logConfig.json';
log4js.configure(log4js_config);


export const logger = log4js.getLogger('burnings_log');
export const logger_date = log4js.getLogger('log_date');

logger.info('log4j started');
logger_date.info('log4j_date started');
