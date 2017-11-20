import amqp from 'amqplib/callback_api';
import { logger, logger_date } from './src/log4j';
import config from './config';
import route from './route';

logger.info('server started');

function bail(err, conn) {
  logger.error(err);
}

function on_connect(err, conn) {
    if (err !== null)
        return bail(err);

    process.once('SIGINT', () => {
        conn.close();
    });

    var q = config.rabbitMq_queue.logic01

    /*
    测试mq
     */
    // var q = config.rabbitMq_queue.logic02

    conn.createChannel((err, ch) => {
        logger_date.info('rabbitMQ createChannel');
        ch.assertQueue(q, {durable: true});
        ch.prefetch(1);
        ch.consume(q, reply, {
            noAck: false
        }, (err) => {
            if (err !== null)
                return bail(err, conn);
            logger.info(' [x] Awaiting RPC requests');
        });

        function reply(msg) {
            logger.info('request content is ' + msg.content.toString());
            const request = JSON.parse(msg.content.toString());
            const cb = (response) => {
                ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(response)), { correlationId: msg.properties.correlationId });
                ch.ack(msg);
            };
            try {
              const func = request.class && request.func ? route[request.class][request.func] : null;
              if (func) {
                func(cb, request.content);
              } else {
                cb({
                  err: 'method not allowed'
                });
              }
            } catch(err) {
              console.log(err);
              cb({
                code: 500,
                err: 'server error'
              });
            }
        }
    });
}

amqp.connect('amqp://' + config.rabbitMq_user + ':' + config.rabbitMq_password + '@' + config.rabbitMq_host + ':' + config.rabbitMq_port, on_connect);
logger_date.info('rabbitMQ connect success');
logger.warn('don`t kill this process');
