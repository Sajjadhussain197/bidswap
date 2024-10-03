"use client"
import { useState, useEffect } from 'react';

const BidListings = ({ bid }) => {
  console.log(bid.bids,"bid data")
  const [pendingBids, setPendingBids] = useState([]);
  const [approvedBids, setApprovedBids] = useState([]);
  const [pendingLimit, setPendingLimit] = useState(5);
  const [pendingPage, setPendingPage] = useState(1);
  const [approvedLimit, setApprovedLimit] = useState(5);
  const [approvedPage, setApprovedPage] = useState(1);

  // Function to process bids and categorize them
  const categorizeBids = (productsWithBids) => {
    const pending = [];
    const approved = [];

    productsWithBids.forEach((product) => {
      product.bids.forEach((bid) => {
        // Assuming 'expiresAt' determines if the bid is pending or approved
        const currentTime = new Date();
        if (new Date(bid.expiresAt) > currentTime) {
          pending.push({
            id: bid.id,
            bidder: bid.user.name,
            time:new Date(bid.expiresAt).toLocaleDateString(),
            amount: bid.amount,
            date: new Date(bid.createdAt).toLocaleDateString(),
          });
        } else {
          approved.push({
            id: bid.id,
            bidder: bid.user.name,
            amount: bid.amount,
            date: new Date(bid.createdAt).toLocaleDateString(),
          });
        }
      });
    });

    setPendingBids(pending);
    setApprovedBids(approved);
  };

  useEffect(() => {
    if (bid) {
      categorizeBids(bid);
    }
  }, [bid]);

  const renderPagination = (totalItems, limit, page, setPage) => {
    const totalPages = Math.ceil(totalItems / limit);
    return (
      <div className="flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 ${page === index + 1 ? 'bg-blue-500' : 'bg-gray-500'} text-white mx-1 rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const handleApprove = (bid) => {
    // Approve logic here
  };

  const handleReject = (bid) => {
    // Reject logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-teal-800 p-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Bid Listings</h1>

      {/* Pending Bids Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Pending Bids</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="pendingLimit" className="mr-2">Show:</label>
            <select
              id="pendingLimit"
              value={pendingLimit}
              onChange={(e) => {
                setPendingLimit(Number(e.target.value));
                setPendingPage(1);
              }}
              className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <p>Total Pending Bids: {pendingBids.length}</p>
        </div>
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-white border-opacity-20">
              <th className="text-left py-2">Bidder</th>
              <th className="text-right py-2">Amount</th>
              <th className="text-right py-2">Start Date</th>
              <th className="text-right py-2">Expiry Date</th>
              <th className="text-right py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingBids
              .slice((pendingPage - 1) * pendingLimit, pendingPage * pendingLimit)
              .map(bid => (
                <tr key={bid.id} className="border-b border-white border-opacity-10">
                  <td className="py-2">{bid.bidder}</td>
                  <td className="text-right">${bid.amount}</td>
                  <td className="text-right">{bid.date}</td>
                  <td className="text-right">{bid.time}</td>
                  <td className="text-right py-2">
                    <button
                      onClick={() => handleApprove(bid)}
                      className="bg-transparent border border-green-500 text-green-500 px-3 py-1 rounded-md mr-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(bid)}
                      className="bg-transparent border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {renderPagination(pendingBids.length, pendingLimit, pendingPage, setPendingPage)}
      </div>

      {/* Approved Bids Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Expired Bids</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="approvedLimit" className="mr-2">Show:</label>
            <select
              id="approvedLimit"
              value={approvedLimit}
              onChange={(e) => {
                setApprovedLimit(Number(e.target.value));
                setApprovedPage(1);
              }}
              className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <p>Total Approved Bids: {approvedBids.length}</p>
        </div>
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-white border-opacity-20">
              <th className="text-left py-2">Bidder</th>
              <th className="text-right py-2">Amount</th>
              <th className="text-right py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {approvedBids
              .slice((approvedPage - 1) * approvedLimit, approvedPage * approvedLimit)
              .map(bid => (
                <tr key={bid.id} className="border-b border-white border-opacity-10">
                  <td className="py-2">{bid.bidder}</td>
                  <td className="text-right">${bid.amount}</td>
                  <td className="text-right">{bid.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {renderPagination(approvedBids.length, approvedLimit, approvedPage, setApprovedPage)}
      </div>
    </div>
  );
};

export default BidListings;
