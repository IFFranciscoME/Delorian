
// src/index.ts
import { MessageProducer } from '../src/producers/messageProducer';
import { MessageConsumer } from '../src/consumers/messageConsumer';
import { logger } from '../src/utils/logger';

async function main() {
  const producer = new MessageProducer();
  const consumer = new MessageConsumer();

  try {
    
    await producer.connect();
    await consumer.connect();

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
