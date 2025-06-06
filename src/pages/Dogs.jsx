import React from 'react';
import { motion } from 'framer-motion';

const pawVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      yoyo: Infinity,
      duration: 4,
      ease: "easeInOut",
      delay: Math.random() * 3,
    },
  },
};

const DogCard = ({ name, breed, image, description }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 max-w-sm w-full flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={image}
        alt={name}
        className="rounded-xl object-cover mb-5 w-full h-48"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">{name}</h3>
      <p className="text-pink-500 font-medium italic mb-2">{breed}</p>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Dogs = () => {
  const dogs = [
    {
      name: 'Max',
      breed: 'Labrador Retriever',
      image: 'https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg?ixlib=rb-4.1.0&rect=12%2C96%2C2671%2C1335&q=45&auto=format&w=1356&h=668&fit=crop',
      description: 'Max loves playing fetch and making new friends. He learns quickly and enjoys mastering new tricks.',
    },
    {
      name: 'Bella',
      breed: 'Border Collie',
      image: 'https://image.petmd.com/files/styles/978x550/public/2024-06/hip-dysplasia-in-dogs.jpg',
      description: 'Bella is smart, energetic, and thrives on mental challenges. Perfect for active owners.',
    },
    {
      name: 'Charlie',
      breed: 'Jack Russell Terrier',
      image: 'https://images.ctfassets.net/aynow2efrlx4/4yF425sqCDxys5gmCczkFc/37f0f97153020a96b53b5ea69d6df80c/Dachshunds-3.jpg?w=1000&h=1000',
      description: 'Charlie is full of energy and loves long walks. Ideal for people with a dynamic lifestyle.',
    },
    {
      name: 'Luna',
      breed: 'Sheltie',
      image: 'https://money.com/wp-content/uploads/2024/03/Best-Small-Dog-Breeds-Pomeranian.jpg?quality=60',
      description: 'Luna is affectionate and obedient. A perfect companion for families and kids.',
    },
    {
      name: 'Rocky',
      breed: 'German Shepherd',
      image: 'https://d2zp5xs5cp8zlg.cloudfront.net/image-89949-800.jpg',
      description: 'Rocky is a loyal guardian and quick learner. He’s protective, brave, and confident.',
    },
  ];

  const pawIcon = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';

  return (
    <div className="relative bg-white px-6 py-20 min-h-screen overflow-hidden">
      {/* Floating paw icons */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 opacity-10"
          variants={pawVariants}
          animate="animate"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            backgroundImage: `url(${pawIcon})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-16 select-none">
        🐶 Meet Our Dogs
      </h2>

      {/* Dog cards grid */}
      <div className="flex flex-wrap justify-center gap-10">
        {dogs.map((dog, idx) => (
          <DogCard key={idx} {...dog} />
        ))}
      </div>
    </div>
  );
};

export default Dogs;
