import { kafka } from '../config/kafka';
import { UserMetrics } from '../models/data';
import { EachMessagePayload } from 'kafkajs';
import { Message } from '../models/message';
import { logger } from '../utils/logger';

export class DataConsumer {
  private consumer = kafka.consumer({ groupId: 'test-group' });

  async connect() {
    await this.consumer.connect();
  }

  async disconnect() {
    await this.consumer.disconnect();
  }

  async subscribe(topic: string, messageHandler: (message: UserMetrics) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const messageValue: Message = JSON.parse(message.value?.toString() || '{}');
        
        // Parse the content field to get UserMetrics
        const userMetrics: UserMetrics = JSON.parse(messageValue.content);
        
        logger.info('Received message: ', {
          topic,
          partition,
          messageValue: userMetrics,
        });

        messageHandler(userMetrics);
      },
    });
  }
}

export async function dataEventPull(eventTopic: string):Promise<UserMetrics[]>{
  const consumer = new DataConsumer();
  const receivedMetrics: UserMetrics[] = [];
  
  try {
    await consumer.connect();
    
    const messageHandler = (message: UserMetrics) => {
      receivedMetrics.push(message);
    };
    
    await consumer.subscribe(eventTopic, messageHandler);
    
    // Keep the consumer running for a specific duration
    await new Promise(resolve => setTimeout(resolve, 60000)); // 1 min
    await consumer.disconnect();
    
    return receivedMetrics;

  } catch (error) {

    console.error('Error in consumer:', error);
    await consumer.disconnect();
    throw error;
  
  }
}
