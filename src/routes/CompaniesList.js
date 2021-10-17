//Companies list component renders all companies that are in the app backend database. 
//A user can filter using the inputs in the child component "FilterCompanies".
//A user can click on a company to go to its company detail.

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import FilterCompaniesForm from "./FilterCompanies";
import "../styling/CompaniesList.css";

const CompaniesList = () => {

    const [companies, setCompanies] = useState([]);

    //upon intial render, get all companies
    useEffect(function () {
        async function getCompanies() {
            try {
                let data = await JoblyApi.getCompanies();
                setCompanies(data);
            }
            catch (e) {
                console.log(e);
            }
        }
        getCompanies();
    }, []);

    //this will render companies with the filter
    const findCompanies = async (formData) => {
        try {
            let data = await JoblyApi.getFilteredCompanies(formData);
            setCompanies(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    //this will clear the filter and provide all companies
    const resetCompaniesList = async () => {
        try {
            let data = await JoblyApi.getCompanies();
            setCompanies(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="Companies">
            <h1>Companies</h1>
            <FilterCompaniesForm findCompanies={findCompanies} resetCompaniesList={resetCompaniesList} />

            {companies.map(c =>
            (
                <Link to={`companies/${c.handle}`} key={c.handle}>
                    <CompanyCard key={c.handle} handle={c.handle} name={c.name} description={c.description} logoSrc={c.logoUrl} numEmployees={c.numEmployees} />
                </Link>
            ))
            }
        </div>
    )
}

export default CompaniesList;