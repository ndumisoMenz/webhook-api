import { useState, useEffect } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>The result is: {result}</label>
      <div>
        <label>Enter Data value</label>
        <input value={data} onChange={(e) => setData(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Webhook;
