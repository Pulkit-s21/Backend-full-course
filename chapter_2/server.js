import express, { json } from "express"
const app = express()
const PORT = 2104
let data = ["john"]

//middleware
app.use(json())

app.get("/", (req, res) => {
  res.send(`
    <body>
        <h1>DATA:</h1>
        <p>${data}</p>
    </body>
    `)
})

app.get("/api/data", (req, res) => {
  console.log("Got all users")
  res.send(data)
})

app.post("/api/data", (req, res) => {
  const newEntry = req.body
  console.log(newEntry)
  data.push(newEntry.name)
  res.sendStatus(201)
})

app.delete("/api/data", (req, res) => {
  data.pop() // remove last entry from data
  console.log("Removed last entry from data")
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
