"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { getTickets, updateTicket } from "@/lib/api";

const TicketDetail = () => {
  const params = useParams();
  const ticketId = params.id;
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const allTickets = await getTickets();
        const foundTicket = allTickets.data.find(
          (t) => t._id === ticketId || t.id === ticketId
        );

        if (foundTicket) {
          setTicket(foundTicket);
          setStatus(foundTicket.status);
        } else {
          setError("Ticket not found.");
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
        setError("Failed to load ticket.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleStatusUpdate = async () => {
    try {
      setIsSubmitting(true);
      await updateTicket(ticketId, status, undefined);
      alert("Ticket status updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateTicket(ticketId, undefined, responseMessage);
      alert("Response added successfully");
      setResponseMessage("");
      router.refresh();
    } catch (error) {
      console.error("Error adding response:", error);
      alert("Failed to add response.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading ticket details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{error}</h1>
          <Link
            href="/"
            className="bg-black text-white font-semibold p-2 rounded-md cursor-pointer"
          >
            Back to Main Page
          </Link>
        </div>
      </div>
    );
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Ticket Information */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Ticket Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Customer</h3>
                <p>
                  {ticket.name} ({ticket.email})
                </p>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="whitespace-pre-wrap">{ticket.description}</p>
              </div>
              <div>
                <h3 className="font-medium">Submitted</h3>
                <p>{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Conversation History */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Conversation History</h2>
            {!ticket?.responses || ticket.responses.length === 0 ? (
              <p className="text-gray-500">No responses yet.</p>
            ) : (
              <div className="space-y-4">
                {ticket.responses.map((resp, index) => (
                  <div
                    key={index}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <p className="whitespace-pre-wrap">{resp.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(resp.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Response Form */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add Response</h2>
            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder="Type your response here..."
                rows={5}
                required
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Response"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Ticket Status */}
        <div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Ticket Status</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Current Status</h3>
                <StatusBadge status={ticket.status} />
              </div>

              <div>
                <h3 className="font-medium mb-2">Update Status</h3>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="new">New</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button
                className="w-full bg-black text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50"
                disabled={status === ticket.status || isSubmitting}
                onClick={handleStatusUpdate}
              >
                {isSubmitting ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
