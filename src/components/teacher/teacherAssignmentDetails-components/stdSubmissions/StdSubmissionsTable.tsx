import { FaFilter } from "react-icons/fa6";
import classes from './StdSubmissions.module.css'
import studentData from './data';
import useStdSubmissions from "./useStdSubmissions.hook";


const StdSubmissionsTable = () => {
  const { handleView, handleGrade, handleSearch, filterStatus, filteredArray, params } = useStdSubmissions();

  return (
    <div className={classes.StdSubContainer}>
      <hr />
      <div className={classes.header}>
        <h3 className={classes.title}>Students Submissions</h3>
        <div className={classes.actions}>
          <input type="search" placeholder='Search students...' onChange={handleSearch} className={classes.search} value={params.get('search') || ''} />
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
            (filterStatus > 0 ? filteredArray : studentData).map((student) => (
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
