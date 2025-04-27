import TicketForm from "@/components/TicketForm";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center m-6">
        <h1 className="text-3xl font-bold">Support Ticket System</h1>
        <Link href='/admin' className='bg-black text-white font-semibold p-2 rounded-md cursor-pointer'>
          Admin Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Submit a Support Ticket</h2>
          <p className="text-muted-foreground mb-6">
            Please fill out the form below to submit a support request. Our team will respond as soon as possible.
          </p>
          <TicketForm/>
        </div>
      </div>
    </div>
  )
}