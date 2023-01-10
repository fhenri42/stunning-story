import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import NodeCard from './nodeCard';

const style = {
  border: '2px dashed green',
  height: '70px',
  width: '100px',
  zIndex: 100,
};
const TargetBox = memo(({
  onDrop, addingNode, input, targetId, value,
}) => {
  const [node, setNode] = useState({});
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['yellow', 'blue'],
      drop(item: any, monitor) {
        const newItem = { ...item };
        newItem.id = targetId || uuidv4();
        newItem.input = input;
        newItem.question = value;
        const outputs = [...newItem.outputs];
        for (let i = 0; i < outputs.length; i += 1) {
          const tmpData = { ...outputs[i] };
          tmpData.id = uuidv4();
          tmpData.type = 'target';
          outputs[i] = tmpData;
        }
        newItem.outputs = [...outputs];
        onDrop(monitor.getItemType());
        setNode(newItem);
        addingNode(newItem, targetId);
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType(),
      }),
    }),
    [onDrop],
  );
  const opacity = isOver ? 1 : 0.8;
  return (
    <div
      id={targetId}
      key={targetId}
      ref={drop}
      className="bg-red-400 p-2 ml-14 mt-14"
      style={{ ...style, opacity }}
    >
      {!node.content && (

      <p className="p-0 m-0">Drop here.</p>

      )}

      {node && node.content && (
      <NodeCard {...node} />
      )}
    </div>
  );
});

export default function StatefulTargetBox(props) {
  const [lastDroppedColor, setLastDroppedColor] = useState(null);
  const handleDrop = useCallback((color) => setLastDroppedColor(color), []);
  return (
    <TargetBox
      key={props.targetId}
      {...props}
      lastDroppedColor={lastDroppedColor}
      onDrop={handleDrop}
    />
  );
}
