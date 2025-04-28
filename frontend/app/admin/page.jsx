"use client";

import TicketList from "@/components/TicketList";
import { getTickets } from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets();
        setTickets(response.data); // ✅ Set only the actual array of tickets
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Calculate summary safely now that tickets is an array
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "new" || ticket.status === "in progress"
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "resolved"
  ).length;

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="m-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Support Ticket Dashboard</h1>
        <Link
          href="/"
          className="bg-black text-white font-semibold p-2 rounded-md cursor-pointer"
        >
          Back to Main Page
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border-2 border-gray-300 p-5 rounded-md">
          <h1>Total Tickets</h1>
          <div className="mt-2 text-2xl font-bold">{totalTickets}</div>
        </div>

        <div className="border-2 border-gray-300 p-5 rounded-md">
          <h1>Open Tickets</h1>
          <div className="mt-2 text-2xl font-bold">{openTickets}</div>
        </div>

        <div className="border-2 border-gray-300 p-5 rounded-md">
          <h1>Resolved Tickets</h1>
          <div className="mt-2 text-2xl font-bold">{resolvedTickets}</div>
        </div>
      </div>

      <TicketList tickets={tickets} />
    </div>
  );
};

export default Admin;
