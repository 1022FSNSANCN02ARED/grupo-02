const productos=[
    {
        "id": 1,
        "nombre": "Auriculares Redragon H120 Ares PC",
        "precio": 3850,
        "categoria": "Auriculares",
        "img":"auriculares-redragon.jpg",
        "descripcion": "Este es un auricular para PC",
        "oferta": false,
        "porcentaje": 0
    },
    {
        "id": 2,
        "nombre": "Auriculares HyperX Cloud Flight Black Wireless",
        "precio": 25150,
        "categoria": "Auriculares",
        "img":"auriculareshyperx.jpg",
        "descripcion": "Este es un auricular para PC",
        "oferta": true,
        "porcentaje": 15
    },
    {
        "id": 3,
        "nombre": "Gabinete ASUS ROG STRIX GX601 Helios Evangelion Edition ARGB ",
        "precio": 138.200,
        "categoria": "Gabinetes",
        "img":"gabinete-asus.jpg",
        "descripcion": "Este es un gabinete ASUS",
        "oferta": true,
        "porcentaje": 10
    },
    {
        "id": 4,
        "nombre": "Gabinete Be Quiet! DARK BASE PRO 900 Black Rev 2",
        "precio": 87900,
        "categoria": "Gabinetes",
        "img":"gabinete.png",
        "descripcion": "Este es un gabinete tradicional",
        "oferta": false,
        "porcentaje": 0
    },
    {
        "id": 5,
        "nombre": "Memoria GeiL DDR4 16GB 3000MHz Super Luce RGB Black",
        "precio": 41500,
        "categoria": "Memorias RAM",
        "img":"memoria-geil.jpg",
        "descripcion": "Este es una memoria RAM marca Geil",
        "oferta": true,
        "porcentaje": 20
    },
    {
        "id": 6,
        "nombre": "Memoria Team DDR4 8GB 3200Mhz T-Force Night Hawk White RGB",
        "precio": 40100,
        "categoria": "Memorias RAM",
        "img":"memoria-team.jpg",
        "descripcion": "Este es una memoria RAM marca Team",
        "oferta": false,
        "porcentaje": 0
    },
    {
        "id": 7,
        "nombre": "Mother Asrock B365M BULK ",
        "precio": 7100,
        "categoria": "Motherboard",
        "img":"motherasrock.jpg",
        "descripcion": "Este es un motherboard  marca Asrock",
        "oferta": false,
        "porcentaje": 0
    },
    {
        "id": 8,
        "nombre": "Mother ASUS ROG STRIX B550-XE Gaming Wifi AM4 ",
        "precio": 95300,
        "categoria": "Motherboard",
        "img":"motherBord.jpg",
        "descripcion": "Este es un motherboard  marca Asus",
        "oferta": true,
        "porcentaje": 15
    },
    {
        "id": 9,
        "nombre": "Teclado Redragon Harpe PRO K503 RGB ESP",
        "precio": 5900,
        "categoria": "Teclados",
        "img":"teclado-redragon.jpg",
        "descripcion": "Este es un teclado Redragon",
        "oferta": false,
        "porcentaje": 0
    },
    {
        "id": 10,
        "nombre": "Teclado Mecanico HP HyperX Alloy Origins 60 Switch RED LA",
        "precio": 16600,
        "categoria": "Teclados",
        "img":"teclado.png",
        "descripcion": "Este es un teclado inalambrico ",
        "oferta": true,
        "porcentaje": 10
    },

        {
        "id": 11,
        "nombre": "Monitor LG Leg 19' 19M38A-B VGA",
        "precio": 38700,
        "categoria": "Monitores",
        "img":"monitorlg.jpg",
        "descripcion": "Este es un monitor LG ",
        "oferta": true,
        "porcentaje": 10
    },

        {
        "id": 12,
        "nombre": "Monitor Sansung 19' A330N HDMI",
        "precio": 43240,
        "categoria": "Monitores",
        "img":"monitor_sansung.jpg",
        "descripcion": "Este es un monitor Sansung ",
        "oferta": false,
        "porcentaje": 0
    },

     {
        "id": 13,
        "nombre": "Cooler CPU Deepcool UP551 ARGB",
        "precio": 6000,
        "categoria": "Coolers",
        "img":"monitor_sansung.jpg",
        "descripcion": "Este es un cooler tradicional",
        "oferta": false,
        "porcentaje": 0
    },

         {
        "id": 14,
        "nombre": "Cooler CPU Master Hyper 212 ARGB",
        "precio": 16400,
        "categoria": "Coolers",
        "img":"coolermax.jpg",
        "descripcion": "Este es un cooler premium ",
        "oferta": true,
        "porcentaje": 15
    },

            {
        "id": 15,
        "nombre": "Tablet Sansung Galaxy tabA7 Lite Silver SM-T220N",
        "precio": 45180,
        "categoria": "Tablet",
        "img":"tablet1.jpg",
        "descripcion": "Esta es una tablet A7 Lite",
        "oferta": false,
        "porcentaje": 0
    },

            {
        "id": 16,
        "nombre": "Tablet Sansung Galaxy tabA8 wifi Dark Grey SM-X200N",
        "precio": 72960,
        "categoria": "Tablets",
        "img":"tablet2.jpg",
        "descripcion": "Esta es una tablet A8 Dark",
        "oferta": true,
        "porcentaje": 15
    }
]

function buscarProd(id){
    const producto = productos.find(plato=>plato.id==id)
    return producto;
}

module.exports = {
    index: (req,res) =>{
        res.render("index")
    },
    register: (req,res)=> {
        res.render("register")
    },
    login: (req,res)=>{
        res.render("login")
    },
    contacto: (req,res)=>{
        res.render("contacto")
    },
    ayuda: (req,res)=>{
        res.render("ayuda")
    },
    carrito: (req,res)=>{
        res.render("carrito")           
    },
    producto: (req,res)=>{
        const id = req.params.id;
        const producto = buscarProd(id);
        res.render("producto",{
            producto
        })
    },
    listaProducto: (req,res)=>{
        res.render("listaProducto")
    },
    agregarProducto: (req,res)=>{
        res.render("agregarProducto")
    }
}