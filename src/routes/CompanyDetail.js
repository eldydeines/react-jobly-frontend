//Company Detail Component provides the detail about a company
//and shows all jobs currently provided by the company.
//If user has not applied to a job, a button will appear to allow them to apply.
//If user has applied, it will show that they have applied to the job.

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import "../styling/CompanyDetail.css";

const CompanyDetail = () => {

    const { handle } = useParams();

    const [company, setCompany] = useState({});
    const [companyJobs, setCompanyJobs] = useState([]);
    const [hasJobs, setHasJobs] = useState(false);

    //upon intial render, get all jobs on the company profile and their profile to display.
    useEffect(function () {
        async function getCompanyDetail() {
            try {
                let data = await JoblyApi.getCompany(handle);
                setCompany(data);
                setCompanyJobs(data.jobs);
                if (companyJobs) {
                    setHasJobs(true);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getCompanyDetail();
    }, [hasJobs]);

    return (
        <div>
            <h2>{company.name}</h2>
            <h3>{company.description}</h3>
            <h3>Employee Count: {company.numEmployees}</h3>
            {hasJobs
                ? <h2 className="company-positions">Current Positions</h2>
                : null
            }
            {companyJobs.map(j =>
            (
                <JobCard key={j.id} id={j.id} handle={j.companyHandle} title={j.title} salary={j.salary} equity={j.equity} name={j.companyName} />
            )
            )
            }
        </div>
    )
}

export default CompanyDetail;