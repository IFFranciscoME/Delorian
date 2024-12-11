
import { MessageProducer } from '../src/producers/messageProducer';

async function testPublish() {
 
  const producer = new MessageProducer();
  await producer.connect();

  const message = {
    id: Date.now().toString(),
    content: 'Test message',
    timestamp: Date.now(),
  };

  await producer.publishMessage('test-topic', message);
  console.log('Message published:', message);

  await producer.disconnect();
}

testPublish().catch(console.error);
