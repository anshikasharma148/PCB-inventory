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
    price: "", // Add this line
  });
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editToolID, setEditToolID] = useState(null);

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

  // Add or update a product to the server
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing ? `/api/product?toolID=${editToolID}` : "/api/product";
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log(isEditing ? "Product updated successfully!" : "Product added successfully!");
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
          price: "", // Add this line
        });
        setIsEditing(false);
        setEditToolID(null);
        fetchProducts(); // Refresh product list
        window.alert(isEditing ? "Product updated successfully!" : "Product added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        window.alert(`Error: ${errorData.message}`);
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

  // Edit a product
  const editProduct = (product) => {
    setIsEditing(true);
    setEditToolID(product.toolID);
    setProductForm({
      toolID: product.toolID,
      toolname: product.toolname,
      cate: product.cate,
      subcate: product.subcate,
      radius: product.radius,
      width: product.width,
      length: product.length,
      quantity: product.quantity,
      weight: product.weight,
      maintain: product.maintain,
      description: product.description,
      price: product.price, // Add this line
    });
  };

  return (
    <>
      <Header />

      <div className="container bg-red-50 mx-auto w-full p-4">
        <div className="text-green-800 text-center">{alert}</div>

        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">{isEditing ? "Edit Tool" : "Add a Tool"}</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={saveProduct}>
          <div className="mb-4">
            <label htmlFor="toolID" className="block text-gray-700 text-sm font-bold mb-2">
              Tool ID
            </label>
            <input
              value={productForm.toolID}
              name="toolID"
              onChange={handleChange}
              type="text"
              id="toolID"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter tool ID"
              disabled={!isEditing} // Disable input when adding a new tool
            />
          </div>
          <div className="mb-4">
            <label htmlFor="toolname" className="block text-gray-700 text-sm font-bold mb-2">
              Tool Name
            </label>
            <input
              value={productForm.toolname}
              name="toolname"
              onChange={handleChange}
              type="text"
              id="toolname"
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
              type="number"
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
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              value={productForm.price}
              name="price"
              onChange={handleChange}
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter price"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? "Update Tool" : "Add Tool"}
            </button>
          </div>
        </form>

        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Product List</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tool ID</th>
              <th className="py-2 px-4 border-b">Tool Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Subcategory</th>
              <th className="py-2 px-4 border-b">Radius</th>
              <th className="py-2 px-4 border-b">Width</th>
              <th className="py-2 px-4 border-b">Length</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Weight</th>
              <th className="py-2 px-4 border-b">Maintenance</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th> {/* Add this line */}
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.toolID}>
                <td className="py-2 px-4 border-b">{product.toolID}</td>
                <td className="py-2 px-4 border-b">{product.toolname}</td>
                <td className="py-2 px-4 border-b">{product.cate}</td>
                <td className="py-2 px-4 border-b">{product.subcate}</td>
                <td className="py-2 px-4 border-b">{product.radius}</td>
                <td className="py-2 px-4 border-b">{product.width}</td>
                <td className="py-2 px-4 border-b">{product.length}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">{product.weight}</td>
                <td className="py-2 px-4 border-b">{product.maintain}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">{product.price}</td> {/* Add this line */}
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => deleteProduct(product.toolID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
