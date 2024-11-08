import React, { useEffect, useRef } from "react";
import styles from "./FallingLeaves.module.css";
import { gsap } from "gsap";

const FallingLeaves = () => {
  const containerRef = useRef(null);
  const totalLeaves = 30;

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const container = containerRef.current;

    const random = (min, max) => min + Math.random() * (max - min);

    for (let i = 0; i < totalLeaves; i++) {
      const div = document.createElement("div");
      div.classList.add(styles.dot);
      div.style.backgroundImage = "url('/red-lobed-fall-clipart-leaf.png')";
      div.style.backgroundSize = "100% 100%";
      gsap.set(div, {
        x: random(0, w),
        y: random(-200, -150),
        z: random(-200, 200),
      });
      container.appendChild(div);
      animateLeaf(div);
    }

    function animateLeaf(leaf) {
      gsap.to(leaf, {
        y: h + 100,
        duration: random(20, 40),
        ease: "none",
        repeat: -1,
        delay: -15,
      });
      gsap.to(leaf, {
        x: "+=100",
        rotationZ: random(0, 180),
        duration: random(4, 8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(leaf, {
        rotationX: random(0, 360),
        rotationY: random(0, 360),
        duration: random(8, 16),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div
      className="w-full absolute h-full overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={containerRef}
        className={styles.container}
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default FallingLeaves;
