
import { Partitioners } from 'kafkajs';
import { kafka } from '../config/kafka';
import { UserMetrics } from '../models/data';
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

  async publishMessage(topic: string, message: Message): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }  
}

// -------------------------------------------------------- PRODUCER: Message-Event -- //
// -------------------------------------------------------- ----------------------- -- //

export async function dataEventPush(eventTopic:string, eventContent:UserMetrics) {
 
  const producer = new DataProducer();
  await producer.connect();

  // Wrap UserMetrics into a Message object
  const eventData: Message = {
    id: Date.now().toString(),
    content: JSON.stringify(eventContent), // Serialize UserMetrics as a string
    timestamp: Date.now(),
  };

  await producer.publishMessage(eventTopic, eventData);
  console.log('Message-Event Push');
  await producer.disconnect();

}

