
import { ethers } from 'ethers';
import { messageEventPush } from '../producers/messageProducer';

const aaveTopic = 'LendingActivity';
const infura = "wss://mainnet.infura.io/ws/v3/d5008e9a5e214f6c834a8536d18d0e70";
const wsProvider = new ethers.providers.WebSocketProvider(infura);

wsProvider.on('block', async (blockNumber) => {

  console.log(`\n------ ------------------------------------------------ ------ `);
  console.log(`------ Producer: [Message-Event] New Minted Block: ${blockNumber} ------ `);
  console.log(`------ ------------------------------------------------ ------\n`);
  
  // Message-Event Push to Topic
  messageEventPush(aaveTopic, blockNumber);
  
});

