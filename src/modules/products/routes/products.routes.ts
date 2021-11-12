import Router from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Segments, Joi } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);
productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required,
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required,
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
