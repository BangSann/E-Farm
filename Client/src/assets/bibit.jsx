import { useState } from 'react'
import database from './db'
import { useEffect } from 'react'
import axios from 'axios'

function Bibit() {

    const [data, setData] =useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/bibit').then(res=>{
            setData(res.data)
        })
    },[])

    function prev(){
        document.getElementById('radio5').checked = true
    }
    function next(){
        document.getElementById('radio6').checked = true
    }

    // set to formBeli
    function showModal(namaBarang,hargaBarang,urlImg) {
        document.getElementById('img-container').innerHTML = " <img src="+urlImg+" alt='' />"
        document.getElementById('modal-container').classList.add('active')
        document.getElementById('namaBarang').innerText = namaBarang
        document.getElementById('hargaBarang').innerText = hargaBarang
        document.getElementById('jumlahBeli').value = '0'
        document.getElementById('totalHarga').value = 'Rp.0'

        document.querySelector('body').style.overflow = 'hidden'
    }
    // set to formBeli

    function SetList() {
        let index = 0
        return data.map((data)=>{
            index++;
            if (index == 1) {
                return(
                    <>
                        <input type="radio" name='radio-btn' id='radio5' class="radio-btn"/>
                        <input type="radio" name='radio-btn' id='radio6' class="radio-btn"/>        
                        <div class="box-list first-benih">
                            <div class="label">
                                <p>{data.nama_barang}</p>
                                <p class="harga">{data.harga}</p>
                            </div>
                            <img src={data.url_img} alt="" />
                            <button onClick={()=>showModal(data.nama_barang,data.harga,data.url_img)}>Beli Sekarang</button>
                        </div>                  
                    </>
                )
            }else{                
                return(
                    <>
                        <div class="box-list">
                            <div class="label">
                                <p>{data.nama_barang}</p>
                                <p class="harga">{data.harga}</p>
                            </div>
                            <img src={data.url_img} alt="" />
                            <button onClick={()=>showModal(data.nama_barang,data.harga,data.url_img)}>Beli Sekarang</button>
                        </div>  
                    </>

                )
            }
        })
    }

  return (
    <>
        <div class="container-barang" id='benih'>
            <div class="list-header" style={{backgroundColor:"#8fbd15"}}>
                <div >
                    <img src="icon benih.png" alt="" />
                    <h1>BENIH</h1>
                </div>
            </div>
            <div class="list">
                <SetList/>
            </div>
            <div class="button-container">
                <button class="prev" onClick={()=>prev()}><span class="	glyphicon glyphicon-menu-left"></span></button>
                <button class="next" onClick={()=>next()}><span class="	glyphicon glyphicon-menu-right"></span></button>
            </div>
        </div>
    </>
  )
}

export default Bibit