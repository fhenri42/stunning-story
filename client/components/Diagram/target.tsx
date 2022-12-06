import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import NodeCard from './nodeCard';

const style = {
  border: '1px solid gray',
  height: '110px',
  width: '170px',
  padding: '2rem',
  textAlign: 'center',
};
const TargetBox = memo(({
  onDrop, addingNode, path, answerIndex,
}) => {
  const [node, setNode] = useState({});
  const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    () => ({
      accept: ['yellow', 'blue'],
      drop(_item, monitor) {
        console.log('I am dropped', _item, monitor);
        onDrop(monitor.getItemType());
        setNode(_item);
        addingNode(_item, path, answerIndex);
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
  const opacity = isOver ? 1 : 0.7;
  const backgroundColor = '#fff';

  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor, opacity }}
    >
      {!node.content && (

      <p className="text-red-400">Drop here.</p>
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
      {...props}

      lastDroppedColor={lastDroppedColor}
      onDrop={handleDrop}
    />
  );
}
