import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const App = () => {
  const [foodName, setFoodName] = useState('')
  const [price, setPrice] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [img, setImg] = useState('')
  const [editingItem, setEditingItem] = useState('')

  const [newFoodName, setNewFoodName] = useState('')
  const [newPrice, setNewPrice] = useState(0)
  const [newImg, setNewImg] = useState('')
  useEffect(() => {
    listFoods()
  }, [])

  const listFoods = () => {
    Axios.get("https://crud-mern-food.herokuapp.com/read").then((response) => {
      setFoodList(response.data)
    })
  }

  const addToList = () => {
    Axios.post("https://crud-mern-food.herokuapp.com/insert", { foodName: foodName, price: price, img: img ? img : "https://dummyimage.com/300.png/09f/fff" }).then(() => {
      listFoods()
      setPrice(0)
      setFoodName('')
      setImg('')
    })
  }
  const updateFood = async (item) => {
    Axios.put("https://crud-mern-food.herokuapp.com/update",
      {
        id: item._id, newFoodName: newFoodName ? newFoodName : item.foodName,
        newPrice: newPrice ? newPrice : item.price,
        newImg: newImg ? newImg : item.img
      }).then(() => {
        setEditingItem('')
        setNewFoodName('')
        setNewPrice(0)
        setNewImg('')
        listFoods()
      })
  }
  const deleteFood = (id) => {
    Axios.delete(`https://crud-mern-food.herokuapp.com/${id}`).then(() => {
      listFoods()
    })
  }

  const cancelEditing = () => {
    setEditingItem('')
    setNewFoodName('')
    setNewPrice(0)
    setNewImg('')
  }
  return (
    <div>
      <div className="container my-3">
        <h4 className="text-primary">CRUD using MongoDB, Express, React and Node</h4>
        <div className="border-top">
          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary" id="basic-addon1">
                <i className="far fa-burger-soda text-white"></i>
              </span>
            </div>
            <input onChange={(event) => { setFoodName(event.target.value) }} value={foodName} type="text" className="form-control" placeholder="Food name" />
          </div>
          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary text-white">
                R$
            </span>
            </div>
            <input onChange={(event) => { setPrice(event.target.value) }} value={price} type="number" className="form-control" placeholder="Price" />
          </div>
          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary">
                <i className="far fa-images text-white"></i>
              </span>
            </div>
            <input onChange={(event) => { setImg(event.target.value) }} value={img} type="text" className="form-control" placeholder="Food image link (optional)" />
          </div>
          <small className="text-muted">Insert a link to put as your food photo. Right size: 300x300</small>
          <button onClick={addToList} className="btn btn-primary mt-4 col-12">Add to list</button>
          <div className="row mt-4">
            {
              foodList && foodList.map((item, key) => {
                return editingItem === item._id ?
                  <div className="col-md-3 mb-2" key={key}>
                    <div className="card h-100">
                      <div style={{ height: 200 }} className="align-items-center justify-content-center d-flex">
                        <input onChange={(event) => { setNewImg(event.target.value) }} defaultValue={item.img} style={{ width: '90%' }} type="text" className="form-control" />
                      </div>
                      <div className="card-body">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text bg-primary" id="basic-addon1">
                              <i className="far fa-burger-soda text-white"></i>
                            </span>
                          </div>
                          <input onChange={(event) => { setNewFoodName(event.target.value) }} type="text" className="form-control" placeholder="Food name" defaultValue={item.foodName} />
                        </div>
                        <div className="input-group mt-1">
                          <div className="input-group-prepend">
                            <span className="input-group-text bg-primary text-white">
                              R$
                          </span>
                          </div>
                          <input onChange={(event) => { setNewPrice(event.target.value) }} type="number" className="form-control" placeholder="Price" defaultValue={item.price} />
                        </div>
                        <button type="submit" onClick={() => updateFood(item)} className="btn btn-primary mt-2">Salvar</button>
                        <button onClick={cancelEditing} className="btn btn-danger ml-2 mt-2">Cancelar</button>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="col-md-3 mb-2" key={key}>
                    <div className="card h-100">
                      <img height="250px" width="300px" src={item.img} className="card-img-top" alt={'imagem'} />
                      <div className="card-body">
                        <h5 className="card-title">{item.foodName}</h5>
                        <p className="card-text">R${item.price}</p>
                        <button onClick={() => setEditingItem(item._id)} className="btn btn-primary">Editar</button>
                        <button onClick={() => deleteFood(item._id)} className="btn btn-danger ml-2">Excluir</button>
                      </div>
                    </div>
                  </div>
              }
              )
            }
          </div>
        </div>
      </div>
      <footer class="bg-primary p-3 text-light mt-auto">
        <div class="container d-flex justify-content-start align-items-center">
          <small>
            Escola Técnica Estadual Monteiro Lobato
          <br />
              Curso Técnico em Informática
          <br />
                Disciplina de Criação de Sites
          <br />
                  Professor Cândido Farias
        </small>
        </div>
      </footer>
    </div>
  )
}
export default App