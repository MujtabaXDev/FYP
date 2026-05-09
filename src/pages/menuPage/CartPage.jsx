import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    phone: "",
    countryCode: "+92",
    street: "",
    city: "",
    country: "Pakistan",
    notes: "",
  });

  const handleFormChange = (e) =>
    setShippingForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://fyp-server-veg4.onrender.com/carts/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`https://fyp-server-veg4.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then(() => {
          const updatedCart = cartItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          );
          refetch();
          setCartItems(updatedCart);
        });
    } else {
      alert("You can not decrease quantity less than 1");
    }
  };

  const handleIncrease = (item) => {
    fetch(`https://fyp-server-veg4.onrender.com/carts/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then(() => {
        const updatedCart = cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
        refetch();
        setCartItems(updatedCart);
      });
  };

  const calculatePrice = (item) => item.price * item.quantity;

  const cartSubTotal = cart.reduce(
    (total, item) => total + calculatePrice(item),
    0,
  );

  const handlePlaceOrder = () => {
    console.log("credit card:", import.meta.env.VITE_STRIPE_PK);
    if (cart.length === 0) {
      Swal.fire(
        "Cart is Empty",
        "Please add items to your cart before placing an order.",
        "warning",
      );
    } else {
      setShowShippingForm(true);
      // scroll down smoothly to the form
      setTimeout(() => {
        document
          .getElementById("shipping-form")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleConfirmOrder = () => {
    const { firstName, lastName, phone, street, city } = shippingForm;
    if (!phone || !street || !city) {
      Swal.fire(
        "Missing details",
        "Please fill in all required fields.",
        "warning",
      );
      return;
    }
    const info = {
      phone: shippingForm.countryCode + shippingForm.phone,
      street: shippingForm.street,
    };
    console.log(info);
    axios
      .put(`https://fyp-server-veg4.onrender.com/users/${user.email}`, info)
      .then((response) => {
        if (response) {
          refetch();
          Swal.fire(
            "Updated!",
            "Your information has been updated.",
            "success",
          );
        }
      })
      .catch((error) => console.error(error));

    // Pass shipping info to your checkout logic here
    navigate("/process-checkout");
  };

  return (
    <div className="section-container menu-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto xl:px-8 pt-20 pb-16">
        <div className="bg-gradient-to-r mt-10 shadow-lg rounded-3xl p-4 md:p-8">
          {/* Banner */}
          <div className="mb-4 md:mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Items Added To The <span className="text-green-500">Cart</span>
            </h2>
          </div>

          {/* Cart Table */}
          <div className="overflow-x-auto mb-8 mt-8 rounded-2xl ">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-yellow-300 text-gray-800">
                <tr>
                  <th className="py-2 hidden md:table-cell">Food</th>
                  <th className="py-2">Item Name</th>
                  <th className="py-2 hidden md:table-cell">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2 hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="item"
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center text-slate-600">
                      {item.name}
                    </td>
                    <td className="py-2 hidden md:table-cell">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="btn btn-ghost btn-sm text-red hover:bg-red-100"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center bg-white border text-slate-600 border-gray-300"
                          value={item.quantity}
                          onChange={() => {}}
                        />
                        <button
                          className="btn btn-ghost btn-sm text-green hover:bg-green-100"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 text-center text-slate-600">
                      RS.{calculatePrice(item).toFixed(2)}
                    </td>
                    <td className="py-2 text-center">
                      <button
                        className="btn btn-ghost btn-xs text-red hover:bg-red-100"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer + Shopping details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <div className="bg-gray-50 p-4 md:p-6 rounded-2xl ">
              <h3 className="text-xl font-semibold mb-2 md:mb-4 text-slate-600">
                Customer details
              </h3>
              {user ? (
                <>
                  <p className="mb-2 text-slate-500">
                    Name: {user.displayName}
                  </p>
                  <p className="mb-2 text-slate-500">Email: {user.email}</p>
                </>
              ) : (
                <p className="mb-2 text-slate-500">Please Login</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-2xl ">
              <h3 className="text-xl font-semibold mb-2 md:mb-4 text-slate-600">
                Shopping details
              </h3>
              <p className="mb-2 text-slate-500">Total Items: {cart.length}</p>
              <p className="mb-2 text-slate-500">
                Total Price: RS.{cartSubTotal.toFixed(2)}
              </p>
              <button
                className="btn bg-yellow-300 hover:bg-yellow-400 border-none mt-2 md:mt-4 text-white"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Shipping Form — shows after Place Order is clicked */}
          {showShippingForm && (
            <div
              id="shipping-form"
              className="mt-8 bg-gray-50 p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-1 text-slate-600">
                Shipping information
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                We'll use this to deliver your order
              </p>

              {/* Name row */}

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Phone number <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={shippingForm.countryCode}
                    onChange={handleFormChange}
                    className="w-28 border border-gray-200 rounded-xl px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    value={shippingForm.phone}
                    onChange={handleFormChange}
                    placeholder="300 1234567"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
              </div>

              {/* Street */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Street address <span className="text-red-400">*</span>
                </label>
                <input
                  name="street"
                  value={shippingForm.street}
                  onChange={handleFormChange}
                  placeholder="House no., street name"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>

              {/* City + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="city"
                    value={shippingForm.city}
                    onChange={handleFormChange}
                    placeholder="Lahore"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    value={shippingForm.country}
                    onChange={handleFormChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    <option>Pakistan</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Delivery notes{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={shippingForm.notes}
                  onChange={handleFormChange}
                  placeholder="E.g. ring doorbell, leave at gate…"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
                />
              </div>

              <button
                className="btn bg-yellow-300 hover:bg-gray-400 border-none text-white w-full md:w-auto px-8"
                onClick={handleConfirmOrder}
              >
                Continue to payment →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
