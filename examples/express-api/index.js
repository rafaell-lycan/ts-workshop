import express from 'express'

const PORT = 8080

const tasks = [
  {
    text: "Learn about React ⚛️",
    isCompleted: false
  },
  {
    text: "Meet friend for lunch 🍔",
    isCompleted: false
  },
  {
    text: "Build really cool todo app with TypeScript 🚀",
    isCompleted: false
  }
]

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GENERAL ROUTES
app.get('/', (_, res) => res.send('Hello'))

app.post('/', (req, res) => {
  const { name = 'There'} = req.body || {}

  res.send(`Hello ${name}`)
})

// RESOURCE:TODOS
app.get('/todos', (_, res) => {
  res.json(tasks)
})

app.post('/todos', (req, res) => {
  const { text } = req.body || {}

  if(!text) throw new Error('Attribute "text" is required')

  tasks.push({ text, isCompleted: false })

  res.json(tasks)
})

app.put('/todos/:id/complete', (req, res) => {
  const { id } = req.params || {}

  if(!tasks[id]) throw new Error('Todo does not exists')

  tasks[id].isCompleted = true

  res.json(tasks)
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params || {}

  if(!tasks[id]) throw new Error('Todo does not exists')

  tasks.splice(id, 1)

  res.json(tasks)
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
