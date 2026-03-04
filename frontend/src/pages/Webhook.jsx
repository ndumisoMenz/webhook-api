import { useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Webhook = () => {
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setResult("");

    try {
      const res = await fetch(`${VITE_API_URL}/webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const response = await res.json();

      if (response.success) {
        setResult(response.word);
      } else {
        setResult(response.message);
      }
    } catch (err) {
      setResult("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Webhook
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter Data</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Type a word..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Loading..." : "Submit"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-800 font-medium">
            Result: <span className="font-bold">{result}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Webhook;
