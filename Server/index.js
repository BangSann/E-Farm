const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// sql connect
const database = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_e_farm'
})
// sql connect

// kendaraan
app.get('/kendaraan',(req,res)=>{
    database.query('select * from data_barang',(err,data)=>{
        const data_barang = JSON.parse(JSON.stringify(data))
        res.send(data_barang)
    })
})
//kendaraan

// input transaksi
app.post('/transaksi/input',(req,res)=>{
    let nama_pembeli = req.body.nama_pembeli
    let nama_barang = req.body.nama_barang
    let tanggal_transaksi = req.body.tanggal_beli
    let jumlah_pembelian = req.body.jumlah_beli
    let total_harga = req.body.total_harga
    let id_transaksi = req.body.id_transaksi

    database.query("INSERT INTO `data_transaksi`(`id`, `nama_pembeli`, `nama_barang`, `jumlah_pembelian`, `total_harga`, `tanggal_transaksi`) VALUES ('"+id_transaksi+"','"+nama_pembeli+"','"+nama_barang+"','"+jumlah_pembelian+"','"+total_harga+"','"+tanggal_transaksi+"')",(err,response)=>{
        if(err) throw err
        res.json('input berhasil')
    })
})
app.get('/transaksi',(req,res)=>{
    database.query('select * from data_transaksi',(err,data)=>{
        if(err) throw err
        const data_transaksi = JSON.parse(JSON.stringify(data))
        res.send(data_transaksi)
    })
})
app.post('/transaksi/hapus',(req,res)=>{
    let id = req.body.id
    database.query("DELETE FROM `data_transaksi` WHERE id ="+id+"",(err)=>{
        if(err) return res.json('gagal hapus data')
        res.json('berhasil hapus data')
    })
})
// input transaksi

// user
app.get('/user',(req,res)=>{
    database.query('select * from data_user',(err,data)=>{
        const data_user = JSON.parse(JSON.stringify(data))
        res.send(data_user)
    })
})

app.post('/user/daftar',(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let nama = req.body.nama
    let alamat = req.body.alamat
    let noTelp = req.body.noTelp
    let sql = "INSERT INTO `data_user`(`username`, `password`, `nama_lengkap`, `alamat`, `no_telp`, `status`) VALUES ('"+username+"','"+password+"','"+nama+"','"+alamat+"','"+noTelp+"','pelanggan')"
    database.query(sql,(err,result)=>{
        if(err) throw err
    })
    res.json('BERHASIL DAFTAR AKUN\nSILAHKAN LOGIN')

})
app.post('/user/update',(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let nama = req.body.nama
    let alamat = req.body.alamat
    let noTelp = req.body.noTelp
    let sql = "UPDATE `data_user` SET `password`='"+password+"',`nama_lengkap`='"+nama+"',`alamat`='"+alamat+"',`no_telp`='"+noTelp+"' WHERE `username`='"+username+"'"
    database.query(sql)
    res.json('BERHASIL UBAH DATA')
})
// user -end
app.get('/bibit',(req,res)=>{
    database.query('select * from data_bibit',(err,data)=>{
        const data_bibit = JSON.parse(JSON.stringify(data))
        res.send(data_bibit)
    })
})
app.post('/updateBarang',(req,res)=>{
    let jenisData = req.body.jenisData
    let id = req.body.id
    let nama_barang = req.body.nama_barang
    let harga = req.body.harga_barang

    console.log(jenisData,id,nama_barang,harga);
    database.query("UPDATE `"+jenisData+"` SET `nama_barang`='"+nama_barang+"',`harga`='"+harga+"' WHERE `id`='"+id+"'",(err)=>{
        if (err) return res.json('Ada Eror')
        res.json('Berhasil Update')
    })
})

app.get('/peralatan',(req,res)=>{
    database.query('select * from data_peralatan' , (err,data)=>{
        const data_peralatan = JSON.parse(JSON.stringify(data))
        res.send(data_peralatan)
    })
})




app.listen(8000,()=>{
    console.log('connect at localhost : 8000');
})