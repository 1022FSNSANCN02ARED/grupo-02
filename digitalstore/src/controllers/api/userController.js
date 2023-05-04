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
    }
}