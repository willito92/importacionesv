const {Router} = require('express');
const router = Router();
const{isAuthenticated}=require('../helpers/auth');

const{renderOrderForm, createNewOrder, renderOrders, renderEditForm, updateOrder, deleteOrder}=require('../controllers/orders.controller.js');

//Create Order
router.get('/orders/add', isAuthenticated, renderOrderForm);
router.post('/orders/new-order', isAuthenticated, createNewOrder);

//Get all orders
router.get('/orders', isAuthenticated, renderOrders);

//Edit orders
router.get('/orders/edit/:id', isAuthenticated, renderEditForm);
router.put('/orders/edit/:id', isAuthenticated, updateOrder)

//delete orders
router.delete('/orders/delete/:id', isAuthenticated, deleteOrder);



module.exports=router;

