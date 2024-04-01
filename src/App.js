import Axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newwage, setNewwage] = useState(0);

  const [employeeslist, setEmployeeslist] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeslist(response.data);
    });
  };

  const addEmployees = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeslist([
        ...employeeslist,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const updateEmployeeswage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newwage, id: id }).then(
      (response) => {
        setEmployeeslist(
          employeeslist.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newwage,
                }
              : val;
          })
        );
      }
    );
  };
  const deleteEmployees = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeslist(
        employeeslist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter position"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="wage" className="form-label">
              Wage:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter wage"
              onChange={(event) => {
                setWage(event.target.value);
              }}
            ></input>
          </div>
          <button className="btn btn-success" onClick={addEmployees}>
            Add Employee
          </button>
        </form>
      </div>
      <hr></hr>
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployees}>
          Show Employees
        </button>
        <br></br>
        <br></br>
        {employeeslist.map((val, key) => {
          return (
            <div className="employee card">
              <div className=" card-body text-left">
                <p className="card-text">Name:{val.name}</p>
                <p className="card-text">Age:{val.age}</p>
                <p className="card-text">Country:{val.country}</p>
                <p className="card-text">Wage:{val.wage}</p>
                <div className="d-flex">
                  <input
                    type="number"
                    placeholder="15000..."
                    className="form-control"
                    style={{ width: "300px" }}
                    onChange={(event) => {
                      setNewwage(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateEmployeeswage(val.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteEmployees(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
