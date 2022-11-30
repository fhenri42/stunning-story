import dynamic from 'next/dynamic';

const MyDiagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder() {
  return (
    <div className="h-screen w-screen">
      <MyDiagram />

    </div>
  );
}
