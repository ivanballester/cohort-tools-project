function errorHandling(app){
app.use((req,res,next)=>{
    res.status(404).json({errorMessage: "Ruta no encontrada"})
})
app.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).json({errorMessage: "Lo sentimos, hubo un problema de servidor"})
})
}


module.exports = errorHandling