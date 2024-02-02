const StateReceiver = require('../src/state-receiver');

async function testFeed(block_num, block) {
  console.log(`-------------------------------`);
  let producer = block.producer;
  let block_num_lib = block_num;
  let timestamp = block.timestamp;

  console.log(producer);
  console.log(block_num_lib);
  console.log(timestamp);
}

const sr = new StateReceiver({
  startBlock: 261910103,
  irreversible: true,
  socketAddresses: [process.env.SOCKET_ADDRESS || 'ws://172.16.0.86:8690'],
  eosEndpoint: process.env.EOS_ENDPOINT || 'http://172.16.0.86:8891',
  deserializerActions: [],
  maxQueueSize: 100,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

sr.registerTraceHandler({
  async processTrace(block_num, traces, block) {
    await sleep(1000);

    await testFeed(block_num, block);
  },
});

sr.onError = (err) => {
  sr.stop();
  console.error(`State receiver stop due to ERROR:`, err);
};

sr.start();

setTimeout(() => {
  sr.stop();

  setTimeout(() => {
    sr.start();
  }, 5000);
}, 5000);
