
import { MessageConsumer } from '../src/consumers/messageConsumer';
import { Message } from '../src/models/message';

async function testSubscribe() {
  const consumer = new MessageConsumer();
  await consumer.connect();

  const messageHandler = (message: Message) => {
    console.log('Received message:', JSON.stringify(message, null, 2));
  };

  await consumer.subscribe('test-topic', messageHandler);
  console.log('Subscribed to test-topic. Waiting for messages...');
}

testSubscribe().catch(console.error);
