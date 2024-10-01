"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateUser() {

    const [email , setEmail] = useState();
    const [notify , setNotify] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const {data : session} = useSession()
     const userId = session.user.id;

    
  async function onSubmitPassword() {
    console.log(email);
    try {
    //   setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
          console.log(response,"hereis response")
          setNotify("Password reset link is sent to you on give email")
        // setShowNotification(true);
        toast.success("Password reset link sent Successfully", { duration: 5000 });
      } else {
        // setLoading(false);
        toast.error("Something Went wrong");
      }
    } catch (error) {
    //   setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  async function updateUserProfile() {
    
    try {
        const response = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, dateOfBirth, address, name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error updating profile');
        }

        console.log(data.message); // Profile updated successfully
        return data.data; // Updated profile data
    } catch (error) {
        console.error('Error updating user profile:', error);
    }
}

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-teal-800 p-4">
        <h1 className="text-white text-2xl mb-6">Welcome new</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Password Reset Card */}
          <div className="w-full md:w-1/3 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white border-opacity-20">
              <h2 className="text-xl font-semibold text-white">Reset Password</h2>
              <p className="text-sm text-gray-300">Enter your email to reset your password</p>
            </div>
            <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your email"
                      onChange={(e) => {{
                          setEmail(e.target.value);
                        }
                      }}
                    />
                    {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <p className="text-red-500 text-sm mt-1">Invalid email address.</p>
                    )}
                  </div>
                </div>
            </div>
            <div className="p-4 bg-white bg-opacity-5">
              <button
              onClick={onSubmitPassword}
               className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-purple-900">
                Send Reset Link
              </button>
            </div>
            <div className="p-10 text-green-400 font-bold">{notify}</div>
          </div>
  
          {/* Update User Information Card */}
          <div className="w-full md:w-1/3 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white border-opacity-20">
              <h2 className="text-xl font-semibold text-white">Update User Information</h2>
              <p className="text-sm text-gray-300">Update your profile details</p>
            </div>
            <div className="p-4">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="p-4 bg-white bg-opacity-5">
              <button 
              onClick={updateUserProfile}
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-purple-900">
                Update Profile
              </button>
            </div>
          </div>
  
          {/* Email Verification Card */}
          <div className="w-full md:w-1/3 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white border-opacity-20">
              <h2 className="text-xl font-semibold text-white">Email Verification</h2>
              <p className="text-sm text-gray-300">Verify your email address</p>
            </div>
            <div className="p-4">
              <form>
                <div className="mb-4">
                  <label htmlFor="verificationToken" className="block text-sm font-medium text-gray-300 mb-1">Verification Token</label>
                  <input
                    type="text"
                    id="verificationToken"
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter verification token"
                  />
                </div>
              </form>
            </div>
            <div className="p-4 bg-white bg-opacity-5">
              <button className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-purple-900">
                Verify Email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }