const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/api/onboard-link', async (req, res) => {
  const { company_id, partner_user_id } = req.body;
  try {
    const response = await fetch('https://sandbox.checkhq.com/v1/components/company_onboard_link', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CHECK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_id,
        partner_user_id,
        environment: 'sandbox'
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate onboard link' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
