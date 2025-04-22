import React, { useState, useEffect } from "react";

const Manager = () => {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [showInputPassword, setShowInputPassword] = useState(false);

  // Load passwords
  useEffect(() => {
    const savedPasswords = localStorage.getItem("passwords");
    if (savedPasswords) {
      const parsedPasswords = JSON.parse(savedPasswords);
      setPasswords(parsedPasswords);
      const visibilityState = {};
      parsedPasswords.forEach((pw) => {
        visibilityState[pw.id] = false;
      });
      setVisiblePasswords(visibilityState);
    }
  }, []);

  // Save passwords
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleInputPasswordVisibility = () => {
    setShowInputPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.website || !formData.username || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    const newPassword = {
      ...formData,
      id: Date.now(),
    };

    setPasswords((prev) => [...prev, newPassword]);
    setVisiblePasswords((prev) => ({
      ...prev,
      [newPassword.id]: false,
    }));
    setFormData({
      website: "",
      username: "",
      password: "",
    });
    setShowInputPassword(false);
  };

  const handleDelete = (id) => {
    setPasswords((prev) => prev.filter((pw) => pw.id !== id));
    setVisiblePasswords((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const filteredPasswords = passwords.filter(
    (password) =>
      password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </h1>
          <p className="text-gray-600">Your Secure Password Manager</p>
        </header>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            className="w-full px-4 py-2 rounded-full bg-white text-gray-800 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            placeholder="Search passwords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Password Form */}
        <section className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Website URL</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  name="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Username</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    name="username"
                    placeholder="your_username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
                      type={showInputPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleInputPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                      aria-label={
                        showInputPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showInputPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors duration-200 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Password
              </button>
            </div>
          </form>
        </section>

        {/* Password List */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Your Saved Passwords
          </h2>

          {filteredPasswords.length === 0 ? (
            <div className="text-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p className="mt-4 text-gray-500">
                No passwords saved yet. Add your first password above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPasswords.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {item.website}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => togglePasswordVisibility(item.id)}
                          className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                          title={
                            visiblePasswords[item.id]
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {visiblePasswords[item.id] ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                          title="Delete password"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Username:</span>
                        <span className="text-gray-700 font-medium truncate">
                          {item.username}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Password:</span>
                        <span className="text-gray-700 font-medium">
                          {visiblePasswords[item.id] ? (
                            <span className="text-green-600">
                              {item.password}
                            </span>
                          ) : (
                            <span className="tracking-wider">••••••••</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Manager;
