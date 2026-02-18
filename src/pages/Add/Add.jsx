import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({ setShowSidebar }) => {
  const [image, setImage] = useState(null)
  const backendURL = 'https://food-delivery-website-e-commerce-backend.onrender.com'
  const [data, setData] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!image) {
      toast.error("Please upload an image")
      return
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('image', image)

    try {
      const response = await axios.post(
        `${backendURL}/api/food/add`,
        formData
      )

      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: ''
        })
        setImage(null)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <button onClick={() => setShowSidebar(true)}>BACK</button>

      <form className='conatiner-section' onSubmit={onSubmitHandler}>
        <div className='image-upload'>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt="upload" />
            <h1>Upload image</h1>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className='food-name'>
          <h1>Food name</h1>
          <input
            onChange={onChangeHandler}
            type="text"
            name='name'
            value={data.name}
            placeholder='Add a food name'
            required
          />
        </div>

        <div className='food-price'>
          <h1>Price</h1>
          <input
            onChange={onChangeHandler}
            name='price'
            value={data.price}
            type='number'
            placeholder='...$...'
            required
          />
        </div>

        <div className='food-description'>
          <h1>Description</h1>
          <textarea
            onChange={onChangeHandler}
            name='description'
            value={data.description}
            placeholder='Add a description'
          />
        </div>

        <div className='food-category'>
          <h1>Choose food category</h1>
          <select
            onChange={onChangeHandler}
            name='category'
            value={data.category}
            required
          >
            <option value="">Select</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Rolls">Rolls</option>
            <option value="Salad">Salad</option>
            <option value="Cake">Cake</option>
            <option value="Pure veg">Pure veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>

        <div className='food-add-btn'>
          <button type='submit' className='add-button'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default Add
