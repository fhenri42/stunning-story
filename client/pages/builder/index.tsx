import dynamic from 'next/dynamic';

const MyDiagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder() {
  return (
    <div className="m-20">
      <h1>Story</h1>

      <MyDiagram />

      <h1>Story</h1>

    </div>
  );
}
