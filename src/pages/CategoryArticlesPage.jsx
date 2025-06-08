import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'
import Loading from '../components/Loading'

const CategoryArticlesPage = () => {
  const { typename } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('makeup_articles')
        .select('*')
        .eq('type', typename)
        .order('published_date', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setArticles(data)
      }
      setLoading(false)
    }

    fetchArticles()
  }, [typename])

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-14 tracking-wide uppercase drop-shadow-lg">
          {typename.replace(/-/g, ' ')}
        </h1>

        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            Нет статей по теме «{typename}»
          </p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <Link
                key={article.id}
                to={`/articles/${slugify(article.title)}`}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl transform transition-transform duration-400 hover:scale-[1.05]"
              >
                {/* Фон с плавным градиентом */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Картинка с необычным эффектом */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="relative z-10 w-full h-56 object-cover rounded-t-3xl grayscale group-hover:grayscale-0 transition-filter duration-700"
                />

                {/* Контент поверх картинки */}
                <div className="relative z-20 bg-black bg-opacity-70 backdrop-blur-md p-6 rounded-b-3xl flex flex-col h-[280px]">
                  <h2 className="text-white text-2xl font-extrabold mb-2 drop-shadow-md">
                    {article.title}
                  </h2>
                  <p className="text-gray-300 flex-grow text-sm leading-relaxed mb-5 line-clamp-4">
                    {article.summary.length > 130
                      ? article.summary.slice(0, 130) + "..."
                      : article.summary}
                  </p>

                  <div className="flex justify-between items-center text-gray-400 text-xs font-semibold">
                    <span>{new Date(article.published_date).toLocaleDateString()}</span>

                    <div className="flex items-center gap-3">
                      <img
                        src={article.avatar}
                        alt={article.author}
                        className="w-7 h-7 rounded-full border-2 border-purple-700"
                      />
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>

                {/* Абсолютный элемент с подсветкой для футера */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 animate-gradient-x rounded-b-3xl z-30" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryArticlesPage
