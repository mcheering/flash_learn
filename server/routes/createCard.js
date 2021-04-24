import express from 'express';
import { fetchCards, createCard, updateCard, deleteCard } from '../controllers/createCards.js';
import { aggregateSubjects, getCardForTopic } from '../controllers/aggregateCards.js';
const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/', auth, fetchCards);
router.post('/', auth, createCard);
router.patch('/:id', auth, updateCard);
router.delete('/delete/:id', auth, deleteCard);
router.get('/aggregate', auth, aggregateSubjects)
router.get('/getTopics/:topic', auth, getCardForTopic)


export default router;