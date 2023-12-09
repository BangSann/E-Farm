function FormBeli()  { 

    let jumlah_beli = 0
    function tambahBeli() {
        jumlah_beli++
        let harga = document.getElementById('hargaBarang').innerText
        document.getElementById('jumlahBeli').value = jumlah_beli
        document.getElementById('totalHarga').value = jumlah_beli*harga
    }
    function kurangBeli() {
        if (jumlah_beli!=0) {
            jumlah_beli--
            document.getElementById('jumlahBeli').value = jumlah_beli
            let harga = document.getElementById('hargaBarang').innerText
            document.getElementById('totalHarga').value = jumlah_beli*harga
        }
    }
    
    function tutupModal() {
        const modal = document.querySelector('.modal-container')
        modal.classList.remove('active')
        jumlah_beli = '0'
        document.querySelector('body').style.overflow = 'auto'
    }

    function beli() {
        let date =new Date().toLocaleDateString()
        let id_transaksi =  Math.floor(Math.random()*999999999)+111111111
        let nama = document.getElementById('namaBarang').innerText
        let jumlahBeli = document.getElementById('jumlahBeli').value
        let TotalHarga = document.getElementById('totalHarga').value
        let harga = document.getElementById('hargaBarang').innerText
        let nama_lengkap = document.getElementById('nama-lengkap').value

        document.getElementById('kon-id').innerText = id_transaksi
        document.getElementById("kon-nama-pembeli").innerText = nama_lengkap
        document.getElementById("kon-nama-barang").innerText = nama
        document.getElementById("kon-tanggal").innerText = date
        document.getElementById("kon-harga-satuan").innerText = harga
        document.getElementById("kon-jumlah-beli").innerText = jumlahBeli
        document.getElementById("kon-total").innerText = TotalHarga

    }
    return(
        <div class="modal-container" id="modal-container">
            <button onClick={tutupModal} class="tutup-formbeli-btn">&#10006;</button>
            <div class="modal-item">
                <div class='img-container' id="img-container">
                    <img src="./image 3.png" alt="" />
                </div>
                <div class='dataBarang'>
                    <div class='namaHarga'>
                        <h2 id="namaBarang"></h2>
                        <p>Rp.
                            <span id="hargaBarang"></span>
                        </p>
                    </div>
                    <hr />
                    <p id="deskripsi">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fuga laboriosam dignissimos, in, ex, modi consequatur maiores ab ducimus praesentium animi nam tenetur dolore ipsa quibusdam facere commodi adipisci quia.</p>
                    <div class='calculate'>
                        <div class='setJumlah'>
                            <h4>Jumlah</h4>
                            <p>
                                <button onClick={()=>{kurangBeli()}}>&minus;</button>
                                <input type="text" id="jumlahBeli" name="jumlahBeli" disabled value={'0'}/>
                                <button onClick={()=>{tambahBeli()}}>+</button>
                            </p>
                        </div>
                        <div class="getJumlah">
                            <h4>Total</h4>
                            <p>
                                <input type="text" id="totalHarga" name="totalHarga" disabled defaultValue={'Rp.0'}/>
                            </p>
                        </div>
                    </div>
                    <button  onClick={()=>{beli()}} type="button" class="btn-beli" data-toggle="modal" data-target="#myModal" >BELI</button>
                </div>
            </div>
        </div>
    )
}

export default FormBeli;