import React from 'react';

const books = [
  { title: "Love in Times", author: "A. Writer", genre: "Romantic" },
  { title: "The Dark Maze", author: "B. Mystery", genre: "Mystery" },
  { title: "Skybound", author: "C. Dreamer", genre: "Fantasy" },
];

const RecommendedBooks = () => (
  <section className="py-16 bg-gray-50 text-center">
    <h3 className="text-3xl font-semibold text-blue-700 mb-8">Recommended Books</h3>
    <div className="flex flex-wrap justify-center gap-6">
      {books.map((book, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-md w-60 text-left">
          <h4 className="font-bold text-lg">{book.title}</h4>
          <p className="text-gray-600">by {book.author}</p>
          <span className="text-sm text-blue-500">{book.genre}</span>
        </div>
      ))}
    </div>
  </section>
);

export default RecommendedBooks;
