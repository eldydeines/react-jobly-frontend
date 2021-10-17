import React, { useState } from "react";
import "../styling/FilterJobs.css";

const FilterJobsForm = ({ findJobs, resetJobsList }) => {

    const INITIAL_STATE = {
        hasEquity: "",
        minSalary: 1,
        title: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        findJobs({ ...formData });
        setFormData(INITIAL_STATE)
    }

    return (
        <div className="filter-jobs-div">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Job Title </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Job to search for"
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor="minSalary">Minimum Salary</label>
                <input
                    id="minSalary"
                    type="number"
                    name="minSalary"
                    min="1"
                    value={formData.minSalary}
                    onChange={handleChange}
                />
                <label htmlFor="hasEquity">Equity?</label>
                <input
                    id="hasEquity"
                    type="checkbox"
                    name="hasEquity"
                    value={formData.hasEquity}
                    onChange={handleChange}
                />
                <button>Find Jobs</button>
                <button onClick={() => resetJobsList()}>Clear Filter</button>
            </form>
        </div>
    )

}

export default FilterJobsForm;