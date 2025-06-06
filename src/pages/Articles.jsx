import React, { useEffect, useState, useMemo } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const DogsTrainingPage = () => {
  const [articles, setArticles] = useState([])
  const [visibleCount, setVisibleCount] = useState(9)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('newest')

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('dogstraining_articles')
        .select('*')
        .order('published_date', { ascending: false })

      if (error) setError(error.message)
      else setArticles(data)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  const handleShowMore = () => setVisibleCount(prev => prev + 9)

  const slugify = text =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  const filteredArticles = articles
    .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (filter === 'newest') return new Date(b.published_date) - new Date(a.published_date)
      if (filter === 'oldest') return new Date(a.published_date) - new Date(b.published_date)
      if (filter === 'popular') return b.reading_time - a.reading_time
      return 0
    })

  // Перемешиваем индексы для разнообразия карточек
  const shuffledIndices = useMemo(() => {
    let arr = [...Array(filteredArticles.length).keys()]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [filteredArticles.length])

  // Цветовая палитра
  const palette = {
    bgLight: '#f9fafb',        // светлый фон для карточек
    textDark: '#222222',       // темный текст
    accent: '#f2a365',         // акцентный цвет (теплый оранжевый)
    shadow: 'rgba(0,0,0,0.12)' // мягкая тень
  }

  const baseClasses = "rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition hover:scale-[1.04]"

  // 3 новых варианта карточек с беловатым фоном и большой картинкой

  const cardStyles = [

    // Вариант 1: Классическая большая картинка сверху, с простым текстовым блоком снизу
    (article) => (
      <Link
        key={article.id}
        to={`/articles/${slugify(article.title)}`}
        className={`${baseClasses} bg-[${palette.bgLight}] flex flex-col`}
        style={{ background: palette.bgLight, color: palette.textDark, boxShadow: `0 4px 12px ${palette.shadow}` }}
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
          <p className="text-sm flex-grow line-clamp-4 mb-4" style={{ color: '#555' }}>{article.summary}</p>
          <div className="flex items-center gap-3">
            <img
              src={article.avatar}
              alt={article.author}
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-xs text-gray-400">⏱ {article.reading_time} min</p>
            </div>
          </div>
        </div>
      </Link>
    ),

    // Вариант 2: Крупное изображение слева, справа текст с крупным заголовком и кнопкой "Читать"
    (article) => (
      <Link
        key={article.id}
        to={`/articles/${slugify(article.title)}`}
        className={`${baseClasses} bg-[${palette.bgLight}] flex flex-row`}
        style={{ background: palette.bgLight, color: palette.textDark, boxShadow: `0 6px 15px ${palette.shadow}` }}
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-56 h-full object-cover rounded-l-2xl"
        />
        <div className="p-6 flex flex-col justify-between flex-grow">
          <h2 className="text-3xl font-bold mb-3">{article.title}</h2>
          <p className="text-sm mb-6 line-clamp-5" style={{ color: '#444' }}>{article.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={article.avatar}
                alt={article.author}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
                <p className="font-semibold">{article.author}</p>
                <p className="text-xs text-gray-400">⏱ {article.reading_time} min</p>
              </div>
            </div>
      
          </div>
        </div>
      </Link>
    ),

    // Вариант 3: Крупное изображение как фон с затемнением, поверх текста по центру, светлый контейнер с прозрачным белым фоном
    (article) => (
      <Link
        key={article.id}
        to={`/articles/${slugify(article.title)}`}
        className={`${baseClasses} relative overflow-hidden rounded-3xl`}
        style={{ boxShadow: `0 8px 20px ${palette.shadow}` }}
      >
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div
          className="relative z-10 p-8 flex flex-col justify-center items-center text-center h-64"
          style={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            color: palette.textDark,
            borderRadius: '1rem',
            margin: '1rem',
          }}
        >
          <h2 className="text-3xl font-extrabold mb-4">{article.title}</h2>
          <p className="text-sm mb-6 line-clamp-4" style={{ color: '#666' }}>{article.summary}</p>
          <div className="flex items-center gap-4">
            <img
              src={article.avatar}
              alt={article.author}
              className="w-14 h-14 rounded-full border border-gray-300"
            />
            <div className="text-left">
              <p className="font-semibold">{article.author}</p>
              <p className="text-xs text-gray-500">⏱ {article.reading_time} min</p>
              <p className="text-xs text-gray-500">📅 {new Date(article.published_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Link>
    ),

  ]

  const renderCard = (article, index) => {
    const styleIndex = shuffledIndices[index] % cardStyles.length
    return cardStyles[styleIndex](article)
  }

  if (loading) return <Loading />
  if (error) return <div className="text-red-600 font-bold text-center mt-10">{error}</div>

  return (
    <div
      className="min-h-screen px-5 md:px-10 py-10 bg-gradient-to-r from-black via-gray-900 to-black" >
  <header className="mb-12 text-center max-w-3xl mx-auto">
  <p className="text-2xl font-semibold text-purple-700 mb-4">
    Explore the art of modeling and design — where creativity meets precision.
  </p>
  <p className="text-purple-700 italic">
    Dive into inspiring articles and tips that shape the world of fashion and craftsmanship.
  </p>
</header>

<div className="flex justify-center mb-4 max-w-4xl mx-auto px-4">
  <input
    type="search"
    placeholder="Search articles..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    className="border border-purple-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-900 w-full max-w-md bg-white text-gray-900"
  />
</div>

<div className="flex justify-center gap-4 mb-12 max-w-4xl mx-auto px-4">
  <button
    onClick={() => setFilter(prev => (prev === 'newest' ? 'oldest' : 'newest'))}
    className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-900 ${
      filter === 'newest' ? 'border-purple-600 text-purple-600' : 'border-gray-400 text-gray-400'
    }`}
    title="Toggle sort by newest/oldest"
  >
    {filter === 'newest' ? 'Newest first' : 'Oldest first'}
  </button>
</div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {filteredArticles.slice(0, visibleCount).map((article, idx) => renderCard(article, idx))}
      </section>

      {visibleCount < filteredArticles.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            className="bg-gradient-to-r from-black via-gray-900 text-white font-semibold py-3 px-8 rounded-xl transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}

export default DogsTrainingPage
