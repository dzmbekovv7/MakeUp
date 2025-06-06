import React from "react";
import { motion } from "framer-motion";

const AboutIntro = () => {
  const randomBooks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    rotate: Math.random() * 360,
    size: 24 + Math.random() * 12, // размер от 24 до 36px
    delay: Math.random() * 4,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-blue-100 to-orange-100">
             {/* Падающие книги */}
      {randomBooks.map((book) => (
        <motion.div
          key={book.id}
          className="absolute text-blue-500"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: "110vh", opacity: 0.8 }}
          transition={{
            repeat: Infinity,
            delay: book.delay,
            duration: book.duration,
            ease: "linear",
          }}
          style={{
            left: `${book.left}%`,
            fontSize: `${book.size}px`,
            rotate: `${book.rotate}deg`,
          }}
        >
          📚
        </motion.div>
      ))}
      {/* Заголовок и текст */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-blue-800 mb-6"
        >
          Discover the Story Behind BookDragon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Welcome to <span className="font-semibold text-blue-600">BookDragon</span> — where books aren't just read, they're experienced. Dive into a world shaped by imagination, curiosity, and connection.
        </motion.p>
      </div>

      {/* Падающие книги */}
      {randomBooks.map((book) => (
        <motion.div
          key={book.id}
          className="absolute text-blue-500"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: "110vh", opacity: 0.8 }}
          transition={{
            repeat: Infinity,
            delay: book.delay,
            duration: book.duration,
            ease: "linear",
          }}
          style={{
            left: `${book.left}%`,
            fontSize: `${book.size}px`,
            rotate: `${book.rotate}deg`,
          }}
        >
          📚
        </motion.div>
      ))}

      {/* Описание с фото */}
      <div className="relative z-10 max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Who We Are</h2>
          <p className="text-lg mb-3 text-gray-800">
            <span className="font-semibold text-blue-600">BookDragon</span> is your sanctuary of stories and knowledge. We aim to build a curious, kind, and engaged reading community.
          </p>
          <p className="text-lg text-gray-700">
            From fiction to research, poetry to philosophy — we’re here to fuel your reading journey.
          </p>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          alt="Bookshelf"
          className="rounded-2xl shadow-2xl max-w-full h-auto"
        
        />
      </div>
    </section>
  );
};

export default AboutIntro;
