// import { insertUserMetrics } from '../pipeline/dataExporter';
import { dataEventPull } from '../consumers/dataConsumer';

const aaveTopic = 'LendingActivity';

// Use an Immediately Invoked Function Expression (IIFE)
// To Keep the process running to continue consuming messages.

(async () => {
    
  try {
      
      // Data-Event Push from Topic
      const metricsData = await dataEventPull(aaveTopic);
      
      console.log('dataEventPull: ', metricsData);

      // Data Ingestion
      // await insertUserMetrics(metricsData);
    
    } catch (error) {
      console.error('Failed to start consumer:', error);
    }
  }
)();

