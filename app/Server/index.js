const express = require('express');
const sequelize = require('./config/dbConfig');
const userRoutes = require('./routes/user.route');
const noteRoute = require('./routes/note.route');
const { User, Notes } = require('./models');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes);
app.use('/', noteRoute)

User.belongsToMany(Notes, { through: 'UserNotes' });
Notes.belongsToMany(User, { through: 'UserNotes' });
// sequelize.sync({ force: true });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection OKOK');
    } catch (error) {
        console.error('Connection pas réussite car:', error);
    }
})();

module.exports = app;
