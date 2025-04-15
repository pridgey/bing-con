import { onCleanup, onMount } from "solid-js";
import confetti from "canvas-confetti";

export const Confetti = () => {
  let canvasRef;
  let runAnimation = true;

  onMount(() => {
    var duration = 500 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    confetti({
      particleCount: 100,
      spread: 200,
      origin: { y: 0.6 },
    });

    (function frame() {
      let timeLeft = runAnimation ? animationEnd - Date.now() : 0;
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  });

  onCleanup(() => {
    confetti.reset();
    runAnimation = false;
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    ></canvas>
  );
};
