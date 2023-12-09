import Kategori from './assets/kategori'
import Kendaraan from './assets/kendaraan'
import Peralatan from './assets/peralatan'
import Bibit from './assets/bibit'
import FormBeli from './assets/form-beli'
import KonfirmasiBeli from './assets/konfirmasi-beli'
import DataAdmin from './assets/dataAdmin'
import Login from './login'
import './App.css'


import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

function App(e) {
  const [dataProfile,setDataProfile] = useState([null])
  useEffect(()=>{
    setDataProfile(e)
  },[])  
  useEffect(()=>{
    if (dataProfile.status != 'admin') {
      document.getElementById('data-admin').classList.add('hide')
    }if (dataProfile.status == 'admin') {
      document.getElementById('data-admin').classList.remove('hide')
    }

    document.getElementById('username').value = dataProfile.username
    document.getElementById('nama-lengkap').value = dataProfile.nama_lengkap
    document.getElementById('password').value = dataProfile.password
    document.getElementById('alamat').value = dataProfile.alamat
    document.getElementById('no-telephone').value = dataProfile.no_telp
  })

  function showNavSide() {
    let navSide = document.getElementById('nav-side')
    navSide.classList.add('active')
  }
  function hideNavSide() {
    let navSide = document.getElementById('nav-side')
    navSide.classList.remove('active')
  }
  function toDataBarang() {
    const body = document.getElementById('root')
    ReactDOM.createRoot(body).render(<DataAdmin {...dataProfile}/>)
  }
  function logout() {
    const body = document.getElementById('root')
    ReactDOM.createRoot(body).render(<Login/>)
  }
  
  function updateUser() {
    axios.post('http://localhost:8000/user/update',{
      username:document.getElementById('username').value,
      password:document.getElementById('password').value,
      nama:document.getElementById('nama-lengkap').value,
      alamat:document.getElementById('alamat').value,
      noTelp:document.getElementById('no-telephone').value
    }).then(res=>{
      document.getElementById('dialog-update-data').innerText = res.data
      document.getElementById('alert-update-user').click()
    })
  }

  return (
    <div id='set'>
      <div class="main">
        {/* profil */}
        <div class="nav-side" id='nav-side' style={{borderRadius:'30px 0px 0px 30px'}}>
          <div class="profile">
            <h1>PROFILE</h1>
            <div>
              <label htmlFor="">Nama Lengkap</label>
              <input type="text" id='nama-lengkap' defaultValue={'Default'}/>
            </div>
            <div>
              <label htmlFor="">Username</label>
              <input type="text" id='username' disabled value={'Default'}/>
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="text" id='password' defaultValue={'Default'}/>
            </div>
            <div>
              <label htmlFor="">Alamat</label>
              <input type="text" id='alamat' defaultValue={'Default'}/>
            </div>
            <div>
              <label htmlFor="">NO.Telephone</label>
              <input type="text" id='no-telephone' defaultValue={'Default'}/>
            </div>

            <button onClick={updateUser}>UBAH</button>
            <button onClick={logout}>LOG OUT</button>

          </div>
          <button class="btn-close" onClick={()=>{hideNavSide()}}>&#10006;</button>
        </div>
        {/* profil */}
        <nav>
          <div class="_navbar kiri">
            <ul>
              <li><a href="#kategori">Kategori</a></li>
              <li><a href='#footer'>Customer Service</a></li>
            </ul>
          </div>
          <div class ="nav-img" id='nav-img'>
            <img src="efarm 1.svg" alt="Ini Icon Toko" />
          </div>
          <div class="_navbar kanan">
            <ul>
              <li>
                <a href="#" id='data-admin' onClick={()=>{toDataBarang()}}><span class="	glyphicon glyphicon-shopping-cart"/> Data Admin</a>
              </li>
              <li>
                <a href="#" onClick={()=>{showNavSide()}}><span class="	glyphicon glyphicon-user" /> User</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="navbar-banner">
          <img src="banner 2.png" alt="" />
        </div>

        <Kategori/>
        <Kendaraan/>
        <Peralatan/>
        <Bibit/>
        <footer id='footer'>
          <img src="./logo putih 1.png" alt="" srcset="" />
          <p>copyright : kelompok kami</p>
        </footer>
      </div>
      <FormBeli/>
      <KonfirmasiBeli/>
      {/* Action Ubah Data User */}
      <button type="button" data-toggle="modal" data-target="#modal-alert-update-user" id="alert-update-user" style={{display:'none'}}></button>
            <div id="modal-alert-update-user" class="modal fade" role="dialog">
                <div class="modal-dialog">

                {/* <!-- Modal content--> */}
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">ACTION</h4>
                        </div>
                        <div class="modal-body">
                            <h6 id="dialog-update-data"></h6>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Konfirmasi</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default App
