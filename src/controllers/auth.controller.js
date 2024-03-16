import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'

export const signup = async (req, res) => {
   try {
      const { fullName, username, password, confirmPassword, gender } = req.body

      if (password !== confirmPassword) {
         return res.status(400).json({ error: 'Passwords do not match' })
      }

      const user = await User.findOne({ username })
      if (user) {
         return res.status(400).json({ error: 'Username already exists' })
      }

      // hash password
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

      const newUser = await User({
         fullName,
         username,
         password: hashedPassword,
         gender,
         profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      })

      const token = await generateToken(newUser._id, res)
      res.cookie('jwt', token, {
         maxAge: 3 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         sameSite: 'none',
         secure: true,
      })
      req.user = newUser
      await newUser.save()

      return res.status(200).json({
         _id: newUser._id,
         fullName: newUser.fullName,
         username: newUser.username,
         profilePic: newUser.profilePic,
      })
   } catch (error) {
      console.log('Error in signup controller', error.message)
      return res.status(500).json({
         error: 'Internal Server Error',
      })
   }
}
export const login = async (req, res) => {
   try {
      const { username, password } = req.body

      const user = await User.findOne({ username })

      if (!user) {
         return res.status(400).json({ error: 'Account does not exist' })
      }

      const isPasswordCorrect = await bcryptjs.compare(password, user.password)

      if (!isPasswordCorrect) {
         return res.status(400).json({ error: 'Password is incorrect' })
      }

      const token = await generateToken(user._id, res)
      res.cookie('jwt', token, {
         maxAge: 3 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         sameSite: 'none',
         secure: true,
      })

      return res.status(200).json({
         _id: user._id,
         fullName: user.fullName,
         username: user.username,
         profilePic: user.profilePic,
      })
   } catch (error) {
      console.log('Error in login controller', error.message)
      return res.status(500).json({
         error: 'Internal Server Error',
      })
   }
}

export const logout = (req, res) => {
   try {
      res.clearCookie('jwt')
      return res.status(200).json({ message: 'Logged out successfully' })
   } catch (error) {
      console.log('Error in logout controller', error.message)
      return res.status(500).json({
         error: 'Internal Server Error',
      })
   }
}
