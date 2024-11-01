const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

// Sample data (in place of a database)
let items = [
    { id: 1, name: 'Item 1', description: 'Satish Maharaj RBL DevOps Interview', date: '2024-10-30' },
    { id: 2, name: 'Item 2', description: 'Get job as DevOps Engineer', date: '2024-11-04' },
    { id: 3, name: 'Item 3', description: 'Start working as DevOps Engineer', date: '2024-12-11' },
    { id: 4, name: 'Item 4', description: 'Make lasting positive impact', date: '2024-12-11' },
];

// CREATE - Add a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1, // Simple ID logic; usually use unique IDs in production
        ...req.body
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// READ - Get all items
app.get('/', (req, res) => {
    res.json(items);
});

// READ - Get a specific item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// UPDATE - Update an item by ID
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        Object.assign(item, req.body);
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE - Remove an item by ID
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
