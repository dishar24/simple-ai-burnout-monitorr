import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Groq from "groq-sdk"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

app.post("/analyze", async (req, res) => {
  try {

    const { text } = req.body

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a burnout detection assistant. Analyze the user's message and estimate burnout risk (Low/Medium/High) and give short advice."
        },
        {
          role: "user",
          content: text
        }
      ]
    })

    const result = completion.choices[0].message.content

    res.json({ result })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "AI failed" })
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})