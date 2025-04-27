'use client'
import { createTicket } from '@/lib/api';
import React, { useState } from 'react'

const TicketForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await createTicket({ name, email, description });
        alert('Ticket submitted successfully');
        
        // Reset the form after submission
        setName('');
        setEmail('');
        setDescription('');
      } catch (error) {
        console.error('Error submitting ticket:', error);
        alert('Failed to submit ticket. Please try again.');
      } finally {
        setIsSubmitting('false');
      }
    }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2 flex flex-col'>
        <label htmlFor="name" className='font-bold'>Name</label>
        <input type="text" id='name' name='name' placeholder='Your name' className='border-1 border-gray-300 py-2 pl-2 rounded-md' required/>
      </div>

      <div className='space-y-2 flex flex-col'>
        <label htmlFor="email" className='font-bold'>Email</label>
        <input type="email" id='email' name='email' placeholder='Your email address' className='border-1 border-gray-300 py-2 pl-2 rounded-md' required/>
      </div>

      <div className="space-y-2 flex flex-col">
        <label htmlFor="description" className='font-bold'>Description</label>
        <textarea name="description" id="description" placeholder="Please describe the issue you're experiencing" className='border-1 border-gray-300 py-2 pl-2 rounded-md' rows={5} required></textarea>
      </div>

      <button type='submit' className='bg-black text-white font-semibold p-2 rounded-md cursor-pointer'>
        {isSubmitting ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  )
}

export default TicketForm