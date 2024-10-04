import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Form2() {
  let [student, setStudent] = useState({});
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1);
  let [error, setError] = useState({});
  let [hobby, setHobby] = useState([]);
  let [search, setSearch] = useState("");
  let [symbol, setSymbol] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem("studentList")) || [];
    setList(oldList);
  }, [setList]);

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortBy = (type) => {
    let newList = [];
    if (type == "name") {
      if (symbol == "" || symbol == "^") {
        newList = list.sort((a, b) => b.name.localeCompare(a.name));
        setSymbol("v");
      } else {
        newList = list.sort((a, b) => a.name.localeCompare(b.name));
        setSymbol("^");
      }
    } else if (type == "email") {
      if (symbol == "" || symbol == "^") {
        newList = list.sort((a, b) => b.email.localeCompare(a.email));
        setSymbol("v");
      } else {
        newList = list.sort((a, b) => a.email.localeCompare(b.email));
        setSymbol("^");
      }
    }
    setList(newList);
  };

  let handleInput = (e) => {
    let { name, value } = e.target;
    let newHobby = [...hobby];
    if (name == "hobby") {
      if (e.target.checked) {
        newHobby.push(value);
      } else {
        let pos = newHobby.findIndex((v, i) => v == value);
        newHobby.splice(pos, 1);
      }
      value = newHobby;
    }
    setHobby(newHobby);
    setStudent({ ...student, [name]: value });
  };

  let dataValidation = () => {
    let tempError = {};
    if (!student.id) tempError.id = "Id is required.";
    if (!student.name) tempError.name = "Name is required.";
    if (!student.email) tempError.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email))
      tempError.email = "Invalid Email.";
    if (!student.password) tempError.password = "password is required";
    setError(tempError);
    return Object.keys(tempError).length == 0;
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let newList;
    if (index != -1) {
      list[index] = student;
      newList = [...list];
      setIndex(-1);
    } else {
      newList = [...list, student];
    }
    setList(newList);
    localStorage.setItem("studentList", JSON.stringify(newList));
    setStudent({});
    setHobby([]);
  };

  let deleteData = (pos) => {
    list.splice(pos, 1);
    let newList = [...list];
    setList(newList);
    localStorage.setItem("studentList", JSON.stringify(newList));
  };

  let editData = (pos) => {
    let editStud = list[pos];
    setStudent(editStud);
    setIndex(pos);
    setHobby(editStud.hobby);
  };

  return (
    <>
      <h2 className="text-center my-4">Student Registration</h2>
      <form
        className="container"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Id</td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  name="id"
                  value={student.id || ""}
                  onChange={(e) => handleInput(e)}
                />
                {error.id ? (
                  <span className="text-danger">{error.id}</span>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={student.name ? student.name : ""}
                  onChange={(e) => handleInput(e)}
                />
                {error.name ? (
                  <span className="text-danger">{error.name}</span>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={student.email ? student.email : ""}
                  onChange={(e) => handleInput(e)}
                />
                {error.email ? (
                  <span className="text-danger">{error.email}</span>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={student.password || ""}
                  onChange={(e) => handleInput(e)}
                />
                {error.password ? (
                  <span className="text-danger">{error.password}</span>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>Hobby</td>
              <td>
                {["dance", "music", "karate", "yoga"].map((hobbyItem, idx) => (
                  <div className="form-check form-check-inline" key={idx}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hobby"
                      value={hobbyItem}
                      onChange={handleInput}
                      checked={hobby.includes(hobbyItem) ? "checked" : ""}
                    />
                    <label className="form-check-label">{hobbyItem}</label>
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={student.gender == "male"}
                    onChange={(e) => handleInput(e)}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={student.gender == "female"}
                    onChange={(e) => handleInput(e)}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <select
                  className="form-select"
                  name="city"
                  value={student.city || ""}
                  onChange={(e) => handleInput(e)}
                >
                  <option value="">Select City</option>
                  <option value="surat">Surat</option>
                  <option value="Baroda">Baroda</option>
                  <option value="Vapi">Vapi</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <textarea
                  className="form-control"
                  rows={3}
                  name="address"
                  value={student.address || ""}
                  onChange={(e) => handleInput(e)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value={index != -1 ? "Edit Data" : "Add Data"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="container my-4 text-center">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>
              <button className="btn btn-light" onClick={() => sortBy("name")}>
                Name {symbol}
              </button>
            </th>
            <th>
              <button className="btn btn-light" onClick={() => sortBy("email")}>
                Email {symbol}
              </button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, idx) => (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => editData(indexOfFirstItem + idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteData(indexOfFirstItem + idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="text-center my-3">
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
          <button
            className={`btn btn-sm mx-1 ${
              currentPage == p ? "btn-primary" : "btn-light"
            }`}
            key={p}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
}

export default Form2;
