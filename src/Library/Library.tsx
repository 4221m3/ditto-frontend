import { useEffect, useState } from 'react';
import { NodeJob, type JobData } from '../Nodes/NodeJob/NodeJob';
import { auth_store } from '../store/auth';

export const Library = () => {

    const [jobs, set_jobs] = useState<JobData[]>([]);
    const [new_job, set_new_job] = useState({
        name: '',
        desc: '',
        urls: [],
        sequences: {}
    });

    const token = auth_store((state) => state.token);

    useEffect(() => {

        const fetch_jobs = async () => {
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8000/jobs/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs.');
                }

                const data = await response.json();
                set_jobs(data);

            } catch (error) {
                console.error('Error fetching jobs:', error);
            }

        };

        fetch_jobs();

    }, [token]);

    const handle_new_job_change = (e) => {
        const { name, value } = e.target;
        set_new_job(prev_job => (
            { ...prev_job, [name]: value }
        ));
    };

    const handle_create_job = async (e) => {

        e.preventDefault();
        if (!token) return;

        try {

            const data = {
                name: "",
                desc: "",
                urls: [],
                sequences: {},
            }

            const response = await fetch('http://localhost:8000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create new job.');
            }

            const created_job = await response.json();

            set_jobs(prev_jobs => [...prev_jobs, created_job]);

            set_new_job({
                name: '',
                desc: '',
                urls: [],
                sequences: {}
            });

        } catch (error) {
            console.error('Error creating job:', error);
        }

    };

    const handle_delete_job = async (job_id: string) => {
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8000/jobs/${job_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete job.');
            }

            set_jobs(prev_jobs => prev_jobs.filter(job => job.id !== job_id));

        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <div className="container-fluid overflow-auto p-3">
            <div className="row g-1 g-md-2 g-lg-4">

                {jobs.map((job) => (
                    <div id={job.id} key={job.id} className="col-12 col-md-6 col-lg-3">
                        <NodeJob data={job} on_delete={handle_delete_job}/>
                    </div>
                ))}

                <div
                    className="col-12 col-md-6 col-lg-3"
                    onClick={handle_create_job}
                >
                    <div className="node-job-add">
                        <p>Hello</p>
                    </div>
                </div>

            </div>
        </div>
    );
};