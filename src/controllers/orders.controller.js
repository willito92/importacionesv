const ordersCtrl={};
const Order = require('../models/Orders');

ordersCtrl.renderOrderForm =(req, res) => {
    res.render('orders/new-order');
}

ordersCtrl.createNewOrder =async (req, res) => {
    const {producto, cantidad, createdAt}=req.body;
    const newOrder= new Order({producto, cantidad, createdAt})
    newOrder.user=req.user.id;
    await newOrder.save();
    req.flash('success_msg', 'Item Agregado');
     res.redirect('/orders');
}

ordersCtrl.renderOrders =async(req, res) => {
    const orders= await Order.find({user:req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('orders/all-orders', {orders});
}

ordersCtrl.renderEditForm =async(req, res) => {
    const order=await Order.findById(req.params.id).lean();
    if(order.user != req.user.id){
        req.flash('error_msg', 'Usuario No Autorizado');
        return res.redirect('/orders');   
       }
    res.render('orders/edit-order', {order});
}

ordersCtrl.updateOrder =async(req, res) => {
    const {cantidad}=req.body
    await Order.findByIdAndUpdate(req.params.id, {cantidad})
    req.flash('success_msg', 'Item Actualizado');
    res.redirect('/orders');
}

ordersCtrl.deleteOrder =async(req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Item Elilminado');
    res.redirect('/orders');
}








module.exports= ordersCtrl;