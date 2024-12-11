
import { messageEventPull } from '../consumers/messageConsumer';
import { parsedData } from '../pipeline/dataFetcher';
// import { dataEventPush } from '../producers/dataProducer';
import { connectAndQueryPostgres } from '../pipeline/dataExporter';

const aaveTopic = 'LendingActivity';

// Use an Immediately Invoked Function Expression (IIFE)
// To Keep the process running to continue consuming messages.

(async () => {
    
  try {
      
      // Message-Event Pull from Topic
      await messageEventPull(aaveTopic);
      
      // Fetch Pool Data
      //const pool_data = await fetchPoolData();
      
      // Fetch Users Data
      //const users_data = await fetchUsersData();

      // Parse into Schema
      // (pending)
      const parsed_data = await parsedData();

      // Data-Event Push
      // await dataEventPush(aaveTopic, parsed_data);
    
      // Log results for testing purposes
      //console.log('pool_data', pool_data);
      //console.log('users_data', users_data);
      console.log('\n ---- parsed_data ---- \n', parsed_data);

      connectAndQueryPostgres();
    
    } catch (error) {

      console.error('Failed to start consumer:', error);
    
  }
  }
)();

