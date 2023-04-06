const { User }= require('../../database/models');
const pageSize = 10;
module.exports= {
    list: async (req,res)=>{
        const page = Number(req.query.page) || 1;
        const offset = (page - 1)* pageSize;
        
        const {count,rows} = await User.findAndCountAll({
            limit: pageSize,
            offset: offset
        });
        
        
        res.json({
            meta:{
                status: 200,
                total: 10,
                url: req.orinalUrl,
            },
            data: rows,
        });
    }
}