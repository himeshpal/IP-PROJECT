import React, { useState } from "react";
import axios from "axios";
import {
  Search,
  Users,
  MapPin,
  Building,
  Link as LinkIcon,
  GitFork,
  Star,
} from "lucide-react";

const GitHubFinder = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const [userResponse, reposResponse] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=stars`
        ),
      ]);
      setUser({ ...userResponse.data, topRepos: reposResponse.data });
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "User not found"
          : "Error fetching user data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            GitHub Profile Finder
          </h1>
          <p className="text-gray-300 text-lg">
            Discover developers and their work
          </p>
        </div>

        <form
          onSubmit={searchUser}
          className="mb-12 relative max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-12 text-lg"
                required
              />
              <Search className="absolute left-4 text-gray-400" size={20} />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-900/50 border-l-4 border-red-500 p-4 mb-8 backdrop-blur-sm rounded-r-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {user && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-32 h-32 rounded-full ring-4 ring-gray-700 relative"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">
                    {user.name || user.login}
                  </h2>
                  <p className="text-purple-400 mb-4">@{user.login}</p>
                  {user.bio && (
                    <p className="text-gray-300 max-w-2xl mb-4">{user.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {user.company && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Building size={16} />
                        {user.company}
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin size={16} />
                        {user.location}
                      </div>
                    )}
                    {user.blog && (
                      <div className="flex items-center gap-2">
                        <LinkIcon size={16} />
                        <a
                          href={user.blog}
                          className="text-blue-400 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <Users size={16} />
                    Followers
                  </div>
                  <p className="text-2xl font-bold">
                    {user.followers.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <Users size={16} />
                    Following
                  </div>
                  <p className="text-2xl font-bold">
                    {user.following.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <GitFork size={16} />
                    Public Repos
                  </div>
                  <p className="text-2xl font-bold">
                    {user.public_repos.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <Star size={16} />
                    Gists
                  </div>
                  <p className="text-2xl font-bold">
                    {user.public_gists.toLocaleString()}
                  </p>
                </div>
              </div>

              {user.topRepos && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Top Repositories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.topRepos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                      >
                        <h4 className="font-semibold mb-2">{repo.name}</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {repo.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star size={14} />
                            {repo.stargazers_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={14} />
                            {repo.forks_count}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  View Full Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubFinder;
