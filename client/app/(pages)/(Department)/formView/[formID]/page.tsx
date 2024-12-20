"use client"

import React from "react"
import { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../../../_lib/firebase";
import axios from 'axios';
import { IoMdArrowBack } from "react-icons/io";

type Application = {
    ID: string;
	UploaderID: string;
	UploaderName: string;
	CourseAppliedID: string;
    CourseName: string
	FileURL: string;
    PreviousExperience: boolean;
	Status: string;
}

// Todo: Fix and create API endpoints

function PDFView({ file, onClose }){
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 flex flex-col justify-center rounded-lg shadow-lg h-[70%] max-[500px]:w-[97%] w-3/4 max-w-lg">
          <iframe src={file} className="rounded-xl hover:cursor-pointe border border-b-2r w-[100%] h-[100%]"/>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      );
}

export default function FormView({ params }) {
    const formId = params.formID;
    const router = useRouter();
    let [form, setForm] = useState<Application>();
    let [pdfViewOpen, setPDFViewOpen] = useState(false);
    let [loading, setLoading] = useState<boolean>(false);

    let baseUrl = "http://localhost:9000";
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("logged in");
                } else {
                    router.push('/login')
                }
            });
    
            return () => unsubscribe();
      }, [router]);

    const fetchFormById = async () => {
        try {
            setLoading(true)
          const response = await axios.get(`${baseUrl}/form/${formId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          });
          console.log(response.data)
          setForm(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
    };

    const handlePDFView = () => {
        setPDFViewOpen((prevState) => !prevState);
    };

    useEffect(() => {
        fetchFormById();
    }, []);

    const updateForm = async ( update: string) => {
        try {
            const data = {
                ID: form.ID,
                UploaderID: form.UploaderID,
                UploaderName: form.UploaderName,
                CourseAppliedID: form.CourseAppliedID,
                CourseName: form.CourseName,
                FileURL: form.FileURL,
                PreviousExperience: form.PreviousExperience ?? false,
                Status: update
            }
            await axios.patch(`${baseUrl}/forms`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }).then(() => {
                router.push(`/departmentDashboard/application`);
            });
        }catch(error) {
            console.error("Error updating form:", error);
        }
    }

    const handleBackButton = () => {
        router.push(`/departmentDashboard/application`)
    }

    return (
        <div className="h-[100%] w-[100%] bg-slate-50 flex flex-col gap-y-4 justify-center items-center">
            <IoMdArrowBack className="absolute max-[500px]:left-5 text-black text-3xl left-10 top-10 hover:cursor-pointer hover: hover:text-gray-700" onClick={handleBackButton}/>
            {loading && <h1>Loading....</h1>}
            {!loading && 
            <>
            <h1 className="text-[#0e141b] max-[500px]:mr-[0vw] tracking-light text-[32px] font-bold leading-tight min-w-72 mr-[57vw]">Review TA Application</h1>
            <div className="h-[70%] w-[80%] mt-5">
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Form ID</p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-[500px]:text-lg">{form?.ID}</p>
                </div>   
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Uploader ID</p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-[500px]:text-lg">{form?.UploaderID}</p>
                </div>
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Uploader</p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-[500px]:text-lg">{form?.UploaderName}</p>
                </div>
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Course</p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-[500px]:text-lg">{form?.CourseName}</p>
                </div>
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Course ID</p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-[500px]:text-lg">{form?.CourseAppliedID}</p>
                </div>
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Has Previous Experience?</p>
                    <p className="text-[#0e141b] text-sm font-normal leading-normal max-[500px]:text-lg">  {form?.PreviousExperience !== undefined && form?.PreviousExperience !== null ? String(form.PreviousExperience) : "false"}                    </p>
                </div>
                <div className="flex flex-row border-t border-t-[#d0dbe7] py-5 gap-x-4 max-[500px]:gap-x-14">
                    <p className="text-[#4e7297] text-sm font-normal leading-normal w-[10vw] max-[500px]:w-[25vw] max-[500px]:text-lg">Resume</p>
                    <p onClick={handlePDFView} className="text-blue-500 hover:cursor-pointer hover:text-blue-400 underline decoration-blue-500 hover:decoration-blue-400 text-sm font-normal leading-normal max-[500px]:text-lg">Open Resume</p>
                </div>
            </div>
            <div className="w-[20%] max-[500px]:w-[40%] mt-[-10vh] h-[10%] flex flex-col gap-y-2 items-center justify-center">
                <button onClick={() => updateForm('Pending Committee Auth')} className="bg-green-500 max-[500px]:w-[80%] w-[80%] h-[3vh] hover:bg-green-600 text-white text-center items-center flex justify-center rounded-lg"><FaCheck/></button>
                <button onClick={() => updateForm('Rejected')} className="text-black bg-red-500 max-[500px]:w-[80%] hover:bg-red-600 text-center w-[80%] h-[3vh] items-center flex justify-center rounded-lg"><FaXmark /></button>
            </div>
            </>
            }
            {pdfViewOpen && <PDFView file={form.FileURL} onClose={handlePDFView}/>}
        </div>
    )
}