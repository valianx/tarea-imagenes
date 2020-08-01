const Sequelize = require('sequelize');

const sequelize = new Sequelize("d3flef4iovci", "ccelasmvjghjbs", "292613e08d151653726dea15e5c4ba5456fbe3ab5daf3cc4e31aec96b84d70ad", {
    host: "ec2-34-192-173-173.compute-1.amazonaws.com",
    port: "5432",
    dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        1346
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize