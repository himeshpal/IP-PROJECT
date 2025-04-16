import { useState, useEffect } from "react";
import {
  Search,
  ExternalLink,
  ArrowUpCircle,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";

const RedditFeedViewer = () => {
  const [subreddit, setSubreddit] = useState("reactjs");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("reactjs");

  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/hot.json`
      );
      if (!response.ok) throw new Error("Subreddit not found or private");
      const data = await response.json();
      setPosts(data.data.children);
    } catch (err) {
      setError("Error fetching posts. Please check the subreddit name.");
      setPosts([]);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSubreddit(inputValue.trim());
    }
  };

  const formatTime = (timestamp) => {
    const hours = Math.floor((Date.now() / 1000 - timestamp) / 3600);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-purple-500" size={24} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Reddit Explorer
          </h1>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter subreddit name..."
                className="w-full pl-12 pr-4 py-3 border-0 rounded-xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              Explore
            </button>
          </form>
        </div>

        {/* Current Subreddit Display */}
        <div className="mb-6">
          <span className="text-sm text-gray-500">Currently browsing</span>
          <h2 className="text-xl font-semibold text-gray-800">r/{subreddit}</h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.data.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                    <a
                      href={`https://reddit.com${post.data.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.data.title}
                    </a>
                  </h3>
                  <a
                    href={`https://reddit.com${post.data.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <ArrowUpCircle size={18} className="text-orange-500" />
                    <span className="font-medium">
                      {post.data.ups.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={18} className="text-blue-500" />
                    <span className="font-medium">
                      {post.data.num_comments.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={18} className="text-green-500" />
                    <span>{formatTime(post.data.created_utc)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-600 font-medium">
                      u/{post.data.author}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RedditFeedViewer;
