import { useState } from "react";
import "./App.css";
import { MdClose } from "react-icons/md";

axios.defaults.baseURL = "http://localhost:8000/";
function App() {
  const [addSection, setAddSection] = useState(false);

  // to store data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
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
      </div>
    </>
  );
}

export default App;
