const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGO_URI
mongoose.connect(url)
  .then(result => {
    console.log(`${result} connected to MongoDB`)
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNoValidate = (number) => {
  const phonePattern = /^\d{2,3}-\d+/
  return phonePattern.test(number) && number.length >= 8
}

const personSchema = new mongoose.Schema({
    name: {
    type: String,
    minLength: 3,
    required: true
  },
    number: {
      type: String,
      validate: {
        validator: phoneNoValidate,
        message: props => `${props.value} is not a valid phone number!`
      },
      minLength: 8,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)