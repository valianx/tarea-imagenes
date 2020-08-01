const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    let { nombre, email, password } = req.body


    if (nombre == null || email == null || password == null) return res.status(400).json("Debe ingresar los datos requeridos");

    const enc = await encriptar(req.body.password);
    try {
        const user = await User.build({
            nombre: req.body.nombre,
            email: req.body.email,
            password: enc,
        })

        await user.save().then(
            data => {
                let tokenData = {
                    nombres: data.nombres,
                    rol: data.rol,
                };

                token = jwt.sign(tokenData, "Secret Password", {
                    expiresIn: 60 * 60 * 24
                });

                return res.status(200).json({
                    message: "User created successfully",
                    id: data.dataValues.id,
                    nombre: data.dataValues.nombre,
                    token: token,
                });
            }
        ).catch(
            err => {
                return res.status(500).json("Internal Server Error: " + err)
            }
        )
    } catch (e) {
        return res.status(500).json("Internal Server Error: " + e);
    }
};



const getUsers = async (req, res) => {
    try {
        User.findAll({
            order: [["createdAt", "DESC"]],
        }).then((data) => {
            return res.status(200).json(data);
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
};
const getUserById = async (req, res) => {
    const _id = req.params.id;
    try {
        User.findOne({ where: { id: _id } }).then(data => {
            return res.status(200).json(data);
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
};
const putUser = async (req, res) => {
    const id = req.params.id;
    let enc
    if (req.body.password != null) {
        if (req.body.password.length < 13) {
            enc = await encriptar(req.body.password);
        } else {
            enc = req.body.password;
        }
    }
    try {
        await User.update(
            {
                nombre: req.body.nombre,
                email: req.body.email,
                password: enc,
            },
            { where: { id: id } }
        ).then(row => {
            return res.status(200).json("ok");
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
};
const deleteUser = async (req, res) => {

    await User.destroy({
        where: {
            id: id
        }
    }).then(data => {
        return res.status(200).json("eliminado");

    }).catch(e => {
        return res.status(500).json("Internal Server Error");

    })
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email) {
            User.findOne({ where: { email: email } }).then(async data => {
                if (data) {
                    const iguales = await compararPass(
                        password,
                        data.dataValues.password
                    );
                    if (iguales == false)
                        return res.status(400).json("Contraseña errónea");

                    var tokenData = {
                        nombres: data.nombre,
                    };
                    var token = jwt.sign(tokenData, `${process.env.TOKEN_SECRET}`, {
                        expiresIn: 60 * 60 * 24
                    });

                    let respuesta = {
                        id: data.id,
                        nombre: data.nombre,
                        token: token
                    };
                    return res.status(200).json(respuesta);
                } else {
                    return res.status(500).json("Email no existe");
                }
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json("Email no existe");
    }
};

const compararPass = async (password, pass) => {
    return await bcrypt.compare(password, pass);
};

const tokenValidation = (req, res, next) => {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) return res.status(401).json("Accesso denegado");
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];
    try {
        const payload = jwt.verify(
            token,
            `${process.env.TOKEN_SECRET}`,
            (err, decoded) => {
                if (err) {
                    req.authenticated = false;
                    req.decoded = null;
                } else {
                    req.decoded = decoded;
                    req.authenticated = true;
                    next();
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const encriptar = async password => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

module.exports = {
    tokenValidation, createUser, getUsers, putUser, deleteUser, getUserById, loginUser
};