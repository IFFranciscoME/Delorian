
import { messageEventPull } from '../consumers/messageConsumer';
import { dataEventPush } from '../producers/dataProducer';
import { parsedData } from '../pipeline/dataParser';
import { insertUserMetrics } from '../pipeline/dataExporter';

const aaveTopic = 'LendingActivity';

// Use an Immediately Invoked Function Expression (IIFE)
// To Keep the process running to continue consuming messages.

(async () => {
    
  try {
      
      // Message-Event Pull from Topic
      await messageEventPull(aaveTopic);
      
      // Fetch Pool Data, Fetch Users Data, Parse Data
      const metricsData = await parsedData();

      // Data-Event Push to Topic
      await dataEventPush(aaveTopic, metricsData)
    
      // Data-Event Push to Topic
      //await dataEventPull(aaveTopic)
      
      // Insert Parsed Data
      await insertUserMetrics(metricsData)
    
      // Message
      console.log('\n ---- metricsData ---- \n', metricsData);

    
    } catch (error) {

      console.error('Failed to start consumer:', error);
    
  }
  }
)();

