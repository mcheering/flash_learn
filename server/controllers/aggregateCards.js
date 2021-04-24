import express from 'express';
import mongoose from 'mongoose';
import Card from '../models/cards.js';

const router = express.Router();

export const aggregateSubjects = async (req, res) => {
      try {


            Card.collection.distinct("topic", { cardUserId: req.userId }, (error, topics) => {
                  if (error) {
                        res.json(error)
                  }
                  res.json(topics)
            })

      } catch (error) {
            res.status(404).json({ message: error })
            console.log(error)
      }
}

export const getCardForTopic = async (req, res) => {
      try {
            const cardsForTopic = await Card.find({
                  topic: req.params.topic,
                  cardUserId: req.userId
            })

            res.status(200).json(cardsForTopic)
      } catch (error) {
            res.status(404).json({ message: error })
            console.log(error)
      }
}