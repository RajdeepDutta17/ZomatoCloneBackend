require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  const { email, menu } = req.body;

  const lineItems = menu[0].menu.map((item) => {
    if (item.qty > 0) {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      };
    }
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.SERVER_URL}/response.html`,
    cancel_url: `${process.env.SERVER_URL}/failure.html`,
    customer_email: email,
  });

  res.json({ id: session.id });
};
