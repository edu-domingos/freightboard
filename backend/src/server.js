const app = require('./app');
const connectDB = require('./config/database');

connectDB(); // conecta ao MongoDB

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});