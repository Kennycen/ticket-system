'use client'
import { createTicket } from '@/lib/api';
import React, { useState } from 'react'

const TicketForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
        setError(null);

      try {
            // Basic validation
            if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
                setError('All fields are required');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                setError('Please enter a valid email address');
                return;
            }

            await createTicket(formData);
        alert('Ticket submitted successfully');
        
            // Reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                description: ''
            });
      } catch (error) {
        console.error('Error submitting ticket:', error);
            setError(error.response?.data?.message || 'Failed to submit ticket. Please try again.');
      } finally {
            setIsSubmitting(false);
      }
    };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
      <div className='space-y-2 flex flex-col'>
        <label htmlFor="name" className='font-bold'>Name</label>
                <input 
                    type="text" 
                    id='name' 
                    name='name' 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your name' 
                    className='border-1 border-gray-300 py-2 pl-2 rounded-md' 
                    required
                />
      </div>

      <div className='space-y-2 flex flex-col'>
        <label htmlFor="email" className='font-bold'>Email</label>
                <input 
                    type="email" 
                    id='email' 
                    name='email' 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Your email address' 
                    className='border-1 border-gray-300 py-2 pl-2 rounded-md' 
                    required
                />
      </div>

      <div className="space-y-2 flex flex-col">
        <label htmlFor="description" className='font-bold'>Description</label>
                <textarea 
                    name="description" 
                    id="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe the issue you're experiencing" 
                    className='border-1 border-gray-300 py-2 pl-2 rounded-md' 
                    rows={5} 
                    required
                />
      </div>

            <button 
                type='submit' 
                disabled={isSubmitting}
                className='bg-black text-white font-semibold p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
        {isSubmitting ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
    );
};

export default TicketForm;