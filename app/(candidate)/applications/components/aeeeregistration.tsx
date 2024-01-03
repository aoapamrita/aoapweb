"use client";
import {
  addCityToApplication,
  getApplicationJeeStatus,
  getCityByApplication,
  getProgrammesByApplication,
  removeCityFromApplication,
  updateApplicationJeeStatus,
} from "@/app/data/applicationclient";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import CompleteRegistration from "./completeregistration";
import EntranceTotalPayments from "./entrancetotalpayments";
import DataLoader from "@/app/components/DataLoader";
import ApplicationCities from "./applicationcity";
import ToggleSwitch from "./toggleswitch";
import BarcodeComponent from "./barcode";
import html2pdf from 'html2pdf.js';
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import React from 'react';
import getCandidate from "@/app/data/getCandidate";
import getCandidateParentById from "@/app/data/getCandidateParent";
import { format } from 'date-fns';
import dayjs from "dayjs";
import CldPicture from "../../profile/components/cldpicture";
import { useEffect } from 'react';
import "../../../style/formstyle.css";

import ShowApplicationCities from "./showapplncities";

export default function AeeeRegistration({ application }) {
  const queryClient = useQueryClient();

  const { data: applicationCities, isLoading: applicationCitiesLoading } =
    useQuery({
      queryKey: ["applncities", application.id],
      queryFn: () => getCityByApplication(application.id),
    });

  const { data: jeestatus, isLoading: jeeStatusLoading } = useQuery({
    queryKey: ["application", application.id, "jee"],
    queryFn: () => getApplicationJeeStatus(application.id),
  });

  const jeeStatusMutation = useMutation({
    mutationFn: (status) => {
      return updateApplicationJeeStatus(application.id, status);
    },
    onMutate: async (variables) => {
      const queryKey = ["application", application.id, "jee"];
      const previousData = queryClient.getQueryData(queryKey);

      const updatedData = { ...previousData, jee: variables };

      queryClient.setQueryData(queryKey, updatedData);

      const rollback = () => {
        queryClient.setQueryData(queryKey, previousData);
      };
      return { rollback };
    },
    onError: (error, variables, context) => {
      context.rollback();
    },
    onSuccess: (data, variables, context) => {
      context.rollback();
      queryClient.setQueryData(["application", application.id, "jee"], data);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["application", application.id, "jee"]);
    },
  });

  function changeJeeStatus(status) {
    jeeStatusMutation.mutate(status);
  }

  const { mutate: cityremovemutate, isLoading: cityremoveloading } =
    useMutation({
      mutationFn: (city) => {
        return removeCityFromApplication(application.id, city.examcityId);
      },
      onMutate: async (applicationcity) => {
        const queryKey = ["applncities", application.id];
        const previousData = queryClient.getQueryData(queryKey);

        const updatedData = previousData.filter(
          (item) => item.id != applicationcity.id
        );

        queryClient.setQueryData(queryKey, updatedData);

        const rollback = () => {
          queryClient.setQueryData(queryKey, previousData);
        };
        return { rollback };
      },
      onError: (error, variables, context) => {
        context.rollback();
      },
      onSuccess(data, variables, context) {
        const { message } = data;
        if (message != "success") {
          context.rollback();
        }
      },
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(["applncities", application.id]);
      },
    });

  function removeCity(city) {
    cityremovemutate(city);
  }

  const { mutate: cityaddmutate, isLoading: cityaddloading } = useMutation({
    mutationFn: (id) => {
      return addCityToApplication(application.id, id);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["applncities", application.id]);
    },
  });

  function addCity(id) {
    cityaddmutate(id);
  }

  const registration = application.Registration[0];

  const { data: parent } = useQuery({
    queryKey: [ "parent"],
    queryFn: () => getCandidateParentById(),
  });

  const { data: candidate } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidate(),
  });

  {/* Application form PDF download function */}
  const downloadPDF = () => {
    const element = document.getElementById('hidden-application-form');
    element.style.display = 'block';
    import('html2pdf.js').then(({ default: html2pdf }) => {
      html2pdf(element, {
        margin: 10,
        filename: 'Application-form.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
      }).then(() => {
        element.style.display = 'none';
      });
    });
  };

    {/* Admit Card form PDF download function */}
    const downloadAdmitCard = () => {
      const element = document.getElementById('hidden-admit-card');
      element.style.display = 'block';
      import('html2pdf.js').then(({ default: html2pdf }) => {
        html2pdf(element, {
          margin: 0,
          filename: 'AdmitCard.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 1, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        }).then(() => {
          element.style.display = 'none';
        });
      });
    };  



   const cloudPhotoUrl = "https://res.cloudinary.com/dkzpmdjf0/image/upload/c_fill,h_150,w_120/";
   const cloudSignUrl = "https://res.cloudinary.com/dkzpmdjf0/image/upload/c_fill,h_150,w_300/";
   

   const cloudACPhotoUrl = "https://res.cloudinary.com/dkzpmdjf0/image/upload/c_fill,h_120,w_100/";
   const cloudACSignUrl = "https://res.cloudinary.com/dkzpmdjf0/image/upload/c_fill,h_50,w_100/";
  

  return (
    <>         
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl bg-white rounded-lg py-10 px-8">
        <div className="px-4 sm:px-0">
        <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {registration
              ? `Registration No : ${registration.registrationNo}`
              : "Registration Pending"
             
              }
          </h3>
          {registration?
            <span className="flex justify-end">
                  <button
                      type="button"
                      className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={downloadPDF}
                    >
                      <ArrowDownOnSquareIcon className="h-6 w-6"  />
                      Download Application
                    </button>
                    <button
                      type="button"
                      className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={downloadAdmitCard}
                    >
                      <ArrowDownOnSquareIcon className="h-6 w-6"  />
                      Download Admit Card
                    </button>
            </span>: ""
          } 
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Entrance Exam
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.exam.entrance.code.toUpperCase()}
              </dd>
            </div>
            {registration && registration.Slot ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Slot details
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>Registration No : {registration.Slot.registrationNo}</p>
                  <p>Exam Mode : {registration.Slot.examMode}</p>
                  <p>
                    Exam Date:{" "}
                    {dayjs(registration.Slot.examDate).format("DD/MM/YYYY")}
                  </p>
                  <p>Exam Time: {registration.Slot.examTime}</p>
                  <p>Selected City: {registration.Slot.selectedCityCode}</p>
                </dd>
              </div>
            ) : null}
            {registration && registration.AdmitCard ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Admit Card details
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>
                    Registration No : {registration.AdmitCard.registrationNo}
                  </p>
                  <p>Exam Mode : {registration.AdmitCard.examMode}</p>
                  <p>
                    Exam Date:{" "}
                    {dayjs(registration.AdmitCard.examDate).format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p>Exam Time: {registration.AdmitCard.examTime}</p>
                  <p>Location Name: {registration.AdmitCard.locationName}</p>
                  <p>
                    Location Address: {registration.AdmitCard.locationAddress}
                  </p>
                  <p>Pincode: {registration.AdmitCard.pincode}</p>
                  <p>PhoneNumber: {registration.AdmitCard.phoneNumber}</p>
                </dd>
              </div>
            ) : null}
            {registration ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  City Preferences
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {applicationCitiesLoading ? (
                    <DataLoader size="lg" />
                  ) : (
                    <ShowApplicationCities
                      applicationCities={applicationCities}
                    />
                  )}
                </dd>
              </div>
            ) : (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  City Preferences
                  <p className="text-xs italic">
                    Choose 3 cities to attend the{" "}
                    <strong>Computer Based Test</strong>
                  </p>
                  {applicationCities && applicationCities.length != 3 && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      It is mandatory to select 3 cities
                    </p>
                  )}
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {applicationCitiesLoading ? (
                    <DataLoader size="lg" />
                  ) : (
                    <ApplicationCities
                      applicationCities={applicationCities}
                      removeCity={removeCity}
                      application={application}
                      addCity={addCity}
                      cityaddloading={cityaddloading}
                      cityremoveloading={cityremoveloading}
                    />
                  )}
                </dd>
              </div>
            )}
            {registration ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Do you want to consider based on the JEE CRL Rank?
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jeeStatusLoading ? (
                    <DataLoader size="lg" />
                  ) : jeestatus.jee ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </dd>
              </div>
            ) : (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Do you want to consider based on the JEE CRL Rank?
                  <p className="text-xs italic">
                    <span className="text-red-700">*</span> JEE details and
                    Percentile shall be entered after the publication of JEE
                    Mains 2024 results. The fields will be enabled only after
                    the JEE Mains 2024 results. Candidates who have not
                    submitted the requisite details will not be considered for
                    admission based on JEE CRL Percentile
                  </p>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jeeStatusLoading ? (
                    <DataLoader size="lg" />
                  ) : (
                    <ToggleSwitch
                      initialValue={jeestatus.jee}
                      changeStatus={changeJeeStatus}
                    />
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
        {registration ? (
          <EntranceTotalPayments application={application} />
        ) : applicationCitiesLoading ? (
          <DataLoader size="lg" />
        ) : applicationCities.length < 3 ? (
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold italic leading-7 text-gray-900">
              <span className="text-red-600">*</span>Please select your city
              preferences to complete the registration
            </h3>
          </div>
        ) : (
          <CompleteRegistration application={application} />
        )}
      </div>

      {/* Application form PDF design */} 
      <div className="hidden" id="hidden-application-form">
      <div id="application-form">             
       <div className="form-logo">
            <img 
                src="/images/pdf-logo.png"
                width="300"
                height="150"
                alt="Amrita Vishwa Vidyapeetham"
            />    
        </div>
        <div className='form-reg'> 
            {/* Barcode generation from register number */}
            <p><BarcodeComponent number={registration?.registrationNo}  /></p>
        </div>
        <div className="form-image">
            <img
                id="student-image"
                width="150"
                height="120"
                src={`${cloudPhotoUrl}${candidate?.photoid}.jpg`}
                sizes="100vw"
                alt="Image of Student"
            />
        </div>
        <div className="form-section header">
            <div className="form-data">
               <p> Application Form for Admission to Amrita B.Tech </p>
               <p> Amrita School of Engineering-Amrita Vishwa Vidyapeetham </p>
               <p> (Data filled by the candidate on {formatDate(candidate?.createdAt)}) </p>
            </div>
        </div>            
        <div className="form-column">
          <h3 className="bold-heading">PERSONAL INFORMATION</h3>
            <div className="form-details">
                <p><span className='profile-span'>Candidate Name</span>: {candidate?.fullname} </p>
                <p><span className='profile-span'>Gender</span>:  {candidate?.gender?.name } </p>
                <p><span className='profile-span'>Date of Birth</span>: {dayjs(candidate?.dob).format("DD/MM/YYYY")} </p>
                <p><span className='profile-span'>Social Status</span>: {candidate?.socialstatus?.name} </p>
                <p><span className='profile-span'>Email Address</span>: {candidate?.email }</p>
                <p><span className='profile-span'>Mobile Number</span>: {candidate?.phone} </p>
                <p><span className='profile-span'>Alternate Email</span>: {parent?.email} </p>
                <p><span className='profile-span'>Aadhar Number</span>:  {candidate?.aadhaarnumber} </p>        
                <p><span className='profile-span'>Parent's / Guardian's Name</span>: {parent?.fullname} </p>
                <p><span className='profile-span'>Parent's / Guardian's Mobile No</span>: {parent?.phone} </p>
                <p><span className='profile-span'>How did you know about Amrita ?</span>: {candidate?.infosource?.name} </p>
            </div> 
        </div>
        <div className="form-column nb">
          <div className="form-appln-b">
          <h3 className="bold-heading">ADDRESS FOR CORRESPONDENCE</h3>
            <div className="form-details">
                <p><span className='profile-span'>Address Line 1</span>: {candidate?.address1} </p>
                <p><span className='profile-span'>Address Line 2</span>: {candidate?.address2} </p>   
                <p><span className='profile-span'>State</span>: {candidate?.state?.name} </p>
                <p><span className='profile-span'>District</span>: {candidate?.district?.name} </p>
                <p><span className='profile-span'>City</span>: {candidate?.city?.name} </p>
            </div>
            </div>
            <div className="form-appln-b mt-4">
            <h3 className="bold-heading">CITY PREFERENCES</h3>
            {applicationCities?.map((city, idx) => (
              <p> {idx + 1}. {city.examcity.city.name}</p>
            ))}      
            </div>

        </div>
        
        
        <div className="form-section p-2 pb-4">
            <h3 className="bold-heading mt-3">DECLARATION</h3>
                <p>I {candidate?.fullname} son/daughter of {parent?.fullname} do hereby declare that the facts given by me in the application are true. I shall produce the original
                certificates at the time of admission or on demand</p>
                <p className='form-end'>Place: </p>
                <p className='form-end'>Date:</p>
                <div className="form-signature pr-8">
                          <div className="signature-image">
                              <img
                                  src={`${cloudSignUrl}${candidate?.signid}.jpg`}
                                  width="150"
                                  height="150"
                                  alt="Signature of Student"
                                  className="mx-auto mb-6"
                              />
                              <p className='sign-text'>Signature of the Candidate</p>
                          </div>
                </div>
        </div>
        

      </div>
      </div>
      

{/* Admit Card PDF design */} 
<div className="a4-div" id="hidden-admit-card">
      <div id="admit-card">             
       <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 form-border border-right">
        <div className="">
            <img className="am-logo"
                src="/images/pdf-logo.png"
                 alt="Amrita Vishwa Vidyapeetham"
            />  
            </div>  
            <div className="form-data sm:col-span-2 ">
               <p className="form-header"> AMRITA ENTRANCE EXAMINATION ENGINEERING 2024 : Phase I</p>
               <p className="form-header"> ADMIT CARD</p>
            </div>
           
        </div>

        <div className="sm:grid sm:grid-cols-4 sm:gap-0 sm:px-0">
        <div className="form-border sm:col-span-3 sm:grid sm:grid-cols-4 sm:gap-0 sm:px-0">
        <div className="form-details">
             
             <img className="mb-2"
                 src={`${cloudACPhotoUrl}${candidate?.photoid}.jpg`}
                 sizes="100vw"
                 alt="Image of Student"
             />
          
                               <img
                                   src={`${cloudACSignUrl}${candidate?.signid}.jpg`}
                                    alt="Signature of Student"
                                   className="mb-0"
                               />                            
                       
                </div>
            <div className="form-details sm:col-span-3 ac-profile">
                <p ><b><span className='ac-profile-span'>Registration No. </span>:  {registration.registrationNo} </b></p>
                <p><span className='ac-profile-span'>Candidate Name</span>: {candidate?.fullname} </p>
                <p><span className='ac-profile-span'>City </span>: {candidate?.city?.name}  </p>
                <p><span className='ac-profile-span'>State </span>: {candidate?.state?.name}   </p>
                <p><span className='ac-profile-span'>Mobile Number</span>: {candidate?.phone} </p>  
                <p><span className='ac-profile-span'>Gender</span>:  {candidate?.gender?.name } </p>
                <p><span className='ac-profile-span'>Date of Birth</span>: {dayjs(candidate?.dob).format("DD/MM/YYYY")} </p>            
            </div> 
        </div>
        <div className="form-border">
              
               <div className="QR">
               {/* Barcode generation from register number
            <p><BarcodeComponent number={registration?.registrationNo}  /></p>
             */}
            <img  className="QR"
                src="/images/QR.png"
                 alt="Amrita Vishwa Vidyapeetham"
            /> 
            </div>
             
        </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-0 sm:px-0">
          <div className="form-border small-font">
          <p>Candidate should produce the Admit Card (original) duly signed by the
candidate and invigilator at the time of admission.</p>
            </div>
            <div className="form-border small-font">
            <p>I have read the instructions given under and agree to abide by them.</p>
            </div>
            </div>

            <div className="sm:grid sm:grid-cols-10 sm:gap-0 sm:px-0 ">
            <div className="form-border small-font">Date</div>
            <div className="form-border small-font">Reporting Time</div>
            <div className="form-border small-font">Exam Time</div>
            <div className="form-border small-font sm:col-span-3 ">Centre Address</div>
            <div className="form-border small-font sm:col-span-2 ">Signature of Candidate
             <p className="very-small-font">(Should be signed by the candidate in front of Invigilator in the examination hall)</p>
             </div>
            <div className="form-border small-font sm:col-span-2 ">Signature of Invigilator</div>
            </div>
            <div className="sm:grid sm:grid-cols-10 sm:gap-0 sm:px-0 border-bottom">
            <div className="form-border small-font">28th April 2024</div>
            <div className="form-border small-font">9:15 AM</div>
            <div className="form-border small-font">10:00 AM to 12.30 PM</div>
            <div className="form-border small-font sm:col-span-3 ">#234, 1st Cross, 6th Main, Koramangala,Bengalore-100</div>
            <div className="form-border small-font sm:col-span-2 "></div>
            <div className="form-border small-font sm:col-span-2 "></div>
            </div>

        <div className='sm:grid sm:grid-cols-1 sm:gap-0 sm:px-5 text-center sm:pt-2'> 
           
            <p><u><b>INSTRUCTIONS TO CANDIDATES</b></u></p>
            <p className="small-font">(Candidates are required to carefully read / understand and must strictly follow the instructions).</p>
        </div>
        <div className='instructions'> 
        <ul>
          <li><span>1.</span><p>Ensure that all the details printed above are correct and true as per your knowledge. Note: Write to <a href="mailto:btech@amrita.edu">btech@amrita.edu</a> if there is any discrepancy, with proof for necessary rectification.</p></li>
          <li><span>2.</span><p>You are required to appear for the examination at own expense at the time and centre as printed on the Admit Card, not in any other centre. You are also advised to acquaint yourselves with the location of the exam centre one day prior to the examination.</p></li>
          <li><span>3.</span><p>You must be present at the Examination Centre allotted to you, 45 Minutes before the commencement of the examination. Candidates will be allowed to enter the Examination Centre after the starting of the Examination.</p></li>
          <li><span>4.</span><p>You must report to the examination centre with a print copy of this Admit Card along with a valid photo identity card proof issued by the Government without which the candidate will not be allowed to appear for the examination. The candidate must produce, on demand, the Admit Card at the entrance & to the Invigilator.</p></li>
          <li><span>5.</span><p>Paste a recent Passport size colour photograph/signature on the downloaded Admit Card if your photo/Signature is not printed in the Admit Card.</p></li>
          <li><span>6.</span><p>Your Admit Card shall be preserved till the end of the Seat Allotment Process & shall produce in original, duly signed by you & invigilator at the time of admission, without which the admission will stand cancelled.</p></li>
          <li><span>7.</span><p>Check your name in the Roster/Room list and proceed to the designated area. A seat with AEEE 2024 Registration number will be allotted to you. You must occupy the allotted seat ONLY. If you are found appearing in the examination from a seat or room other than the one allotted to you, your candidature shall be cancelled, and no plea would be accepted for it.</p></li>
          <li><span>8.</span><p>You must strictly follow the instructions of the invigilator at the examination hall.</p></li>
          <li><span>9.</span><p>The invigilator cannot and will not answer questions related to the questions in the examination.</p></li>
          <li><span>10.</span><p>No material is not allowed in the Examination Hall. Examination will stand cancelled if you are found possessing any material other than Admit Card.</p></li>
          <li><span>11.</span><p>Neither the university nor the exam centre will not be responsible for anything lost, stolen, or misplaced personal belongings.</p></li>
          <li><span>12.</span><p>There are no scheduled breaks during the examination.</p></li>
          <li><span>13.</span><p>You are required to carry your own pens, pencil etc. Paper will be provided for rough work, during the examination.</p></li>
          <li><span>14.</span><p>The exam has negative marking for wrong answers. So please be sure of the option you choose for each question, as you will only be able to change your choice but not unselect it.</p></li>
          <li><span>15.</span><p>You are governed by Rules and Regulations of the University regarding the conduct in the Examination Hall. All cases of unfair means will be dealt with as per university rules. Candidates shall maintain perfect silence and attend to their question paper only. Any conversation/gesture/disturbance in the Examination Hall/malpractice /attempt to commit malpractice/violation of the rules shall be deemed as misbehavior and will lead to disqualification of the candidate. Anything reported by the Invigilator, or the University Representative deputed for the same will be accepted as final.</p></li>
          <li><span>16.</span><p>If a candidate is found using unfair means or impersonating, his/her candidature shall be cancelled, and he/she will be liable to be debarred for taking examination either permanently or for a specified period according to the nature of offence. The decision of the University representatives/Invigilators is final and binding on the candidate.</p></li>
          <li><span>17.</span><p>You are not allowed to leave the examination hall before the scheduled end of the examination.</p></li>
          <li><span>18.</span><p>JURISDICTION: Courts situated in Coimbatore District, Tamil Nadu only</p></li>
    </ul>
</div>     
      </div>
      </div>

       
    </>
    
  );
  function formatDate(dateString) {
    if (!dateString) return '';
    return format(new Date(dateString), "MMMM dd, yyyy h:mm a");
  }
};
