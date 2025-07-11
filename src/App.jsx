import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import theatreState from "./FlyThrough.theatre-project-state2.json";
import studio from "@theatre/studio";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";

export default function App() {
  const sheet = getProject("Fly Through", { state: theatreState }).sheet(
    "Scene"
  );
  // if (import.meta.env.DEV) {
  //   studio.initialize();
  // }
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#84a4f4";

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={0} far={20} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Gltf src="/HouseCombined2.glb" castShadow receiveShadow />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
