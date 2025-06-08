import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Loading from '../components/Loading';
import './article.css';

const AshleyArticleDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentArticles, setRecentArticles] = useState([]);
  const [lastUpdatedArticles, setLastUpdatedArticles] = useState([]);
  const [prevArticle, setPrevArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase.from('makeup_articles').select('*');

      if (!error && data) {
        const found = data.find((a) => slugify(a.title) === slug);
        if (found) {
          setArticle(found);

          const sortedByDate = data.sort(
            (a, b) => new Date(b.published_date) - new Date(a.published_date)
          );
          setRecentArticles(sortedByDate.slice(0, 5));

          const sortedByUpdate = data
            .slice()
            .sort(
              (a, b) =>
                new Date(b.updated_at || b.published_date) -
                new Date(a.updated_at || a.published_date)
            );
          setLastUpdatedArticles(sortedByUpdate.slice(0, 5));

          const sorted = data.sort(
            (a, b) => new Date(a.published_date) - new Date(b.published_date)
          );
          const currentIndex = sorted.findIndex((a) => slugify(a.title) === slug);

          setPrevArticle(sorted[currentIndex - 1] || null);
          setNextArticle(sorted[currentIndex + 1] || null);
        }
      }

      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !article) return;

    const newComment = {
      name,
      message,
      created_at: new Date().toISOString(),
    };

    const updatedComments = article.comments
      ? [...article.comments, newComment]
      : [newComment];

    const { error } = await supabase
      .from('dogstraining_articles')
      .update({ comments: updatedComments })
      .eq('id', article.id);

    if (!error) {
      setArticle((prev) => ({ ...prev, comments: updatedComments }));
      setName('');
      setMessage('');
    }
  };

  const keywords = [
    'Skin Disorders',
    'Makeup Tips',
    'Beauty Lifestyle',
    'Mens Grooming',
  ];

  if (loading) return <Loading />;
  if (!article) return <p>Article not found</p>;


  function addClassToLinks(html) {
    if (!html) return "";
  
    // Используем регулярку для добавления класса к каждому <a ...>
    return html.replace(/<a /g, '<a class="custom-link" ');
  }

  const customMarkdown = (content) => {
    if (!content) return '';

    let html = content
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-size: 30px; font-weight: 700;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
      )
      .replace(/<img>(.*?)<\/img>/g, '<img src="$1" style="width: 70%; height: 100%" loading="lazy" class="article-image-content" />')
      .split('\n')
      .map((line) => (line.trim() === '' ? '<br/>' : `<p>${line}</p>`))
      .join('');

    return addClassToLinks(html);
  };

  return (
<div className="min-h-screen bg-gradient-to-r from-gray-950 via-black to-gray-900 text-gray-100 px-4 py-10">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">

    {/* Контент статьи слева */}
    <main className="md:col-span-2 space-y-10">
      
      {/* Заголовок и изображение сбоку */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={article.image}
          alt={article.title}
          className="w-full md:w-1/2 rounded-xl object-cover border border-purple-700 shadow-md"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-4xl font-extrabold text-purple-400">{article.title}</h1>
          <div className="text-sm text-purple-300 mt-4 space-y-1">
            <p>🕒 {article.reading_time} min read</p>
            <p>📅 {new Date(article.published_date).toLocaleDateString()}</p>
            <p>✍️ {article.author}</p>
          </div>
        </div>
      </div>
  
      {/* Статья как колонки */}
      <article className="columns-1 md:columns-2 gap-8 space-y-4 text-gray-300 leading-relaxed text-lg">
        <div
          dangerouslySetInnerHTML={{ __html: customMarkdown(article.content) }}
        />
      </article>
  
      {/* Карусель навигации */}
      <div className="flex justify-between items-center mt-12 text-purple-300">
        {prevArticle ? (
          <Link to={`/articles/${slugify(prevArticle.title)}`} className="hover:underline">
            ← {prevArticle.title}
          </Link>
        ) : <span />}
        {nextArticle ? (
          <Link to={`/articles/${slugify(nextArticle.title)}`} className="hover:underline">
            {nextArticle.title} →
          </Link>
        ) : <span />}
      </div>
  
      {/* Комментарии в аккордеоне */}
      <details className="mt-8 bg-gray-800 rounded-xl p-6">
        <summary className="text-xl font-semibold cursor-pointer text-purple-400">💬 Comments</summary>
        <div className="mt-4 space-y-6">
          {article.comments?.length ? (
            article.comments.map((c, i) => (
              <div key={i} className="border-b border-gray-700 pb-3">
                <p className="font-semibold text-purple-300">{c.name}</p>
                <p className="text-gray-400">{c.message}</p>
                <time className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</time>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
  
          <form onSubmit={handleCommentSubmit} className="space-y-4 mt-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-gray-900 border border-purple-600 rounded px-4 py-2"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your comment"
              rows="3"
              className="w-full bg-gray-900 border border-purple-600 rounded px-4 py-2"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </details>
    </main>
  
    {/* Боковая панель */}
    <aside className="space-y-8">
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-purple-400 font-semibold text-lg mb-4">📌 Recent Articles</h2>
        <ul className="space-y-3">
          {recentArticles.map((item) => (
            <li key={item.id}>
              <Link
                to={`/articles/${slugify(item.title)}`}
                className="block hover:text-purple-500"
              >
                <h4 className="font-medium">{item.title}</h4>
                <time className="text-xs text-purple-600">
                  {new Date(item.published_date).toLocaleDateString()}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-purple-400 font-semibold text-lg mb-4">🔁 Recently Updated</h2>
        <ul className="space-y-3">
          {lastUpdatedArticles.map((item) => (
            <li key={item.id}>
              <Link
                to={`/articles/${slugify(item.title)}`}
                className="block hover:text-purple-500"
              >
                <h4 className="font-medium">{item.title}</h4>
                <time className="text-xs text-purple-600">
                  {new Date(item.updated_at || item.published_date).toLocaleDateString()}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <section className="bg-gray-900 bg-opacity-80 rounded-3xl p-6 shadow-lg">
  <h3 className="text-xl font-bold text-purple-500 mb-4">Keywords</h3>
  <div className="flex flex-wrap gap-3">
    {keywords.map((word) => (
      <Link
        key={word}
        to={`/type/${encodeURIComponent(word)}`}
        className="bg-purple-700 text-purple-200 rounded-full px-4 py-1 text-sm font-semibold hover:bg-purple-600 transition-colors duration-300"
      >
        {word}
      </Link>
    ))}
  </div>
</section>
    </aside>
  </div>
  </div>
  
  );
};

export default AshleyArticleDetailPage;
