const { User }= require('../../database/models');

module.exports= {
    list: async (req,res)=>{
       
        await User.findAll()
        .then((user)=>{
            let resp = {
                meta:{
                    status: 200,
                    total: user.length,
                    url: 'api/users',
                },
                data: user,
            }
            res.json(resp);
        });
       
        
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