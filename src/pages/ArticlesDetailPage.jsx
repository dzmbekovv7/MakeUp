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
      const { data, error } = await supabase.from('dogstraining_articles').select('*');

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
    'Special training',
    'Basic training',
    'Behavioral correction',
    'Training by age and breed',
  ];

  if (loading) return <Loading />;
  if (!article) return <p>Article not found</p>;

  function addClassToLinks(html) {
    if (!html) return '';

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
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-gray-300 p-4 sm:p-6 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Основной контент */}
        <main className="flex-1 bg-gray-900 bg-opacity-80 rounded-3xl p-8 shadow-xl flex flex-col">
          {/* Навигация между статьями */}
          <nav className="flex justify-between mb-8 text-purple-400">
            {prevArticle ? (
              <Link
                to={`/articles/${slugify(prevArticle.title)}`}
                className="flex items-center gap-4 hover:text-purple-600 transition-colors duration-300"
              >
                <span className="text-3xl select-none">←</span>
                <div className="flex flex-col max-w-xs">
                  <span className="text-xs uppercase tracking-wide text-purple-300">Previous</span>
                  <h3 className="font-bold text-lg line-clamp-2">{prevArticle.title}</h3>
                  <time className="text-xs text-purple-400">
                    {new Date(prevArticle.published_date).toLocaleDateString()}
                  </time>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                to={`/articles/${slugify(nextArticle.title)}`}
                className="flex items-center gap-4 hover:text-purple-600 transition-colors duration-300"
              >
                <div className="flex flex-col max-w-xs text-right">
                  <span className="text-xs uppercase tracking-wide text-purple-300">Next</span>
                  <h3 className="font-bold text-lg line-clamp-2">{nextArticle.title}</h3>
                  <time className="text-xs text-purple-400">
                    {new Date(nextArticle.published_date).toLocaleDateString()}
                  </time>
                </div>
                <span className="text-3xl select-none">→</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* Изображение и заголовок */}
          <article className="mb-10">
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-h-[400px] object-cover rounded-2xl mb-6 shadow-lg border border-purple-600"
              loading="lazy"
            />
            <h1 className="text-4xl font-extrabold text-purple-500 mb-2">{article.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-purple-400 mb-8">
              <span>⏱ {article.reading_time} min read</span>
              <time>📅 {new Date(article.published_date).toLocaleDateString()}</time>
              <span>👤 {article.author}</span>
            </div>
            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: customMarkdown(article.content) }}
            />
          </article>

          {/* Комментарии */}
          <section className="bg-gray-800 bg-opacity-60 rounded-2xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold text-purple-500 mb-6 border-b border-purple-600 pb-2">
              Comments
            </h2>
            {article.comments && article.comments.length ? (
              article.comments.map((c, i) => (
                <div key={i} className="mb-4 border-b border-gray-700 pb-3">
                  <p className="font-semibold text-purple-400">{c.name}</p>
                  <p className="text-gray-400 whitespace-pre-line mb-1">{c.message}</p>
                  <time className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</time>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}

            <form onSubmit={handleCommentSubmit} className="mt-8 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-900 border border-purple-600 rounded px-4 py-2 text-gray-300 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Your comment"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-gray-900 border border-purple-600 rounded px-4 py-2 text-gray-300 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
              <button
                type="submit"
                className="self-start bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors duration-300"
              >
                Add Comment
              </button>
            </form>
          </section>
        </main>

        {/* Боковая панель с последними статьями */}
        <aside className="w-full max-w-sm space-y-8">
          <section className="bg-gray-900 bg-opacity-80 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple-500 mb-4">Recent Articles</h3>
            <ul className="space-y-3">
              {recentArticles.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/articles/${slugify(item.title)}`}
                    className="block p-3 rounded hover:bg-purple-700 transition-colors duration-300"
                  >
                    <h4 className="font-semibold text-purple-400 line-clamp-2">{item.title}</h4>
                    <time className="text-xs text-purple-600">
                      {new Date(item.published_date).toLocaleDateString()}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 bg-opacity-80 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple-500 mb-4">Recently Updated</h3>
            <ul className="space-y-3">
              {lastUpdatedArticles.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/articles/${slugify(item.title)}`}
                    className="block p-3 rounded hover:bg-purple-700 transition-colors duration-300"
                  >
                    <h4 className="font-semibold text-purple-400 line-clamp-2">{item.title}</h4>
                    <time className="text-xs text-purple-600">
                      {new Date(item.updated_at || item.published_date).toLocaleDateString()}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

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
