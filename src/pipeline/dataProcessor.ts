import axios from 'axios';

async function runSparkJob() {
  const sparkConnectUrl = 'http://localhost:15002';
  
  try {
    // Create a session
    const sessionResponse = await axios.post(`${sparkConnectUrl}/v1/sessions`);
    const sessionId = sessionResponse.data.sessionId;

    // Execute a SQL query
    const queryResponse = await axios.post(`${sparkConnectUrl}/v1/sessions/${sessionId}/sql`, {
      sql: 'SELECT * FROM range(10)'
    });

    console.log('Query result:', queryResponse.data);

    // Close the session
    await axios.delete(`${sparkConnectUrl}/v1/sessions/${sessionId}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

runSparkJob();
