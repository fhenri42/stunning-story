export const addNode = (nodesTest: any, text: string, input: string, outputs: string) => {
  const node = {
    id: 'randomeme',
    data: { text },
    input,
    outputs,
  };
  nodesTest.push(node);
};

export const removeNode = (nodesTest: any, node: any) => {
  const nodeIndex = nodesTest.findIndex((n) => n.id === node.id);
  if (nodeIndex === -1) {
    return 'Not found';
  }
  const allInfo = [];
  for (let i = 0; i < nodesTest.length; i += 1) {
    const element = nodesTest[i];
    allInfo.push(element.input);
    allInfo.push([...element.outputs]);
  }
  const indexOfUse = allInfo.findIndex((n) => n === node.id);
  if (indexOfUse !== -1) {
    return 'CANT REMOVE remove attch node first';
  }
  nodesTest.splice(nodeIndex, 1);
  return nodeIndex;
};

export const recursiveFinder = (nodesTest: any, currentNode: any) => {
  if (currentNode.outputs.length === 0) {
    console.log('END add target');
    return;
  }
  console.log('AFFICHAGE => ', currentNode.data.text);

  for (let j = 0; j < currentNode.outputs.length; j += 1) {
    const output = currentNode.outputs[j];
    const outputIndex = nodesTest.findIndex((n) => n.id === output);
    recursiveFinder(nodesTest, nodesTest[outputIndex]);
  }
};

export const start = (nodesTest: any) => {
  const firstNode = nodesTest[0];
  if (firstNode.outputs.length === 0) {
    console.log('END add target');

    return;
  }
  console.log('AFFICHAGE => ', firstNode.data.text);

  for (let j = 0; j < firstNode.outputs.length; j += 1) {
    const output = firstNode.outputs[j];
    const outputIndex = nodesTest.findIndex((n) => n.id === output);
    recursiveFinder(nodesTest, nodesTest[outputIndex]);
  }
};
