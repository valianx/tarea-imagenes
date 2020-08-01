const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");
const { unlink } = require("fs-extra");

const nuevoPost = async (req, res) => {

    const post = Post.build({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        user_post: req.body.user
    });

    await post.save().then(data => {
        return res.status(200).json(data.dataValues);
    }).catch(err => {
        return res.status(500).json("Internal Server Error " + err);

    });

};

const getPost = async (req, res) => {

    Post.findAll({
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        return res.status(200).json(data);
    }).catch(rr => res.status(500).json("Internal Server Error"))

};
const getPostById = async (req, res) => {
    const _id = req.params.id;
    try {
        Post.findOne({ where: { id: _id } }).then((data) => {
            return res.status(200).json(data);
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
};

const putPost = async (req, res) => {
    const id = req.params.id;

    await Post.update(
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
        },
        { where: { id: id } }
    ).then((row) => {
        return res.status(200).json("ok");
    }).catch(err => res.status(500).json(err))


};
const deletePost = async (req, res) => {
    const id = req.params.id;

    await Post.findOne({ where: { id: id } }).then(async (data) => {
        console.log(data.dataValues);
        if (data.dataValues.imagen != null) await unlink(path.resolve("./public" + data.dataValues.imagen));
        if (data.dataValues.video != null) await unlink(path.resolve("./public" + data.dataValues.video));
    }).then(async () => {
        await Post.destroy({
            where: {
                id: id,
            },
        }).catch(
            err => res.status(500).json("error eliminar post" + err)
        );
        return res.status(200).json("eliminado");
    }).catch(e => res.status(500).json(e));

};

const nuevaImagen = async (req, res) => {
    const id = req.params.id;

    Post.findOne({ where: { id: id } }).then(async data => {
        let pathImagen = "/uploads/" + req.file.filename;
        if (data.dataValues.imagen != null) {
            try {
                await unlink(path.join(__dirname, "./../public" + data.dataValues.imagen));
            } catch (e) {
                console.log(e);
            }
        }

        await Post.update({ imagen: pathImagen, },
            { where: { id: id } })
            .then(() => {
                return res.status(200).json("imagen subida")
            }).catch(e => res.status(500).json(e))
    })
}

const nuevoVideo = async (req, res) => {
    const id = req.params.id;

    Post.findOne({ where: { id: id } }).then(async data => {
        let pathVideo = "/uploads/" + req.file.filename;
        if (data.dataValues.video != null) {
            try {
                await unlink(path.join(__dirname, "./../public" + data.dataValues.video));
            } catch (e) {
                console.log(e);
            }
        }

        await Post.update({ video: pathVideo, },
            { where: { id: id } })
            .then(() => {
                return res.status(200).json("video eliminado")
            }).catch(e => res.status(500).json(e))
    })
}

const deleteVideo = async (req, res) => {
    const id = req.params.id;

    Post.findOne({ where: { id: id } }).then(async data => {

        if (data.dataValues.video != null) {
            try {
                await unlink(path.join(__dirname, "./../public" + data.dataValues.video));
            } catch (e) {
                console.log(e);
            }
        }

        await Post.update({ video: null, },
            { where: { id: id } })
            .then(() => {
                return res.status(200).json("video eliminado")
            }).catch(e => res.status(500).json(e))
    })
}

const deleteImagen = async (req, res) => {
    const id = req.params.id;

    Post.findOne({ where: { id: id } }).then(async data => {

        if (data.dataValues.imagen != null) {
            try {
                await unlink(path.join(__dirname, "./../public" + data.dataValues.imagen));
            } catch (e) {
                console.log(e);
            }
        }

        await Post.update({ imagen: null, },
            { where: { id: id } })
            .then(() => {
                return res.status(200).json("imagen eliminada")
            }).catch(e => res.status(500).json(e))
    })
}


module.exports = {
    nuevoPost,
    getPost,
    getPostById,
    putPost,
    deletePost,
    nuevaImagen,
    nuevoVideo,
    deleteVideo,
    deleteImagen
};