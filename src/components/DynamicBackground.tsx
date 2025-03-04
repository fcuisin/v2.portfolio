import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import mountainImage from "../assets/mountain.webp";

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 50, stiffness: 200 };

  const translateX = useSpring(useMotionValue(0), springConfig);
  const translateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const moveX = (clientX - window.innerWidth / 2) * 0.05;
      const moveY = (clientY - window.innerHeight / 2) * 0.05;

      translateX.set(moveX);
      translateY.set(moveY);
      setMousePosition({ x: clientX, y: clientY });

      if (ctx) {
        const radius = window.innerWidth < 768 ? 30 : 50;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(clientX, clientY, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();
        ctx.closePath();
      }
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchmove", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]">
          <img
            src={mountainImage.src}
            alt="Mountain background"
            className="object-cover object-center w-full h-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/30 to-navy/40 backdrop-blur-[0.6px]" />
      </motion.div>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />

      <motion.div
        className="fixed w-[20rem] h-[20rem] sm:w-[40rem] sm:h-[40rem] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(100,255,218,0.07) 0%, rgba(100,255,218,0) 70%)",
          left: mousePosition.x - (window.innerWidth < 768 ? 160 : 320),
          top: mousePosition.y - (window.innerWidth < 768 ? 160 : 320),
        }}
      />
    </>
  );
}
