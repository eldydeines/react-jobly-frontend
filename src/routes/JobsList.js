import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import FilterJobsForm from "./FilterJobs";

const JobsList = () => {

    const [jobs, setJobs] = useState([]);

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

    const findJobs = async (formData) => {
        try {
            let data = await JoblyApi.getFilteredJobs(formData);
            setJobs(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

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