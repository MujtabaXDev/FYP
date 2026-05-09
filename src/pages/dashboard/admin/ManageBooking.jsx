import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageBooking = () => {
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const {
    data: bookingData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activePayments"],
    queryFn: async () => {
      const res = await axios.get(
        "https://fyp-server-veg4.onrender.com/payments/active",
      );
      return res.data.map((payment, index) => ({
        id: index + 1,
        email: payment.email,
        phone: payment.phone,
        address: payment.deliveryAddress,
        itemName: payment.itemName.join(", "),
        time: new Date(payment.createdAt).toLocaleString(),
        status: payment.status,
        quantity: payment.quantity,
        price: `${payment.price}`,
        transactionId: payment.transactionId,
      }));
    },
  });

  if (isLoading)
    return <p className="text-center text-slate-700">Loading...</p>;

  const setStatus = async (transactionId, status) => {
    try {
      await axios.patch(
        `https://fyp-server-veg4.onrender.com/payments/status/${transactionId}`,
        {
          status,
        },
      );
      alert("Status updated!");
      refetch();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update status");
    }
  };

  const statusOptions = [
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="section-container bg-white min-h-screen overflow-x-auto">
      <div className="max-w-screen-2xl mx-auto xl:px-8 pt-20 pb-16">
        {/* Header */}
        <h2 className="text-2xl text-center text-slate-700 font-semibold mb-4">
          Active Orders
        </h2>

        {/* Booking Table */}
        <table className="min-w-full bg-simpleLightYellow border border-gray-300 shadow-xl">
          <thead>
            <tr className="bg-yellow-200 text-slate-700">
              <th className="border-b p-2 hidden md:table-cell">ID</th>
              <th className="border-b p-2 hidden md:table-cell">Email</th>
              <th className="border-b p-2 hidden md:table-cell">Phone</th>
              <th className="border-b p-2 hidden md:table-cell">Address</th>
              <th className="border-b p-2">Item Name</th>
              <th className="border-b p-2 hidden md:table-cell">Quantity</th>
              <th className="border-b p-2">Price</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking) => (
              <tr key={booking.id} className="text-center text-slate-600">
                <td className="border-b p-2 hidden md:table-cell">
                  {booking.id}
                </td>
                <td className="border-b p-2 hidden md:table-cell">
                  {booking.email}
                </td>
                <td className="border-b p-2 hidden md:table-cell">
                  {booking.phone}
                </td>
                <td className="border-b p-2 hidden md:table-cell w-[250px] break-words whitespace-normal">
                  {booking.address}
                </td>
                <td className="border-b p-2">{booking.itemName}</td>
                <td className="border-b p-2 hidden md:table-cell">
                  {booking.quantity}
                </td>
                <td className="border-b p-2">Rs. {booking.price}</td>
                <td
                  className={`border-b p-2 font-medium ${
                    booking.status === "Delivered"
                      ? "text-green-600"
                      : booking.status === "Out for Delivery"
                        ? "text-blue-600"
                        : booking.status === "Preparing"
                          ? "text-yellow-600"
                          : "text-orange-600"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="border-b p-2">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                    <select
                      className="bg-teal-700/25 text-slate-700 text-base py-2 px-3 rounded border border-gray-300 w-full md:w-auto"
                      value={selectedStatuses[booking.id] || booking.status}
                      onChange={(e) =>
                        setSelectedStatuses((prev) => ({
                          ...prev,
                          [booking.id]: e.target.value,
                        }))
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() =>
                        setStatus(
                          booking.transactionId,
                          selectedStatuses[booking.id] || booking.status,
                        )
                      }
                      className="bg-yellow-300 text-slate-700 text-base py-2 px-6 rounded hover:bg-yellow-400 w-full md:w-auto"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
