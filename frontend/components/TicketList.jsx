'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getTickets } from '@/lib/api'

const TicketList = () => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to fetch tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [])

  const filteredTickets = statusFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === statusFilter);
  
  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading Tickets...</div>;
  }

  if (error) {
    return <div className='text-center py-10 text-red-500'>{error}</div>
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Tickets ({tickets.length})</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter by status:</span>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-1"
          >
            <option value="all">All Tickets</option>
            <option value="new">New</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No tickets found matching your filter.</p>
          <button 
            onClick={() => setStatusFilter("all")}
            className="border rounded-md px-4 py-2 hover:bg-gray-50"
          >
            Show All Tickets
          </button>
        </div>
      ) : (
        filteredTickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="border-2 border-gray-400 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  <Link href={`/admin/${ticket.id}`} className="hover:underline">
                    Ticket #{ticket.id} - {ticket.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{ticket.email}</p>
                <p className="text-sm mt-2 line-clamp-2">{ticket.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={ticket.status} />
                <button 
                  onClick={() => router.push(`/admin/${ticket.id}`)}
                  className="border rounded-md px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default TicketList