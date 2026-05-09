import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageBookingCopy = () => {
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const { data: bookingData = [], isLoading } = useQuery({
    queryKey: ["deliveredPayments"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:6001/payments/delivered");
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

  const setStatus = (email, status) => {
    console.log(
      `Updating status for booking with email: ${email} to ${status}`,
    );
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
          Delivered Orders
        </h2>

        {/* Booking Table */}
        <table className="min-w-full bg-simpleLightYellow border border-gray-300 shadow-xl">
          <thead>
            <tr className="bg-yellow-200 text-slate-700">
              <th className="border-b p-2">ID</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Phone</th>
              <th className="border-b p-2">Address</th>
              <th className="border-b p-2">Item Name</th>
              <th className="border-b p-2">Quantity</th>
              <th className="border-b p-2">Price</th>
              <th className="border-b p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking) => (
              <tr key={booking.id} className="text-center text-slate-600">
                <td className="border-b p-2">{booking.id}</td>
                <td className="border-b p-2">{booking.email}</td>
                <td className="border-b p-2">{booking.phone}</td>
                <td className="border-b p-2 max-w-xs truncate">
                  {booking.address}
                </td>
                <td className="border-b p-2">{booking.itemName}</td>
                <td className="border-b p-2">{booking.quantity}</td>
                <td className="border-b p-2">Rs. {booking.price}</td>
                <td
                  className={`border-b p-2 ${
                    booking.status === "Delivered"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookingCopy;
