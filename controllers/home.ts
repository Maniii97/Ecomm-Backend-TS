
const homePage = async(_req : any, res : any)=>{
    res.sendFile(__dirname+'public/index.html')
}

export default { homePage }