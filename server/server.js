const express = require('express');
const { items } = require('./data');
const { validateItem } = require('./validators');

const app = express();
const PORT = 3000;

app.use(express.json());

// Custom middleware: log the HTTP method and requested path.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/items', (req, res) => {
  const search = String(req.query.search || '').toLowerCase().trim();
  const foundItems = items.filter((item) => {
    const text = `${item.title} ${item.category} ${item.description}`.toLowerCase();
    return text.includes(search);
  });
  res.json(foundItems);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find((currentItem) => currentItem.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'Resource not found.' });
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const validationError = validateItem(req.body);
  if (validationError) return res.status(400).json({ message: validationError });

  const newItem = {
    id: Date.now(),
    title: req.body.name.trim(),
    category: typeof req.body.category === 'string' && req.body.category.trim()
      ? req.body.category.trim() : 'Other',
    description: typeof req.body.description === 'string' ? req.body.description.trim() : '',
    status: 'Useful',
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = Number(req.params.id);
  const itemExists = items.some((item) => item.id === itemId);
  if (!itemExists) return res.status(404).json({ message: 'Resource not found.' });

  const remainingItems = items.filter((item) => item.id !== itemId);
  items.splice(0, items.length, ...remainingItems);
  res.json({ message: 'Resource deleted.', id: itemId });
});

app.listen(PORT, () => {
  console.log(`Beyond Sight API is running at http://localhost:${PORT}`);
});
