import Contract from "../models/Contract.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const createContract = async (req, res) => {
  try {
    const {
      workerId,
      type,
      totalAmount,
    } = req.body;

    const remainingAmount = totalAmount;

    const contract = await Contract.create({
      worker: workerId,
      type,
      totalAmount,
      remainingAmount,
    });

    await Notification.create({
      user: workerId,
      title: "Contract Signed",
      message:
        "You have entered a training sponsorship contract",
      type: "admin",
    });

    res.status(201).json({
      message: "Contract created",
      contract,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const payContract = async (req, res) => {
  try {
    const { amount } = req.body;

    const contract = await Contract.findById(
      req.params.id
    );

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }

    contract.paidAmount += amount;
    contract.remainingAmount -= amount;

    if (contract.remainingAmount <= 0) {
      contract.status = "completed";
      contract.endDate = new Date();
    }

    await contract.save();

    await Notification.create({
      user: contract.worker,
      title: "Contract Payment",
      message: `Payment of ${amount} received`,
      type: "payment",
    });

    res.json({
      message: "Payment recorded",
      contract,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({
      worker: req.user.id,
    });

    res.json(contracts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};