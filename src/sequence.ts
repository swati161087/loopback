import {MiddlewareSequence, Request, Response,RequestContext} from '@loopback/rest';


//1. Log request start time, referer, user agent, request ip, error time and completion time. 
const winston = require('winston');

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

// Create the logger

export class MySequence extends MiddlewareSequence {


    
  log(msg: string) {
    const logger = winston.createLogger(logConfiguration);

    // Log a message
    logger.log({
        message: 'Hello, Winston!',
        level: 'info'
    });
    // Log a message
    logger.info('Hello, Winston!');
      let date=new Date();
    console.log(msg +date.getTime());
  }
  async handle(context: RequestContext) {

    this.log('Start time ');
    await super.handle(context);
    this.log('EndTIme ');
  }
}