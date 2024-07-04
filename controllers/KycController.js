const KycFormModel = require('../models/KycFormModel');

const KycController = {
  async createForm(req, res) {
    try {
      const { walletAddress, gmail } = req.body;
      const frontId = req.files.frontId[0].path.replace(/\\/g, '/');
      const backId = req.files.backId[0].path.replace(/\\/g, '/');

      const newData = new KycFormModel({
        frontId,
        backId,
        walletAddress,
        gmail,
      });
      await newData.save();
      res.status(200).send('Data submitted successfully');
    } catch (error) {
      res.status(500).send('Server error');
    }
  },

  async getForms(req, res) {
    try {
      const forms = await KycFormModel.find();

      // Normalize file paths
      const normalizedForms = forms.map(form => ({
        ...form._doc,
        frontId: form.frontId.replace(/\\/g, '/'),
        backId: form.backId.replace(/\\/g, '/')
      }));

      res.status(200).json({ forms: normalizedForms });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = KycController;
