const express = require("express")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))


//rotas
app.get("/",(req,res)=>{

    res.render("index")

})//fim get
        
    app.post("/",(req,res)=>{

        const history = fs.readFileSync("./history.json")
        const histoJson = JSON.parse(history)
        const id = uuid.v4()
        const {nome, idade, nacionalidade} = req.body
        
        histoJson.push({
            nome,
            idade,
            nacionalidade,
            id
        })

        const histotring = JSON.stringify(histoJson)
        fs.writeFileSync("./history.json",histotring)

        res.status(202).json(histoJson)

    })//fim post

      
        app.put("/serv/:id?",(req,res)=>{

            const histo = fs.readFileSync("./history.json")
            const hisJson = JSON.parse(histo)
            const {id} = req.params
        id.replace('{')
            const {nome, idade, nacionalidade} = req.body
            
        const position = hisJson.findIndex( user => user.id === id )

        hisJson.splice(position,1,{nome,idade,nacionalidade,id} )


        const histrin = JSON.stringify(hisJson)
        fs.writeFileSync("./history.json",histrin)

        console.log(req.params)
        res.status(200).json(hisJson)

        })//fimput



app.delete("/serv/:id?",(req,res)=>{

    const histo = fs.readFileSync("./history.json")
    const hisJson = JSON.parse(histo)
    
    const id = req.params
     
    const position = hisJson.findIndex( user => user.id === id )


    hisJson.splice(position,1,)


const histrin = JSON.stringify(hisJson)
fs.writeFileSync("./history.json",histrin)

    
})//fimdelete


//servidor
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`servi rodando na porta ${port}`)
})