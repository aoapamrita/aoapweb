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
import "../../../style/formstyle.css";


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
  const downloadPDF = ({}) => {
   const element = document.getElementById('hidden-application-form');
   element.style.display = 'block';
    html2pdf(element, {
      margin: 10,
      filename: 'Application-form.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1,useCORS: true },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' }
    }).then(() => {
      element.style.display = 'none';
    });
  };

  

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
            </span>:""
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
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Do you want to consider based on the JEE CRL Rank?
                <p className="text-xs italic">
                  <span className="text-red-700">*</span> JEE details and
                  Percentile shall be entered after the publication of JEE Mains
                  2024 results. The fields will be enabled only after the JEE
                  Mains 2024 results. Candidates who have not submitted the
                  requisite details will not be considered for admission based
                  on JEE CRL Percentile
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
          </dl>
        </div>
        {registration ? (
          <EntranceTotalPayments application={application} />
        ) : (
          <CompleteRegistration application={application} />
        )}
      </div>

      {/* Application form PDF design */} 
      <div className="hidden" id="hidden-application-form">
      <div id="application-form">             
       <div className="form-logo">
            <img 
                src="https://upload.wikimedia.org/wikipedia/en/f/f8/Amrita-vishwa-vidyapeetham-color-logo.png"
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
            <CldPicture
                id="student-image"
                width="150"
                height="250"
                src={candidate?.photoid}
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
                              <CldPicture
                                  src={candidate?.signid}
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
      
       
    </>
    
  );
  function formatDate(dateString) {
    if (!dateString) return '';
    return format(new Date(dateString), "MMMM dd, yyyy h:mm a");
  }
};
