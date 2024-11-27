// src/config/kafka.ts

import { Kafka } from 'kafkajs';

export const kafka = new Kafka({

  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:29092').split(','),

});
