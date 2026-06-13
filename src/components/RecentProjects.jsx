import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "motion/react";
import { useRef } from "react";

/* ---------------- Caption ---------------- */
const renderCaption = (text) =>
  text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <span key={i} className="text-white font-medium">
        {part.slice(2, -2)}
      </span>
    ) : (
      <span key={i} className="text-white/35">
        {part}
      </span>
    ),
  );

/* ---------------- Cube ---------------- */
const ProjectCube = ({ images, caption }) => {
  const shouldReduceMotion = useReducedMotion();

  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);

  const velocityY = useRef(0);
  const velocityX = useRef(0);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const smoothY = useSpring(rotateY, { stiffness: 60, damping: 18 });
  const smoothX = useSpring(rotateX, { stiffness: 60, damping: 18 });

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;

    if (!isDragging.current) {
      rotateY.set(rotateY.get() + delta * 0.005);
    }
  });

  const onPointerDown = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    velocityX.current = 0;
    velocityY.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    velocityY.current = dx * 0.3;
    velocityX.current = dy * 0.3;

    rotateY.set(rotateY.get() + velocityY.current * 0.02);
    rotateX.set(rotateX.get() - velocityX.current * 0.02);

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    isDragging.current = false;

    const decay = () => {
      velocityX.current *= 0.95;
      velocityY.current *= 0.95;

      rotateX.set(rotateX.get() - velocityX.current * 0.01);
      rotateY.set(rotateY.get() + velocityY.current * 0.01);

      if (Math.abs(velocityX.current) > 0.1 || Math.abs(velocityY.current) > 0.1) {
        requestAnimationFrame(decay);
      }
    };

    decay();
  };

  const faces = [
    { transform: "rotateY(0deg) translateZ(260px)" },
    { transform: "rotateY(90deg) translateZ(260px)" },
    { transform: "rotateY(180deg) translateZ(260px)" },
    { transform: "rotateY(-90deg) translateZ(260px)" },
  ];

  return (
    <div
      className="relative w-full aspect-square"
      style={{ perspective: "1000px" }}
    >
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,200,255,0.12),transparent_60%)] blur-2xl" />

      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* inner glow core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-white/10 blur-3xl" />
        </div>

        {images.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: faces[i].transform }}
          >
            <div
              className="
                w-[400px] h-[250px]
                md:w-[420px] md:h-[280px]
                rounded-2xl overflow-hidden
                border border-white/20
                bg-white/5
                backdrop-blur-xl
                shadow-[0_0_40px_rgba(120,200,255,0.12)]
              "
            >
              <img
                src={img.src}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* center caption */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-20 pointer-events-none">
        <p className="text-white/40 text-sm max-w-xs">
          {renderCaption(caption)}
        </p>
      </div>
    </div>
  );
};

/* ---------------- DATA ---------------- */
const projects = [
  {
    title: "RECENT PROJECTS",
    description:
      "A collection of recently completed digital experiences and creative explorations.",
    caption:
      "",
    images: [
      { src: "/projects/studioflow-1.png" },
      { src: "/projects/studioflow-2.png" },
      { src: "/projects/studioflow-3.png" },
      { src: "/projects/studioflow-4.png" },
    ],
  },
];

/* ---------------- SECTION ---------------- */
export const RecentProjects = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-24 md:py-32 font-[Inter]">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* GRID LAYOUT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* LEFT TEXT */}
        <div className="w-full md:w-1/2 text-left">
          {projects.map((project, i) => (
            <div key={i}>
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                {project.title}
              </h3>

              <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-md">
                {project.description}
              </p>

              {/* <div className="mt-8 text-white/40 text-sm max-w-md">
                {renderCaption(project.caption)}
              </div> */}
            </div>
          ))}
        </div>

        {/* RIGHT CUBE */}
        <div className="w-full md:w-1/2 flex justify-center">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md"
            >
              <ProjectCube
                images={project.images}
                caption={project.caption}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};