import { Router } from 'express';

import verifyShape from '../utils/verifyShape';
import { addBookToCollectionSchema, deleteBookFromCollectionSchema, newCollectionSchema } from '../schemas/collections.schema';
import checkToken from '../middlewares/user/checkToken';
import { addBook, createCollection, deleteBook, deleteCollection, getAllCollections, getCollection } from '../controllers/collections.controler';
import checkCollection from '../middlewares/collection/checkCollection';
import { checkBook } from '../middlewares/lending';
import { checkBookInCollection } from '../middlewares/collection/checkBookInCollection';

const collections = Router();

collections.post('', verifyShape(newCollectionSchema), checkToken, createCollection);
collections.get('', checkToken, getAllCollections);
collections.get('/:id', checkToken, checkCollection, getCollection);
collections.put('/book/:id', verifyShape(addBookToCollectionSchema), checkToken, checkCollection, checkBook, addBook);
collections.delete('/:id', checkToken, checkCollection, deleteCollection)
collections.delete('/book/:id', verifyShape(deleteBookFromCollectionSchema), checkToken, checkCollection, checkBookInCollection, deleteBook);

export default collections;