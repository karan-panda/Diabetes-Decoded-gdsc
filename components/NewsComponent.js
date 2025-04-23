"use client"

import { useEffect, useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"

const NewsComponent = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    // Use our internal API route instead of directly calling News API
    fetch("/api/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        setNews(data.articles || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching news:", error)
        setError("Failed to load news. Please try again later.")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-hidden">
      {news.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No news articles found.</p>
      ) : (
        news.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col md:flex-row">
              {article.urlToImage && (
                <div className="md:w-1/4 h-48 md:h-auto">
                  <img
                    src={article.urlToImage || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=200&width=200"
                    }}
                  />
                </div>
              )}
              <div className={`p-4 ${article.urlToImage ? "md:w-3/4" : "w-full"}`}>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    Read more <FaExternalLinkAlt className="ml-1 text-xs" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default NewsComponent

