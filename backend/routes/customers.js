const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');

// Create Customer
router.post('/', auth, async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const customer = new Customer({ name, email, phone, address, createdBy: req.user.id });
        await customer.save();
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get All Customers
router.get('/', auth, async (req, res) => {
    try {
        const customers = await Customer.find({ createdBy: req.user.id });
        res.json(customers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update Customer
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        let customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ msg: 'Customer not found' });
        if (customer.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        customer = await Customer.findByIdAndUpdate(req.params.id, { $set: { name, email, phone, address } }, { new: true });
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Customer
router.delete('/:id', auth, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ msg: 'Customer not found' });
        if (customer.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await customer.remove();
        res.json({ msg: 'Customer removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
