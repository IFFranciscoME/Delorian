
import { Partitioners } from 'kafkajs';
import { kafka } from '../config/kafka';
import { Message } from '../models/message';

export class DataProducer {
  private producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
  });

  async connect() {
    await this.producer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  async publishMessage(topic: string, message: Message) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}

// -------------------------------------------------------- PRODUCER: Message-Event -- //
// -------------------------------------------------------- ----------------------- -- //

export async function dataEventPush(eventTopic:string, eventContent:string) {
 
  const producer = new DataProducer();
  await producer.connect();

  const eventData = {
    id: Date.now().toString(),
    content: eventContent,
    timestamp: Date.now(),
  };

  await producer.publishMessage(eventTopic, eventData);
  console.log('Message-Event Push');
  await producer.disconnect();

}

