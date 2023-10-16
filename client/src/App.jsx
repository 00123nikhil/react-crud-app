import { cloneElement, useEffect, useState } from "react";
import "./App.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
function App() {
  const [addSection, setAddSection] = useState(false);

  // to store data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  console.log(dataList);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>

        {addSection && (
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="closebtn" onClick={() => setAddSection(false)}>
                <MdClose />
              </div>
              <label htmlFor="name"> Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleOnChange}
              />

              <label htmlFor="email"> Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleOnChange}
              />

              <label htmlFor="mobile"> Mobile:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                onChange={handleOnChange}
              />

              <button className="btn">Submit</button>
            </form>
          </div>
        )}

        <div className="tablecontainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className="btn btn-edit">Edit</button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
