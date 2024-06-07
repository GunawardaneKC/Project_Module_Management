import React from 'react'
import background from '../Images/Home.jpg'
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePasswordstatus, setupdatePasswordstatus] = useState('');
    const [Email, setEmail] = React.useState('');
    const [role, setrole] = React.useState('');

    React.useEffect(() => {
        const Token = localStorage.getItem('token');

        if (Token) {
            const payloadPart = Token.split('.')[1];
            const payload = JSON.parse(atob(payloadPart));
            const username = payload.email;
            const role = payload.role;

            console.log(username);
            setEmail(username);
            setrole(role);

        }
    }, []);

    //get status of password update
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/findUserPasswordResetStatus',
                    {
                        email: Email // replace with the actual email
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                setupdatePasswordstatus(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (Email) {
            fetchData();
        }

    }, [Email]);


    const handlePasswordReset = async () => {
        try {
            await axios.patch('http://localhost:8081/resetPassword', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Password reset successfully');
            setModalIsOpen(false);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };
    return (
        <>

            <div
                className='fixed inset-0 h-screen'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    
                    zIndex: -1,
                }}
            >
                <br/>
                <h1 className='text-center text-3xl text-white mt-20 font-bold'>Project Module Management System</h1>
            
                <div className='flex justify-center items-center h-full mt-[-96px]'>
 
{/* 
                   <div className='bg-gray-800 shadow-md w-96 px-4 py-4 backdrop-blur-md backdrop-filter bg-opacity-50 flex items-center justify-center h-full'>
  <h1 className='text-4xl font-bold text-white mt-10 text-center leading-relaxed'>Welcome to <br /> Project Module Management <br /> System</h1>
</div> */}

                    <div className=''>

                    {role === 'user' && (
                            <a href='/registration'>
                                <div>
                                    <button class=" mt-20 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-gray-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Group Registration
                                    </button>
                                </div>
                            </a>
                        )}

                        <a href='/insertAss'>
                            <div>
                                <button class=" mt-20 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                    Assignments
                                </button>
                            </div>
                        </a>

                        {role === 'user' && (
                            <a href='/Reserachreq'>
                                <div>
                                    <button class=" mt-20 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-gray-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Reserch 
                                    </button>
                                </div>
                            </a>
                        )}

                        {/* <a href='/report'>
                            <div>
                                <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                    Reports
                                </button>
                            </div>
                        </a> */}


                        {role !== 'user' && (

                            <a href='/marksheet'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Assignment Marking
                                    </button>
                                </div>
                            </a>
                        )}

                            {role !== 'user' && (

                            <a href='/Reserachreqtable'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Research Requests
                                    </button>
                                </div>
                            </a>
                            )}

                        {/* {role !== 'user' && (

                            <a href='/marksheetreport'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Report Marking
                                    </button>
                                </div>
                            </a>
                        )} */}


                        {/* {role !== 'user' && (
                            <a href='/viewmarksheet'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Student Marks
                                    </button>
                                </div>
                            </a>
                        )} */}

                        {role !== 'user' && (
                            <a href='/marksheetapproval'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                    Student Marks
                                    </button>
                                </div>
                            </a>
                        )}

                            {role !== 'user' && (

                            <a href='/groupedit'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-700  after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Student Groups
                                    </button>
                                </div>
                            </a>
                            )}

                    </div>
                    

                    <div className=' ml-32'>

                        {role !== 'user' && (

                            <a href='/pannelcreate'>
                                <div>
                                    <button class=" mt-20 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-red-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                       Add Examin Panels
                                    </button>
                                </div>
                            </a>
                        )}

                        {role !== 'user' && (

                            <a href='/panels'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-red-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                    Examin Panels
                                    </button>
                                </div>
                            </a>
                        )}


                        {role !== 'user' && (
                            <a href='/register'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-red-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Add Staff Members
                                    </button>
                                </div>
                            </a>
                        )}

                        {role !== 'user' && (
                            <a href='/admin'>
                                <div>
                                    <button class=" mt-5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-red-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Staff Members
                                    </button>
                                </div>
                            </a>
                        )}

                    </div>


                    {/* <div>
                        {role === 'user' && (
                            <a href='/registration'>
                                <div>
                                    <button class=" mt-20 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-gray-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Group Registration
                                    </button>
                                </div>
                            </a>
                        )}

                        {role === 'user' && (
                            <a href='/Reserachreq'>
                                <div>
                                    <button class=" mt-20 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-700 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-20 w-72 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-gray-200 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                        Reserch 
                                    </button>
                                </div>
                            </a>
                        )}

                    </div> */}

                </div>
            </div>

        </>
    )
}
