// pages/index.js
'use client'
import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setProductForm] = useState({
    toolID: "",
    toolname: "",
    cate: "",
    subcate: "",
    radius: "",
    width: "",
    length: "",
    quantity: "",
    weight: "",
    maintain: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      if (response.ok) {
        const rjson = await response.json();
        setProducts(rjson.products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a product to the server
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });
      if (response.ok) {
        console.log("Product added successfully!");
       // setAlert("Your Tool has been added !!");
        setProductForm({
          toolID: "",
          toolname: "",
          cate: "",
          subcate: "",
          radius: "",
          width: "",
          length: "",
          quantity: "",
          weight: "",
          maintain: "",
          description: "",
        });
        fetchProducts(); // Refresh product list
        window.alert("Product added successfully!"); // Alert message
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // Delete a product from the server
  const deleteProduct = async (toolID) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        console.log(`Deleting product with toolID: ${toolID}`);
        const response = await fetch(`/api/product?toolID=${toolID}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Product deleted successfully!");
          // Filter out the deleted product from the state
          setProducts(products.filter(product => product.toolID !== toolID));
          window.alert("Product deleted successfully!"); // Alert message

        } else {
          const errorData = await response.json();
          console.error("Failed to delete product:", errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <Header />

      <div className="container bg-red-50 mx-auto w-full p-4">
        <div className="text-green-800 text-center">{alert}</div>

        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Add a Tool</h1>
        <form className="bg-white p-6 rounded shadow-md mb-8" onSubmit={addProduct}>
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="toolId" className="block text-gray-700 text-sm font-bold mb-2">
              Tool ID
            </label>
            <input
              value={productForm.toolID}
              name="toolID"
              onChange={handleChange}
              type="text"
              id="toolId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter tool ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="toolName" className="block text-gray-700 text-sm font-bold mb-2">
              Tool Name
            </label>
            <input
              value={productForm.toolname}
              name="toolname"
              onChange={handleChange}
              type="text"
              id="toolName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter tool name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={productForm.cate}
              name="cate"
              onChange={handleChange}
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Choose</option>
              <option value="design">Design & Layout</option>
              <option value="manufacturing">PCB Manufacturing</option>
              <option value="assembly">Assembly</option>
              <option value="inspection">Inspection & Testing</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subcategory" className="block text-gray-700 text-sm font-bold mb-2">
              Subcategory
            </label>
            <select
              value={productForm.subcate}
              name="subcate"
              onChange={handleChange}
              id="subcategory"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Choose</option>
              <option value="drilling">Drilling</option>
              <option value="milling">Milling</option>
              <option value="cutting">Cutting</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="radius" className="block text-gray-700 text-sm font-bold mb-2">
              Radius
            </label>
            <input
              value={productForm.radius}
              name="radius"
              onChange={handleChange}
              type="text"
              id="radius"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter radius"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="width" className="block text-gray-700 text-sm font-bold mb-2">
              Width
            </label>
            <input
              value={productForm.width}
              name="width"
              onChange={handleChange}
              type="text"
              id="width"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter width"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="length" className="block text-gray-700 text-sm font-bold mb-2">
              Length
            </label>
            <input
              value={productForm.length}
              name="length"
              onChange={handleChange}
              type="text"
              id="length"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter length"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              value={productForm.quantity}
              name="quantity"
              onChange={handleChange}
              type="text"
              id="quantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter quantity"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="block text-gray-700 text-sm font-bold mb-2">
              Weight
            </label>
            <input
              value={productForm.weight}
              name="weight"
              onChange={handleChange}
              type="text"
              id="weight"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter weight"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastMaintenance" className="block text-gray-700 text-sm font-bold mb-2">
              Last Maintenance
            </label>
            <input
              value={productForm.maintain}
              name="maintain"
              onChange={handleChange}
              type="date"
              id="lastMaintenance"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={productForm.description}
              name="description"
              onChange={handleChange}
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </button>
          </div>
        </form>

        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Display Current Stock</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Tool ID</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Tool Name</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Category</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Subcategory</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Radius</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Width</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Length</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Quantity</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Weight</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Last Maintenance</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Description</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.toolID}>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.toolID}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.toolname}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.cate}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.subcate}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.radius}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.width}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.length}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.weight}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.maintain}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">{product.description}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">
                    <button onClick={() => deleteProduct(product.toolID)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

