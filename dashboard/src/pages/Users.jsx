import React, { useState, useEffect, useRef } from "react";
import "./Users.css";

function Users() {
  //hooks use state para crear un estado para los datos que vienen de la Api
  const [users, setUsers] = useState();
  const [apiInfo, setApiInfo] = useState();
  const [apiState, setApiState] = useState(false);
  const searchInput = useRef();

  //peticion a la api
  const apiUserPetition = () => {
    setApiState(false);
    fetch("http://localhost:3000/api/users")
      .then((data) => data.json())
      .then((data) => {
        if (data.data.length > 0) {
          setUsers(data.data);
          setApiInfo(data.meta);
          setApiState(true);
          console.log("first");
        } else {
          setUsers([]);
          setApiInfo([]);
          setApiState(true);
        }
        console.log(users);
        console.log(apiInfo);
      });
  };
  //peticion a la api
  const apiSearch = (textinput) => {
    setApiState(false);
    fetch(`http://localhost:3000/api/users?search=${textinput}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.data.length > 0) {
          setUsers(data.data);
          setApiInfo(data.meta);
          setApiState(true);
        } else {
          setUsers([]);
          setApiInfo([]);
          setApiState(true);
        }
        console.log(users);
        console.log(apiInfo);
      });
  };

  useEffect(() => {
    apiUserPetition();
  }, []);

  function deleteUser(user) {
    fetch("http://localhost:3000/api/users/delete/" + user.id, {
      method: "delete",
    }).then(() => {
      apiUserPetition();
    });
  }

  return (
    <main className="main-panel">
      <h1 style={{ textAlign: "center" }}>PANEL DE USUARIOS</h1>
      <div className="user-panel-search" action="/users/panel" method="get">
        <input
          ref={searchInput}
          type="search"
          name="search"
          id="user"
          placeholder="@usuario || #role (admin,usuario)"
        />
        <button type="submit">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              apiSearch(searchInput.current.value);
            }}
          ></i>
        </button>
      </div>

      {/*
        <% if (filter) { %>
            <div className="user-clear-button">
                <a  href="/users/panel">Limpiar</a>
            </div>
        <% } %>
        */}

      <section className="user-cards-container">
        {apiState ? (
          users ? (
            users.map((user) => {
              return (
                <div className="user-card" key={user.id}>
                  <div className="user-card-tag">
                    {user.idRole === 1 ? (
                      <p className="admin">#Admin</p>
                    ) : (
                      <p className="user">#Usuario</p>
                    )}
                  </div>
                  <img
                    className="user-card-img"
                    src={user.img}
                    alt={"imagen de " + user.firstName}
                  />
                  <div className="user-card-name-container">
                    <p className="user-card-name">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="user-card-user">@{user.userName}</p>
                  </div>
                  <div className="user-card-button-container">
                    <button
                      className="button-remove"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Estas seguro de eliminar el usuario\n" +
                              user.firstName +
                              " " +
                              user.lastName
                          )
                        ) {
                          deleteUser(user);
                          alert("USUARIO ELIMINADO!");
                        }
                      }}
                    >
                      <i
                        className="fa-solid fa-trash-can"
                        target="_blank"
                        rel="noreferrer"
                      ></i>
                    </button>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="button-edit"
                      href={"http://localhost:3000/users/edit/" + user.id}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p> No se encontraron Usuarios!</p>
          )
        ) : (
          <div className="spinner-border text-warning" role="status"></div>
        )}
      </section>
      <div className="confirm-delete"></div>
    </main>
  );
}

export default Users;
