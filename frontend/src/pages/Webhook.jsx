import { useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Webhook = () => {
  const [data, setData] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Character Sorter
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Submit
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
