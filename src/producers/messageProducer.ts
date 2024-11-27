// src/producers/messageProducer.ts
import { kafka } from '../config/kafka';
import { Message } from '../models/message';

export class MessageProducer {
  private producer = kafka.producer();

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
