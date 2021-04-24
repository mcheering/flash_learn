import express from 'express';
import mongoose from 'mongoose';
import Card from '../models/cards.js';

const router = express.Router();

export const fetchCards = async (req, res) => {
      try {
            const allCards = await Card.find({ cardUserId: req.userId })
            res.status(200).json(allCards)
      } catch (error) {
            res.status(404).json({ message: error })
      }
}

export const createCard = (req, res) => {


      const newCard = new Card({
            name: req.body.name,
            cardUserId: req.body.cardUserId,
            topic: req.body.topic,
            term: req.body.term,
            definition: req.body.definition,
            selectedFile: req.body.selectedFile,
            createdAt: new Date().toISOString()
      })

      try {
            newCard.save().then((card) => {
                  res.status(200).json(card)
            })


      } catch (error) {
            res.status(409).json({ message: error })
      }
}

export const updateCard = async (req, res) => {
      const { id } = req.params;
      const { name, cardUserId, topic, term, definition, selectedFile } = req.body
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

      const updatedCard = { name, cardUserId, topic, term, definition, selectedFile, id };

      await Card.findByIdAndUpdate(id, updatedCard, { new: true });

      res.json(updatedCard);
}

export const deleteCard = async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

      await Card.findByIdAndRemove(id);
      res.json({ id })
}
