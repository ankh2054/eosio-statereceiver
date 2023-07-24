const StateReceiver = require('../src/state-receiver');


const sr = new StateReceiver({
  logger: {
    info: (...m) => console.info(...m),
    debug: (...m) => console.debug(...m),
    warn: (...m) => console.warn(...m),
    error: (...m) => console.error(...m),
  },
  startBlock: 228671233,
  irreversible: true,
  socketAddresses: [process.env.SOCKET_ADDRESS || 'ws://88.198.18.252:29876'],
  eosEndpoint: process.env.EOS_ENDPOINT || 'http://88.198.18.252:28888',
  deserializerActions: [

  ],
  maxQueueSize: 10,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

sr.registerTraceHandler({
  async processTrace(block_num, traces, block) {
    await sleep(1000);

    //blockCount++;
    console.log(block_num)
    console.log(block)
    
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
