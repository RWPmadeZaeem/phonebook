const express = require('express')

const morgan = require('morgan')

const path = require('path')

const app = express()


app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {
  if(req.method === 'POST'){
    console.log('Request Body:', JSON.stringify(req.body));
  }

  next();
})

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (req, res) => {
    res.json(persons);

})

app.get('/api/persons/:id',(req,res) =>{
  const id = req.params.id;
  const person = persons.find(person=>person.id == id)
  if(person){
    res.json(person)
  }else{
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  if(persons.find(person => person.id === id)){
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  }else{
    res.status(404).end()
  }
  
})

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if(!body.name || !body.number){
    return res.status(400).json({error: 'content missing'})
  }

  if(persons.some(person => person.name === body.name)){
    return res.status(400).json({error: 'name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000),
  
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (req, res) => {
  const now = new Date();
  const dateTime = now.toLocaleString();
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${dateTime}</p>`)
})






const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
