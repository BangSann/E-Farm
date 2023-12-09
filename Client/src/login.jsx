import axios from "axios"
import App from "./App"
import './login.css'
import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

function Login() {
    useEffect(()=>{
        const form=document.querySelector('form')
        form.addEventListener('submit',function(even) {
            even.preventDefault()
        })
    },[])
    // get data form db
    const [dataUser,setDataUser] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/user').then(result=>{
            setDataUser(result.data)
        })
    },[])
    // end get data from db
    
    function login() {
        let username = document.getElementById('username-login').value
        let password = document.getElementById('password-login').value
    
        let cekuser = true

        for(var i = 0 ; i<dataUser.length ; i++){
            if (username == dataUser[i].username && password == dataUser[i].password) {
                const form = document.getElementById('root')
                ReactDOM.createRoot(form).render(<App {...dataUser[i]}/>)

                cekuser = false
            }
        }

        if (cekuser == true) {
            document.getElementById('dialog-sign').innerText = 'USERNAME ATAU PASSWORD SALAH'
            document.getElementById('btn-user-pw').click()
        }
    }

    function daftar() {
        let username =  document.getElementById('username-daftar').value
        let password = document.getElementById('password-daftar').value
        let nama = document.getElementById('nama-daftar').value
        let noTelp = document.getElementById('noTelephone-daftar').value
        let alamat = document.getElementById('alamat-daftar').value

        let checked = true
        for(let a=0;a<dataUser.length;a++){
            if (dataUser[a].username == username) {
                checked = true
                break;
            }else{
                checked = false
            }
        }
        if (checked) {
            document.getElementById('dialog-sign').innerText = 'USERNAME TELAH DIGUNAKAN\nGUNAKAN USERNAME LAIN !!'
            document.getElementById('btn-user-pw').click()
            document.getElementById('btn-konfirmasi').style.display = 'none';
            return null
        }

        axios.post('http://localhost:8000/user/daftar',{
            username:username,password:password,nama:nama,
            alamat:alamat,noTelp:noTelp
        }).then(res=>{
            document.getElementById('dialog-sign').innerText = res.data
            document.getElementById('btn-konfirmasi').style.display = 'block';
            document.getElementById('btn-user-pw').click()
        })
    }


    function LoginFormShow() {
        document.querySelector('.login').classList.add('active')
        document.querySelector('.signin').classList.remove('active')
        const form = document.getElementById('login-form')
        ReactDOM.createRoot(form).render(
            <>
                <div class="login-img">
                    <img src="./efarm 1.svg" alt="" />
                </div>

                <h1>SELAMAT DATANG</h1>
                <h5>PARA PETANI PENGHIDUP NEGERI</h5>

                <input type="text" id="username-login" name="username-login" defaultValue={'username'} />
                <input type="password" id="password-login" name="password-login" defaultValue={'password'} />

                <button onClick={login}>LOGIN</button>
            </>

        )
    }
    function signinFormShow() {
        document.querySelector('.signin').classList.add('active')
        document.querySelector('.login').classList.remove('active')
        const form = document.getElementById('login-form')
        ReactDOM.createRoot(form).render(
            <>
                <div class="login-img small">
                    <img src="./efarm 1.svg" alt="" />
                </div>

                <h1>BUAT AKUN DULU</h1>

                <input type="text" id="nama-daftar" name="nama" defaultValue={'nama lengkap'}/>
                <input type="text" id="username-daftar" name="nama" defaultValue={'username'}/>
                <input type="text" id="password-daftar" name="nama" defaultValue={'password'}/>
                <input type="text" id="noTelephone-daftar" name="nama" defaultValue={'no telephone'}/>
                <input type="text" id="alamat-daftar" name="nama" defaultValue={'alamat'}/>
            

                <button onClick={daftar} class='btn-daftar'>DAFTAR</button>
            </>

        )
    }

    return(
        <div id='main-content'>
            <div class="login-container">
                <div class="login-nav">
                    <button class="login active" onClick={LoginFormShow}>Login</button>
                    <button class='signin' onClick={signinFormShow}>Sign Up</button>
                </div>
                <form class="login-form" id='login-form' >
                    <div class="login-img">
                        <img src="./efarm 1.svg" alt="" />
                    </div>

                    <h1>SELAMAT DATANG</h1>
                    <h5>PARA PETANI PENGHIDUP NEGERI</h5>

                    <input type="text" id="username-login" name="username-login"  placeholder={'username'} />
                    <input type="password" id="password-login" name="password-login" placeholder={'password'}/>

                    <button onClick={login}>LOGIN</button>
                </form>
            </div>
            <button type="button" data-toggle="modal" data-target="#myModal1" id="btn-user-pw" style={{display:'none'}}></button>
            <div id="myModal1" class="modal fade" role="dialog">
                <div class="modal-dialog">

                {/* <!-- Modal content--> */}
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">ACTION</h4>
                        </div>
                        <div class="modal-body">
                            <h6 id="dialog-sign"></h6>
                        </div>
                        <div class="modal-footer">
                            <button onClick={()=>{location.reload()}} id="btn-konfirmasi" type="button" class="btn btn-default" data-dismiss="modal">Konfirmasi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login