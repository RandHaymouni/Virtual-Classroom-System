import { FaFilter } from "react-icons/fa6";
import classes from './StdSubmissions.module.css'
import studentData from './data';
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import type { IStudentSubmission } from "../types";

const StdSubmissionsTable = () => {

  function handleView(id: any): void {
    console.log(`View submission for student with ID: ${id}`);
    
  }

  function handleGrade(id: any): void {
    console.log(`Grade submission for student with ID: ${id}`);
    
  }
  const [params,setParams] =useSearchParams();
  const [filterStatus, setFilterStatus] = useState<number>(0);
  const [filteredArray, setFilteredArray] = useState<IStudentSubmission[] >([]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const newParams=new URLSearchParams(params);
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
      // setFilteredArray(studentData);
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
  return (
    <div className={classes.StdSubContainer}>
      <hr />
      <div className={classes.header}>
        <h3 className={classes.title}>Students Submissions</h3>
        <div className={classes.actions}>
          <input type="search" placeholder='Search students...' onChange={handleSearch} className={classes.search} value={params.get('search') || ''}/>
          <button className={classes.filter}><FaFilter />Filter</button>
        </div>
      </div>

      <table className={classes.table}>
        <thead >
          <tr>
            <th scope="col">
              Student
            </th>
            <th scope="col">
              Submission Date
            </th>
            <th scope="col">
              Status
            </th>
            <th scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {filterStatus < 0 ? <h1 className={classes.notFound}>Cannot Find "{params.get('search')}"</h1>
            :
          (filterStatus > 0? filteredArray : studentData).map((student) => (
            <tr key={student.id} className={classes.tableRow}>
              <td>
                {student.studentName}
              </td>
              <td >
                {student.submissionDate || '-'}
              </td>
              <td >
                <span
                  className={
                    student.status === 'Submitted'
                      ? classes.statusSubmitted
                      : student.status === 'Not Submitted'
                        ? classes.statusNotSub
                        : classes.statusGraded
                  }>
                  {student.status}
                </span>
              </td>
              <td>
                <div className={classes.viewGradeActions}>
                  {student.status !== 'Not Submitted' && <button className={classes.viewBtn}
                    onClick={() => handleView(student.id)}>
                    View
                  </button>}
                  {student.status === 'Submitted' && (
                    <button className={classes.gradeBtn}
                      onClick={() => handleGrade(student.id)} >
                      Grade
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default StdSubmissionsTable
