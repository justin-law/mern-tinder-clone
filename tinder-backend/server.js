import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors';
import path from 'path';

//0OZXsaFOhf9dYCxc

//app config
const app = express(); 
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:0OZXsaFOhf9dYCxc@cluster0.p2isa.mongodb.net/tinderdb?retryWrites=true&w=majority'

//middlewares
app.use(express.json());
app.use(Cors());

//db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//api endpoints
app.get('/', (req, res) => res.status(200).send('status ok'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

//listener
app.listen(port, ()=> console.log(`listening on localhost: ${port}`));
