import axios from "axios"
import { useEffect, useState } from "react"

function DataTransaksi() {
    const [dataTransaksi,setDataTransaksi] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/transaksi').then(res=>{
            setDataTransaksi(res.data)
        })
    },[])
    function Transaksi() {
        return dataTransaksi.map((e)=>{
            return (
                <tr>
                    <td>{e.id}</td>
                    <td>{e.nama_pembeli}</td>
                    <td>{e.nama_barang}</td>
                    <td>{e.jumlah_pembelian}</td>
                    <td>{e.total_harga}</td>
                    <td>{e.tanggal_transaksi}</td>
                    <td><button onClick={()=>{hapusDataTransaksi(e.id)}}>HAPUS</button></td>
                </tr>
            )
        })
    }
    function hapusDataTransaksi(id) {
        axios.post('http://localhost:8000/transaksi/hapus',{
            id:id
        }).then(res=>{
            alert(res.data)
        })
    }
    return (
        <>
            <div class="container"> 
            <h1>DATA USER</h1>          
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAMA PEMBELI</th>
                        <th>NAMA BARANG</th>
                        <th>JUMLAH PEMBELIAN</th>
                        <th>TOTAL HARGA</th>
                        <th>TANGGAL PEMBELIAN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <Transaksi/>
                </tbody>
            </table>
            </div>
        </>
    )
}

export default DataTransaksi