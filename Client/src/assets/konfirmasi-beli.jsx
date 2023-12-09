import axios from "axios";

function KonfirmasiBeli() {
    function konformasi_beli() {
        axios.post('http://localhost:8000/transaksi/input',{
            id_transaksi:document.getElementById('kon-id').innerText,
            nama_pembeli:document.getElementById('kon-nama-pembeli').innerText,
            nama_barang:document.getElementById('kon-nama-barang').innerText,
            tanggal_beli:document.getElementById('kon-tanggal').innerText,
            jumlah_beli:document.getElementById('kon-jumlah-beli').innerText,
            total_harga:document.getElementById('kon-total').innerText
        }).then(response=>{
            alert(response.data);
        })
    }
    return(
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                {/* <!-- Modal content--> */}
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ID Transaksi : <span id="kon-id"></span></h4>
                    </div>
                    <div class="modal-body">
                        <p>Nama Pembeli : <span id="kon-nama-pembeli"></span></p>
                        <p>Nama Barang : <span id="kon-nama-barang"></span></p>
                        <p>tanggal : <span  id="kon-tanggal"></span></p>
                        <p>Harga Satuan: <span  id="kon-harga-satuan"></span></p>
                        <p>Jumlah Pembelian : <span  id="kon-jumlah-beli"></span></p>
                        <hr />
                        <p>Total : Rp.<span  id="kon-total"></span></p>
                    </div>
                    <div class="modal-footer">
                        <button onClick={()=>{konformasi_beli()}} type="button" class="btn btn-default" data-dismiss="modal">Konfirmasi</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default KonfirmasiBeli;