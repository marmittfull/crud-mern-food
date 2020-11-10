import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const App = () => {
  const [foodName, setFoodName] = useState('')
  const [price, setPrice] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [img, setImg] = useState('')

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", { foodName: foodName, price: price, img: img ? img : "https://lehighvalleyicearena.com/wp-content/uploads/2014/08/300x200.gif" })
    console.log('test');
  }
  return (
    <div className="container my-3">
      <h4 className="text-primary">CRUD using MongoDB, Express, React and Node</h4>
      <div className="border-top">
        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text bg-primary" id="basic-addon1">
              <i className="far fa-burger-soda text-white"></i>
            </span>
          </div>
          <input onChange={(event) => { setFoodName(event.target.value) }} type="text" className="form-control" placeholder="Food name" />
        </div>
        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text bg-primary text-white">
              R$
            </span>
          </div>
          <input onChange={(event) => { setPrice(event.target.value) }} type="number" className="form-control" placeholder="Price" />
        </div>
        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text bg-primary">
            <i className="far fa-images text-white"></i>
            </span>
          </div>
          <input onChange={(event) => { setImg(event.target.value) }} type="text" className="form-control" placeholder="Food image link (optional)" />
        </div>
          <small className="text-muted">Insert a link to put as your food photo. Right size: 300x300</small>
        <button onClick={addToList} className="btn btn-primary mt-4 col-12">Add to list</button>
        <div className="row mt-4">
          {
            foodList && foodList.map((item, key) =>
              <div className="col-md-3" key={key}>
                <div className="card h-100">
                  <img height="250px" width="300px" src={item.img} className="card-img-top" alt={'imagem'} />
                  <div className="card-body">
                    <h5 className="card-title">{item.foodName}</h5>
                    <p className="card-text">R${item.price}</p>
                    <button className="btn btn-primary">Editar</button>
                    <button className="btn btn-danger ml-2">Excluir</button>
                  </div>
                </div>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}
export default App