//Jobslist component renders all jobs that are in the app backend database. 
//A user can filter using the inputs in the child component "FilterJobs".
//A user can also click on a button to apply.
//If a user has applied, the job card will show it has been applied to and will not show the button.

import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import FilterJobsForm from "./FilterJobs";

const JobsList = () => {

    const [jobs, setJobs] = useState([]);

    //upon initial load, show all jobs.
    useEffect(function () {
        async function getJobs() {
            try {
                let data = await JoblyApi.getJobs();
                setJobs(data.map(d => d));
            }
            catch (e) {
                console.log(e);
            }
        }
        getJobs();
    }, []);

    //If there is a filter applied, re-render the component.
    const findJobs = async (formData) => {
        try {
            let data = await JoblyApi.getFilteredJobs(formData);
            setJobs(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    //If the user choosed to clear the filter, the "clear button" click 
    // will call this function to reset the jobs list.
    const resetJobsList = async () => {
        try {
            let data = await JoblyApi.getJobs();
            setJobs(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="jobs">
            <h1>Jobs</h1>
            <FilterJobsForm findJobs={findJobs} resetJobsList={resetJobsList} />
            {jobs.map(j =>
            (
                <JobCard key={j.id} id={j.id} handle={j.companyHandle} title={j.title} salary={j.salary} equity={j.equity} name={j.companyName} />
            ))
            }
        </div>
    )
}

export default JobsList;