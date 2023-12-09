import { useEffect, useState } from 'react';
import axios from 'axios';

function DataUser() {
    const [user,setUser] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/user').then(result=>{
            setUser(result.data)
        })
    },[])

    function User() {
        return user.map((a)=>{
            return(
                <tr>
                    <td>{a.username}</td>
                    <td>{a.password}</td>
                    <td>{a.nama_lengkap}</td>
                    <td>{a.alamat}</td>
                    <td>{a.no_telp}</td>
                    <td>{a.status}</td>
                    <td>
                        <button>Hapus</button>
                        <button style={{marginLeft:'5px'}}>Edit</button>
                    </td>
                </tr>
            )
        })
    }



    return(
        <div>
            {/* user db */}
            <div class="container"> 
            <h1>DATA USER</h1>          
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>USERNAME</th>
                        <th>PASSWORD</th>
                        <th>NAMA</th>
                        <th>ALAMAT</th>
                        <th>NO TELP</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <User/>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default DataUser ;