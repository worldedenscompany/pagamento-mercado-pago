const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mercadopago.configure({
  access_token: 'APP_USR-8758520281816824-040915-2e065818ffad982e2cd18dd7dfa84799-2367047265'
});

app.post('/criar-pagamento', async (req, res) => {
  const preference = {
    items: [{
      title: 'Pagamento LostLover',
      quantity: 1,
      unit_price: 10.99,
      currency_id: 'BRL'
    }],
    auto_return: 'approved'
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ link: response.body.init_point });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});