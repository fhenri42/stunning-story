const { defaultsDeep } = require('lodash');

const nodesTest = [
  {
    id: '475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    data: {
      text: 'Ca va ?',
    },
    input: [],
    outputs: [
      'dba89cc8-4350-4189-8774-deaafc5a9a28',
      'COPY_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    ],
  },
  {
    id: 'dba89cc8-4350-4189-8774-deaafc5a9a28',
    port_id: 'port-0.08981838155458655',
    data: {
      text: 'Non',
    },
    input: '475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    outputs: [
      'COPY_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
      'COPY_2_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    ],
  },
  {
    id: 'COPY_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    data: {
      text: 'c est la fin',
    },
    input: 'dba89cc8-4350-4189-8774-deaafc5a9a28',
    outputs: [

    ],
  },
  {
    id: 'COPY_2_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    data: {
      text: 'c est la fin nul',
    },
    input: 'dba89cc8-4350-4189-8774-deaafc5a9a28',
    outputs: [

    ],
  },
];
/* Dispaly  */
const addNode = (text, input, outputs) => {
  const node = {
    id: 'randomeme',
    data: { text },
    input,
    outputs,
  };
  nodesTest.push(node);
};

const removeNode = (node) => {
  const nodeIndex = nodesTest.findIndex((n) => n.id === node.id);
  if (nodeIndex === -1) {
    console.log('Not found');

    return;
  }
  const allInfo = [];
  for (let i = 0; i < nodesTest.length; i++) {
    const element = nodesTest[i];
    allInfo.push(element.input);
    allInfo.push([...element.outputs]);
  }
  const indexOfUse = allInfo.findIndex((n) => n === node.id);
  if (indexOfUse !== -1) {
    console.log('CANT REMOVE remove attch node first');
    return;
  }
  nodesTest.splice(nodeIndex, 1);
};
const recursiveFinder = (currentNode) => {
  console.log('AFFICHAGE => ', currentNode.data.text);
  // Find c'est output
  if (currentNode.outputs.length === 0) {
    console.log('END');
    return;
  }
  for (let j = 0; j < currentNode.outputs.length; j += 1) {
    const output = currentNode.outputs[j];
    const outputIndex = nodesTest.findIndex((n) => n.id === output);
    recursiveFinder(nodesTest[outputIndex]);
  }
};
// console.log(nodesTest);

const start = () => {
  const firstNode = nodesTest[0];
  console.log('AFFICHAGE => ', firstNode.data.text);
  for (let j = 0; j < firstNode.outputs.length; j += 1) {
    const output = firstNode.outputs[j];
    const outputIndex = nodesTest.findIndex((n) => n.id === output);
    recursiveFinder(nodesTest[outputIndex]);
  }
};
