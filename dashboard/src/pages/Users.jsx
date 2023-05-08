import React, { useState,useEffect } from "react";
import "./Users.css";

const UserList = ({users,meta}) => { 
    return(
        <>
        {
            users.map(user => {
                return(
                    <div className="user-card" key={user.id}>
                        <div className="user-card-tag">
                        {
                            user.idRole === 1 ? <p className="admin">#Admin</p> : <p className="user">#Usuario</p>
                        }
                        </div>
                        <img className="user-card-img" src={user.img} alt={"imagen de "+ user.firstName}/>
                        <div className="user-card-name-container">
                                    <p className="user-card-name">{user.firstName + " " + user.lastName}</p>
                                    <p className="user-card-user">@{user.userName}</p>
                        </div>
                        <div className="user-card-button-container">
                            <a className="button-remove" href=""><i className="fa-solid fa-trash-can"></i></a>
                            <a className="button-edit" href="#"><i className="fa-solid fa-pencil"></i></a>
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}



function Users() {

    //hooks use state para crear un estado para los datos que vienen de la Api
    const [users,setUsers] = useState()
    const [apiInfo,setApiInfo] = useState()
    const [apiState,setApiState] = useState(false)
    

    //peticion a la api
    const  apiUserPetition = ()=>{
        setApiState(false)
        fetch("http://localhost:3000/api/users")
        .then(data => data.json())
        .then(data=>{
            if(data.data.length > 0){
                setUsers(data.data)
                setApiInfo(data.meta)
                setApiState(true)
                console.log("first")
            }else{
                setUsers([])
                setApiInfo([])
                setApiState(true)
            }
            console.log(users)
            console.log(apiInfo)
            }
        )
       
    }

    useEffect(() => {
        apiUserPetition();
     },[])

  return (
    <main className="main-panel">  

        <h1 style={{textAlign: "center"}}>PANEL DE USUARIOS</h1>
        <form className="user-panel-search" action="/users/panel" method="get">
            <input type="search" name="search" id="user" placeholder="@usuario || #role (admin,usuario)"/>
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        
        {/* 
        <% if (filter) { %>
            <div className="user-clear-button">
                <a  href="/users/panel">Limpiar</a>
            </div>
        <% } %>
        */}

        <section className="user-cards-container">
            { setApiState? (users ? <UserList users={users} meta={apiInfo}/> : <p> No se encontraron Usuarios!</p>) : <p>Cargando Usuarios</p> }
        </section> 
    </main>
  );
}

export default Users;
