import axios from 'axios';
import './dataAdmin.css'
import { useEffect, useState } from 'react';
import App from '../App';
import DataUser from './dataUser';
import DataTransaksi from './dataTransaksi';

import React from 'react'
import ReactDOM from 'react-dom/client'

function DataAdmin(e) {

    const [kendaraan,setKendaraan] = useState([])
    const [peralatan,setPeralatan] = useState([])
    const [bibit,setBibit] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/kendaraan').then(result=>{
            setKendaraan(result.data)
        })
        axios.get('http://localhost:8000/peralatan').then(result=>{
            setPeralatan(result.data)
        })
        axios.get('http://localhost:8000/bibit').then(result=>{
            setBibit(result.data)
        })
    },[])

    function DataBarang() {
        return(
            <>
                {/* kendaraan db */}
                <div class="container"> 
                    <h1>DATA KENDARAAN</h1>          
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Peralatan/>
                        </tbody>
                    </table>
                </div>

                <hr />
                {/* data peralatan */}
                <div class="container"> 
                    <h1>DATA PERALATAN</h1>          
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Peralatan/>
                        </tbody>
                    </table>
                </div>

                <hr />
                {/* data bibit */}
                <div class="container"> 
                    <h1>DATA BIBIT</h1>          
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Peralatan/>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    function renderHome() {
        const body = document.getElementById('root')
        ReactDOM.createRoot(body).render(<App {...e}/>)
    }
    function renderBarang() {
        document.querySelector('.data-Barang').classList.add('active')
        document.querySelector('.data-Transaksi').classList.remove('active')
        document.querySelector('.data-User').classList.remove('active')
        const body = document.getElementById('form-database')
        ReactDOM.createRoot(body).render(<DataBarang/>)
    }
    function renderUser() {
        document.querySelector('.data-Barang').classList.remove('active')
        document.querySelector('.data-Transaksi').classList.remove('active')
        document.querySelector('.data-User').classList.add('active')
        const body = document.getElementById('form-database')
        ReactDOM.createRoot(body).render(<DataUser/>)
    }
    function renderTransaksi() {
        document.querySelector('.data-Barang').classList.remove('active')
        document.querySelector('.data-Transaksi').classList.add('active')
        document.querySelector('.data-User').classList.remove('active')
        const body = document.getElementById('form-database')
        ReactDOM.createRoot(body).render(<DataTransaksi/>)
    }

    function Kendaraan() {
        return kendaraan.map((a)=>{
            return(
                <tr>
                    <td>{a.id}</td>
                    <td><img src={a.url_img} alt="" width={'100px'}/></td>
                    <td>{a.nama_barang}</td>
                    <td>{a.harga}</td>
                    <td>
                        <button 
                        onClick={()=>{setToModalUbahBarang('data_barang',a.id,a.nama_barang,a.harga)}}
                        type="button" style={{marginLeft:'5px'}} data-toggle="modal" data-target="#myModalBarang">Edit</button>
                    </td>
                </tr>
            )
        })
    }
    function Peralatan() {
        return peralatan.map((a)=>{
            return(
                <tr>
                    <td>{a.id}</td>
                    <td><img src={a.url_img} alt="" width={'100px'}/></td>
                    <td>{a.nama_barang}</td>
                    <td>{a.harga}</td>
                    <td>
                        <button 
                        onClick={()=>{setToModalUbahBarang('data_peralatan',a.id,a.nama_barang,a.harga)}}
                        type="button" style={{marginLeft:'5px'}} data-toggle="modal" data-target="#myModalBarang">Edit</button>
                    </td>
                </tr>
            )
        })
    }
    function Bibit() {
        return bibit.map((a)=>{
            return(
                <tr>
                    <td>{a.id}</td>
                    <td><img src={a.url_img} alt="" width={'100px'}/></td>
                    <td>{a.nama_barang}</td>
                    <td>{a.harga}</td>
                    <td>
                        <button 
                        onClick={()=>{setToModalUbahBarang('data_bibit',a.id,a.nama_barang,a.harga)}}
                        type="button" style={{marginLeft:'5px'}} data-toggle="modal" data-target="#myModalBarang">Edit</button>
                    </td>
                </tr>
            )
        })
    }

    function setToModalUbahBarang(jenisBarang , id , nama_barang , harga_barang) {
       document.getElementById('jenis-barang').innerText = jenisBarang
       document.getElementById('id-barang').value = id
       document.getElementById('nama-barang').value = nama_barang
       document.getElementById('harga-barang').value = harga_barang
    }
    function ubahDataBarang() {
        let jenisData = document.getElementById('jenis-barang').innerText 
        let id = document.getElementById('id-barang').value 
        let nama_barang = document.getElementById('nama-barang').value
        let harga_barang = document.getElementById('harga-barang').value

        axios.post('http://localhost:8000/updateBarang',{
            jenisData:jenisData , id:id , nama_barang:nama_barang , harga_barang:harga_barang
        }).then(res=>{alert(res.data)})
    }

    return(
        <div class='main'>
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                    <a class="navbar-brand" href="#">Admin Side</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li onClick={renderHome}><a href="#">Home</a></li>
                        <li onClick={renderBarang} class='data-Barang active'><a href="#">Data Barang</a></li>
                        <li onClick={renderTransaksi} class='data-Transaksi'><a href="#">Data Transaksi</a></li>
                        <li onClick={renderUser} class='data-User'><a href="#">Data User</a></li>
                    </ul>
                </div>
            </nav>

            <div id='form-database'>
                {/* kendaraan db */}
                <div class="container"> 
                    <h1>DATA KENDARAAN</h1>          
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Kendaraan/>
                        </tbody>
                    </table>
                </div>

                <hr />
                {/* data peralatan */}
                <div class="container"> 
                    <h1>DATA PERALATAN</h1>          
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Peralatan/>
                        </tbody>
                    </table>
                </div>

                <hr />
                {/* data bibit */}
                <div class="container"> 
                    <h1>DATA BIBIT</h1>          
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Bibit/>
                        </tbody>
                    </table>
                </div>

                {/* modal ubah data */}

                <div id="myModalBarang" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    {/* <!-- Modal content--> */}
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Ubah <span id='jenis-barang'></span></h4>
                    </div>
                    <div class="modal-body">
                    <div class="form-group">
                        <label for="id-barang">ID:</label>
                        <input type="text" class="form-control" id="id-barang" disabled/>
                    </div>
                    <div class="form-group">
                        <label for="nama-barang">Nama Barang:</label>
                        <input type="text" class="form-control" id="nama-barang"/>
                    </div>
                    <div class="form-group">
                        <label for="harga-barang">Harga:</label>
                        <input type="text" class="form-control" id="harga-barang"/>
                    </div>

                    </div>
                    <div class="modal-footer">
                        <button onClick={()=>{ubahDataBarang()}}  type="button" class="btn btn-default" data-dismiss="modal">Konfirmasi</button>
                    </div>
                    </div>

                </div>
                </div>
                {/* modal ubah data - end */}
            </div>
        </div>
    )
}

export default DataAdmin ;