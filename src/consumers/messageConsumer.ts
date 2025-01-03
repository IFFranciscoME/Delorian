// src/consumers/messageConsumer.ts

import { EachMessagePayload } from 'kafkajs';
import { kafka } from '../config/kafka';
import { Message } from '../models/message';
import { logger } from '../utils/logger';

export class MessageConsumer {

  private consumer = kafka.consumer({ groupId: 'test-group' });

  async connect() {
    await this.consumer.connect();
  }

  async disconnect() {
    await this.consumer.disconnect();
  }

  async subscribe(topic: string, messageHandler: (message: Message) => void) {
    
    await this.consumer.subscribe({ topic, fromBeginning: true });
    
    await this.consumer.run({
      
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const messageValue: Message = JSON.parse(message.value?.toString() || '{}');
        
        logger.info('Received message: ', {
          topic,
          partition,
          messageValue,
        });

        messageHandler(messageValue);
     
      },
    });
  }

}

// -------------------------------------------------------- CONSUMER: Message-Event -- //
// -------------------------------------------------------- ----------------------- -- //

export async function messageEventPull(eventTopic:string) {

  const consumer = new MessageConsumer();
  
  try {

    await consumer.connect();
    
    const messageHandler = (message: Message) => {
      console.log('Message-Event Pull:', message);
    };
    
    await consumer.subscribe(eventTopic, messageHandler);
  
  } catch (error) {
    console.error('Error in consumer:', error);
  }

}

