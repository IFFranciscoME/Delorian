// src/index.ts
import { MessageProducer } from './producers/messageProducer';
import { MessageConsumer } from './consumers/messageConsumer';
import { logger } from './utils/logger';

async function main() {
  const producer = new MessageProducer();
  const consumer = new MessageConsumer();

  try {
    
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe('test-topic');

    // Example: Publish a message every 5 seconds
    setInterval(async () => {
      
      const message = {
        id: Date.now().toString(),
        content: 'Hello, Kafka!',
        timestamp: Date.now(),
      };
      
      await producer.publishMessage('test-topic', message);
      logger.info('Published message', { message });
    
    },
      5000);

  } catch (error) {
    logger.error('Error in main function', { error });
  }

}

main();

