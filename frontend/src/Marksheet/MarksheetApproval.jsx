import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewMarksheet.css'; // Import CSS for styling
import background from '../Images/enmarks.jpg'; 

export default function MarkSheetApprove() {
  const [details, setDetails] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [allreport, setAllreport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/alldetails');
        const data = await response.json();
        console.log(data);
        setDetails(data);
        setFilteredDetails(data); // Initialize filtered details with all details
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:8081/all');
        console.log(response.data);
        setAllAssignments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8081/reportMarksheet/alldetails');
        console.log(response.data);
        setAllreport(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  // Function to filter details based on search query
  
  const filterDetails = () => {
    if (!searchQuery.trim()) {
      // If search query is empty, display all details
      setFilteredDetails(details);
    } else {
      // Filter details based on search query
      const filtered = details.filter(detail =>
        (detail.GroupName && detail.GroupName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (allAssignments.find(assignment => assignment.assID === detail.assID)?.title && allAssignments.find(assignment => assignment.assID === detail.assID)?.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredDetails(filtered);
    }
  };


  // Update filtered details when search query changes
  useEffect(() => {
    filterDetails();
  }, [searchQuery, details, allAssignments]);

  // Event handler for search bar input change
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/marksheet/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Assignment deleted');
      window.location.reload()
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8081/marksheetApprovel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Approved');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className='justify-center items-center min-h-screen' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>

        <br/>

        <div className=' text-white w-full mb-3' >
          <h1 className='text-3xl text-center'>Students marks</h1>
        </div>

        <div className='flex flex-row'>
        <div className='w-full ml-20 mb-10 mt-5'>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Group ID or Assignment Title"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="ml-3 mb-3 p-2 w-2/5 text-center rounded-lg bg-gray-300 placeholder-gray-500"
          />
        </div>

        {/* <div className='ml-auto w-52 '>
          <a href='/approvedmarks'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-1'>
            Approved Marks
          </button>
          </a>
        </div> */}
        </div>
        

        <div className="view-marksheet-container">
          {filteredDetails.map((detail, index) => (
            detail.status === '0' && (
              <div key={index} className="detail-container">
                <div className="detail-header">
                  <h2> Group ID: {detail.GroupName}</h2>
                  <h3> Assignment Title: {allAssignments.find(assignment => assignment.assID === detail.assID)?.title}</h3>

                  {/* <button
                    className={`approve-button ${detail.status === '1' ? 'approved' : 'not-approved'}`}
                    onClick={() => handleApprove(detail._id)}
                    disabled={detail.status === '1'}
                  >
                    Approve
                  </button> */}

                  <button
                    className="approve-button bg-red-600"
                    onClick={() => handleDelete(detail._id)}
                  >
                    Delete
                  </button>
                </div>
                <table className="w-full border-collapse border border-gray-500">
  <thead className="bg-gray-200">
    <tr>
      <th className="border border-gray-500 px-4 py-2">ITNumber</th>
      <th className="border border-gray-500 px-4 py-2">Criteria</th>
      <th className="border border-gray-500 px-4 py-2">AddMarks</th>
      <th className="border border-gray-500 px-4 py-2">RealMarks</th>
      <th className="border border-gray-500 px-4 py-2">TotalMarks</th>
      <th className="border border-gray-500 px-4 py-2">FeedBack</th>
    </tr>
  </thead>
  <tbody>
    {detail.Student.map((student, i) => (
      <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
        <td className="border border-gray-500 px-4 py-2">{student.ITNumber}</td>
        <td className="border border-gray-500 px-4 py-2">{student.criteria.map((item, index) => <div key={index}>{item}</div>)}</td>
        <td className="border border-gray-500 px-4 py-2">{student.AddMarks.map((item, index) => <div key={index}>{item}</div>)}</td>
        <td className="border border-gray-500 px-4 py-2">{student.RealMarks.map((item, index) => <div key={index}>{item}</div>)}</td>
        <td className="border border-gray-500 px-4 py-2">{parseFloat(student.TotalMarks).toFixed(2)}</td>
        <td className="border border-gray-500 px-4 py-2">{student.Feedback}</td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            )))}
        </div>
      </div>
    </>
  );


}
