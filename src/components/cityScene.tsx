import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const generateSnowflakes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // Random x position for each snowflake
    delay: Math.random() * 2, // Random delay to stagger the snowflakes
    speed: 1 + Math.random() * 3, // Random speed to vary snowflake fall speed
  }));
};

const generateRaindrops = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // Random starting x position for each raindrop
    delay: Math.random() * 1.5, // Small delay to stagger the raindrops
    speed: 3 + Math.random() * 4, // Random speed for each raindrop
  }));
};

const CityScene = () => {
  const [snowflakes, setSnowflakes] = useState(generateSnowflakes(80)); // Increased snowflake count
  const [raindrops, setRaindrops] = useState(generateRaindrops(50));

  useEffect(() => {
    const interval = setInterval(() => {
      setSnowflakes(generateSnowflakes(80)); // Re-generate snowflakes with faster falling speed
      setRaindrops(generateRaindrops(50));
    }, 8000); // Reset snowflakes and raindrops every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* 3D Floating Land */}
      <motion.div
        className="absolute w-[400px] h-[200px] bg-green-800 rounded-lg shadow-xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(45deg) rotateY(45deg) translateZ(100px)',
        }}
        animate={{
          rotateY: [0, 10, 0],
          rotateX: [45, 35, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* The floating land piece */}
      </motion.div>

      {/* Floating Cloud 1 */}
      <motion.div
        className="absolute top-16 left-1/4 transform -translate-x-1/4 text-white"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        ☁️
      </motion.div>

      {/* Floating Tree */}
      <motion.div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 text-white"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        🌳
      </motion.div>

      {/* Floating Sun */}
      <motion.div
        className="absolute top-8 right-8 text-yellow-400 text-6xl"
        animate={{
          rotateZ: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        ☀️
      </motion.div>

      {/* Snowflakes */}
      {snowflakes.map(({ id, left, delay, speed }) => (
        <motion.div
          key={id}
          className="absolute top-0 text-white text-2xl"
          style={{ left: `${left}%` }}
          animate={{
            y: ['0%', '120%'], // Increased Y distance for faster snowflakes
          }}
          transition={{
            duration: speed, // Varying speed of snowflakes based on speed
            delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❄️
        </motion.div>
      ))}

      {/* Raindrops */}
      {raindrops.map(({ id, left, delay, speed }) => (
        <motion.div
          key={id}
          className="absolute top-0 text-blue-400 text-xl"
          style={{ left: `${left}%` }}
          animate={{
            y: ['0%', '100%'], // Raindrops fall to the bottom of the screen
          }}
          transition={{
            duration: speed, // Varying speed of raindrops
            delay,
            repeat: Infinity,
            repeatType: 'loop', // Raindrops will reappear at the top after reaching the bottom
            ease: 'linear', // Smooth constant fall
          }}
        >
          💧
        </motion.div>
      ))}

      {/* 3D City Buildings */}
      <div className="absolute bottom-0 w-full flex justify-around items-end h-40">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-700 border border-gray-600 rounded-md"
            style={{
              width: `${30 + i * 10}px`,
              height: `${80 + i * 20}px`,
              transform: `rotateY(${(i - 2) * 10}deg) skewY(2deg)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CityScene;
