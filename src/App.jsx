import { useState } from "react";

export default function App() {

const [textInput, setTextInput] = useState("");
const [result, setResult] = useState("");
const [burnout, setBurnout] = useState(0);

const analyzeBurnout = async () => {
try {
const response = await fetch("http://localhost:3000/analyze", 
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
text: textInput
})
});


  const data = await response.json();

  const aiText = data.result;

  setResult(aiText);

  // Detect burnout level from AI text
  let score = 30;

  if (aiText.toLowerCase().includes("low")) score = 30;
  if (aiText.toLowerCase().includes("medium")) score = 60;
  if (aiText.toLowerCase().includes("high")) score = 90;

  setBurnout(score);

} catch (err) {
  setResult("AI analysis failed. Check API key or internet.");
}

}

return ( <div className="min-h-screen flex items-center justify-center bg-black text-white"> <div className="bg-zinc-900 p-8 rounded-xl w-[420px] shadow-lg">

    <h1 className="text-2xl font-bold mb-4 text-orange-400">
      AI Burnout Monitor
    </h1>

    <textarea
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      placeholder="How are you feeling today?"
      className="w-full p-3 rounded bg-zinc-800 text-white mb-4"
    />

    <button
      onClick={analyzeBurnout}
      className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-4 py-2 rounded"
    >
      Analyze
    </button>

    {/* AI Result */}
    {result && (
      <div className="mt-4 text-orange-200">
        {result}
      </div>
    )}

    {/* Burnout Bar */}
    {result && (
      <>
        <div className="mt-4 w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-orange-400 h-4 rounded-full transition-all"
            style={{ width: `${burnout}%` }}
          ></div>
        </div>

        <p className="text-orange-300 mt-2">
          Burnout Level: {burnout}/100
        </p>
      </>
    )}

  </div>
</div>


);
}
