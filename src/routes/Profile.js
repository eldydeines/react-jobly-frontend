import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import UserContext from "../UserContext";
import ProfileUpdate from "./ProfileUpdate";
import useToggle from "../helpers/useToggle";
import JobCard from "./JobCard";

const Profile = () => {

    const [profile, setProfile] = useState({});
    const [isUpdate, setIsUpdate] = useToggle(false);
    const [profileJobs, setProfileJobs] = useState([]);
    const { username, jobs } = useContext(UserContext);

    useEffect(function () {
        async function getProfile() {
            try {
                let data = await JoblyApi.getUserProfile(username);
                setProfile(data);
                if (jobs.length > 0) {
                    let jobList = await JoblyApi.getJobs();
                    let appliedJobs = jobList.map((job) => {
                        for (let x of jobs) {
                            if (x === job.id) {
                                return job;
                            }
                        }
                    }).filter(job => job != null);
                    setProfileJobs(appliedJobs);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getProfile();
    }, [username]);


    return (
        <div>
            {isUpdate
                ? <ProfileUpdate setProfile={setProfile} setIsUpdate={setIsUpdate} username={profile.username} email={profile.username} firstName={profile.firstName} lastName={profile.lastName} />
                : (<><h1>Your Profile</h1>
                    <h3>Username: {profile.username}</h3>
                    <h3>First Name: {profile.firstName}</h3>
                    <h3>Last Name: {profile.lastName}</h3>
                    <h3>Email: {profile.email}</h3>
                    <button onClick={setIsUpdate}>Update Profile</button>
                    <section>
                        <h2>Your Submitted Applications:</h2>
                        {profileJobs.map(j =>
                        (
                            <JobCard key={j.id} id={j.id} handle={j.companyHandle} title={j.title} salary={j.salary} equity={j.equity} name={j.companyName} />
                        ))
                        }
                    </section>
                </>)
            }

        </div>
    )
}

export default Profile;