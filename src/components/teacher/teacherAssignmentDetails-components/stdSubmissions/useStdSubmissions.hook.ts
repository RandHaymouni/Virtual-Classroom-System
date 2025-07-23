import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import type { IStudentSubmission } from "../types";
import React from 'react'
import studentData from "./data";

const useStdSubmissions = () => {
    function handleView(id: any): void {
        console.log(`View submission for student with ID: ${id}`);

    }
    function handleGrade(id: any): void {
        console.log(`Grade submission for student with ID: ${id}`);

    }
    const [params, setParams] = useSearchParams();
    const [filterStatus, setFilterStatus] = useState<number>(0);
    const [filteredArray, setFilteredArray] = useState<IStudentSubmission[]>([]);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(params);
        newParams.set('search', event.target.value);
        if (event.target.value.length) {
            newParams.set('search', event.target.value.trim());
        }
        else {
            newParams.delete('search');
        }
        setParams(newParams);
    }

    useEffect(() => {
        const student = params.get('search') || '';
        if (!student) {
            setFilterStatus(0);
            return;
        }
        const filteredStds = studentData.filter((std) => {
            return std.studentName.toLowerCase().includes(student.toLowerCase());
        });
        if (filteredStds.length > 0) {
            setFilterStatus(1);
            setFilteredArray(filteredStds);
        } else {
            setFilterStatus(-1);
            setFilteredArray([]);

        }
    }, [params]);

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(params);
        if (event.target.value === 'all') {
            newParams.delete('filter');
        } else {
            newParams.set('filter', event.target.value);
        }
        setParams(newParams);
    }
    useEffect(() => {
        const filter = params.get('filter');
        if (!filter || filter === 'all') {
            setFilterStatus(0);
            return;
        }
        const filteredStds = studentData.filter((std) => std.status.toLowerCase() === filter.toLowerCase());
        if (filteredStds.length > 0) {
            setFilterStatus(1);
            setFilteredArray(filteredStds);
        } else {
            setFilterStatus(-1);
            setFilteredArray([]);
        }
    }, [params]);

    return { handleView, handleGrade, handleSearch, handleFilter, filterStatus, filteredArray, params };
}

export default useStdSubmissions;
