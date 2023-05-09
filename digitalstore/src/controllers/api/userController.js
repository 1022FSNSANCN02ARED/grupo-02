const { User }= require('../../database/models');

module.exports= {
    list: async (req,res)=>{
       
        const users = await User.findAll()
        users.forEach(user=>{
            user.img = `http://localhost:3000/img/usuarios/${user.img}`
        })
        let resp = {
                meta:{
                    status: 200,
                    total: users.length,
                    url: 'api/users',
                },
                data: users,
            }
            res.json(resp);
        
    },
    detail: async (req,res)=>{
        const user = await User.findByPk(req.params.id);
        res.json({
            meta: {
                status: !user ? 404 : 200,
                url: 'api/users/:id'
            },
            data: user
        });
    },
    //***De aca para abajo a revisar**// 
    create: (req,res)=>{
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email,
            img: req.body.img,
            idRole: req.body.id_role

        })
        .then((confirm)=>{
            let respuesta;
            if(confirm){
                respuesta = {
                    meta: {
                        status:!confirm ? 404 : 200,
                        total: confirm.length,
                        url: "api/users/create",
                    },
                    data: confirm,
                }
            } else {
                respuesta = {
                    meta: {
                        status: !confirm ? 404 : 200,
                        total: confirm.length,
                        url:"api/users/create",
                    },
                    data: confirm,
                }
            }
            res.json(respuesta);
        })
        .catch((error)=> res.send(error));
    },
    update: (req,res)=>{
        let userId = req.params.id;
        User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email,
            img: req.body.img,
            idRole: req.body.id_role
        },{
            where: { id: userId },
        })
        .then((confirm)=>{
            let respuesta;
            if (confirm) {
                respuesta = {
                  meta: {
                    status: 200,
                    total: confirm.length,
                    url: "api/users/:id",
                  },
                  data: confirm,
                };
            } else {
                respuesta = {
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: "api/users/:id",
                    },
                    data: confirm,
                };
            }
            res.json(respuesta);    
        })
        .catch((error)=>res.send(error));
    },
    destroy: (req,res)=>{
        let userId = req.params.id;
        User.destroy({where: {id:userId}, force: true})
        .then((confirm)=>{
            let respuesta;
            if (confirm) {
                respuesta = {
                  meta: {
                    status: 200,
                    total: confirm.length,
                    url: "api/users/delete/:id",
                  },
                  data: confirm,
                };
            } else {
                respuesta = {
                  meta: {
                    status: 204,
                    total: confirm.length,
                    url: "api/users/destroy/:id",
                  },
                  data: confirm,
                };
              }
              res.json(respuesta);
            })
            .catch((error) => res.send(error));
        },
        
    
}