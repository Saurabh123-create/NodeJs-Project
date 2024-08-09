import React, { useState, useEffect } from "react";
import SignCss from "./signup.module.css";
import ProductCss from "./Products.module.css";
import { useNavigate, useParams } from "react-router-dom";

const token = JSON.parse(localStorage.getItem("token"))
export default function Producs() {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(token)
  useEffect(() => {
    if (id != undefined) {
      getUpdateProductList(id);
    } else {
      getProductList();
    }
  }, [id]);

  const [data, setData] = useState({
    name: "",
    company: "",
    price: "",
  });

  function handleInputs(val, name) {
    setData((prev) => {
      return { ...prev, [name]: val };
    });
  }

  async function addProduct(e) {
    e.preventDefault();

    if (id == undefined) {
      try {
        let addData = await fetch("http://localhost:3000/addProducts", {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization" : token
          },
        });
        addData = await addData.json();
        if (addData.status) {
          alert(addData.msg);
          setData((prev) => {
            return {
              name: "",
              company: "",
              price: "",
            };
          });
          getProductList();
        } else {
          alert(addData.msg);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let addData = await fetch(`http://localhost:3000/updateProduct/${id}`, {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization" : token
          },
        });
        addData = await addData.json();
        if (addData) {
          alert("Data Updated Successfully");
          setData((prev) => {
            return {
              name: "",
              company: "",
              price: "",
            };
          });
          getProductList();
        } else {
          alert(addData);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getProductList() {
    try {
      let resp = await fetch("http://localhost:3000/getProducts", {
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : token
        }
      });
      resp = await resp.json();
      setProductList(resp);
    } catch (err) {
      setProductList([]);
    }
  }

  async function getUpdateProductList(id) {
    try {
      let resp = await fetch("http://localhost:3000/getUpdateProducts" + id , {
        headers : {
          "Authorization" : token
        }
      });
      resp = await resp.json();
      if (resp.status) {
        let inp = resp.data;
        setData((prev) => {
          return {
            ...prev,
            name: inp.name,
            company: inp.company,
            price: inp.price,
          };
        });
      } else {
        console.log(resp.msg);
      }
    } catch (err) {
      console.log(err);
      // setProductList([]);
    }
  }

  const DeleteItem = async (item) => {
    try {
      let result = await fetch(
        "http://localhost:3000/deleteProducts/" + item._id,
        {
          method: "delete",
          headers: {
            Content_Type: "application/json",
            "Authorization" : token
          },
        }
      );
      result = await result.json();
      if (result.status) {
        alert("Data deleted successfully");
        getProductList();
      } else if (!result.status) {
        alert(result.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (event) => {
    let str = event.target.value.trim();
    setSearch(str);
    try {
      let result = await fetch(`http://localhost:3000/getProducts/${str}`,{
        headers : {
          "Authorization" : token
        }
      });
      result = await result.json();
      setProductList(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ fontFamily: "Inter" }}>
      <div
        style={{
          background: "white",
          padding: "5px 10px",
          border: "1px solid gray",
          margin: "10px",
        }}
      >
        <h2 style={{ margin: "10px 0px" }}>
          {id ? "Update Products" : "Add Products"}
        </h2>
        <form onSubmit={addProduct}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "centers",
            }}
          >
            <div>
              <label for="name">Name</label>
              <input
                id="name"
                className={SignCss.signupText}
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={(e) => {
                  handleInputs(e.target.value, "name");
                }}
              />
            </div>
            <div>
              <label for="comp">Company</label>
              <input
                id="comp"
                className={SignCss.signupText}
                type="text"
                placeholder="Company"
                value={data.company}
                onChange={(e) => {
                  handleInputs(e.target.value, "company");
                }}
              />
            </div>
            <div>
              <label for="price">Price</label>
              <input
                id="price"
                className={SignCss.signupText}
                type="number"
                placeholder="Price"
                value={data.price}
                onChange={(e) => {
                  handleInputs(e.target.value, "price");
                }}
              />
            </div>
            <button
              type="submit"
              style={{ width: "40%", margin: "20px", padding: "10px" }}
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      <div className={ProductCss.search}>
        Search :{" "}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className={ProductCss.list}>
        <ul>
          <li>{"S.No"}</li>
          <li>{"Name"}</li>
          <li>{"Company"}</li>
          <li>{"Price"}</li>
          <li>{"Action"}</li>
          {/* <li>{'Update'}</li> */}
        </ul>
        {productList?.map((item, index) => {
          // return <pre>{JSON.stringify(item)}</pre>
          return (
            <ul>
              <li>{index}</li>
              <li>{item.name}</li>
              <li>{item.company}</li>
              <li>{item.price}</li>
              <li>
                <button
                  onClick={() => {
                    DeleteItem(item);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigate("/products/" + item._id);
                  }}
                >
                  Update
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
