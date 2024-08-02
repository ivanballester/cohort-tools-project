const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const User = require("../models/User.model");

const router = require("express").Router();

const tokenValidation = require("../middlewares/auth.middleware")

// POST "/api/auth/signup" => registrar el usuario (CREAR EL DOCUMENTO DE USUARIO)
router.post("/signup", async (req, res, next) => {

  console.log(req.body)
  const { email, name, password } = req.body

  // validaciones de backend
  if (!email || !password) {
    res.status(400).json({errorMessage: "Email y password son obligatorios"})
    return // si esto ocurre, deten la ejecucion de la ruta
  }

  // verificar que la contraseña sea lo suficiente fuerte
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (passwordRegex.test(password) === false) {
    res.status(400).json({errorMessage: "La contraseña debe tener min 8 caracteres, una minuscula, una mayuscula y algun otro caracter"})
    return // si esto ocurre, deten la ejecucion de la ruta
  }

  // validacion de email
  // validation que el username sea unico

  
  try {
    // Verificar que no existe un usuario con el mismo correo
    const foundUser = await User.findOne( { email: email } )
    if (foundUser !== null) {
      // el usuario ya existe
      res.status(400).json({errorMessage: "Usuario ya registrado con ese correo electronico"})
      return // si esto ocurre, deten la ejecucion de la ruta
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    
    await User.create({
      email,
      name,
      password: hashPassword
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

// POST "/api/auth/login" => autenticar al usuario (validar las credenciales) y enviar el token
router.post("/login", async (req, res, next) => {

  const {email, password} = req.body

  if (!email || !password) {
    res.status(400).json({errorMessage: "Email y password son obligatorios"})
    return // si esto ocurre, deten la ejecucion de la ruta
  }

  try {
    
    const foundUser = await User.findOne({email: email})
    console.log(foundUser)
    if (foundUser === null) {
      res.status(400).json({errorMessage: "Usuario no registrado con ese correo electronico"})
      return // si esto ocurre, deten la ejecucion de la ruta
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (isPasswordCorrect === false) {
      res.status(400).json({errorMessage: "Contraseña no correcta"})
      return // si esto ocurre, deten la ejecucion de la ruta
    }

    // si la ruta llega a este punto ya hemos autenticado al usuario. Es el usuario es quien dice ser.

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      // cualquier valor estatico del usuario deberia ir aqui (roles, username)
    }

    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "7d" }
    )

    res.status(200).json({ authToken })

  } catch (error) {
    next(error)
  }

})


// GET "/api/auth/verify" => validar el token (existencia, autenticidad y validez)
router.get("/verify", tokenValidation, (req, res, next) => {

  console.log(req.payload) // ! para que el backend sepa quien es el usuario dueño del token. QUIEN ESTA HACIENDO LAS LLAMADAS.

  res.status(200).json(req.payload) // ! esto es para que el frontend sepa quien es el usuario dueño de ese token. QUIEN ESTA NAVEGANDO POR LA PAGINA.

})

module.exports = router