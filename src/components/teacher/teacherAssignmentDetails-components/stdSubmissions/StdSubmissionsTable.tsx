import SubmitGrade from '../../createAssignments-components/viewAssignments/submitGrade/SubmitGrade';
import classes from './StdSubmissions.module.css'
import studentData from './data';
import useStdSubmissions from "./useStdSubmissions.hook";
const StdSubmissionsTable = () => {
  const { handleView, handleGrade, handleSearch, handleFilter, filterStatus, filteredArray, params, showGradeModal, selectedStudent,
    grade,
    feedback,
    setGrade,
    setFeedback,
    handleCloseGradeModal,
    handleSubmitGrade } = useStdSubmissions();
  return (
    <span>
      <hr />
      <div className={classes.StdSubContainer}>
        <div className={classes.header}>
          <h3 className={classes.title}>Students Submissions</h3>
          <div className={classes.actions}>
            <input type="search" placeholder='  Search students...' onChange={handleSearch} className={classes.search} value={params.get('search') || ''} />
            <div className={classes.filterContainer}>
              <select
                id="filter"
                value={params.get('filter') || ' '}
                onChange={handleFilter}
                className={classes.filter}
              >
                <option value="all">All</option>
                <option value="Submitted">Submitted</option>
                <option value="Not Submitted">Not Submitted</option>
                <option value="Graded">Graded</option>
              </select>
            </div>
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
                          onClick={() => handleGrade(student)} >
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
      {showGradeModal && selectedStudent && (
        <SubmitGrade
          studentName={selectedStudent.studentName}
          assignmentTitle="Current Assignment"
          grade={grade}
          feedback={feedback}
          setGrade={setGrade}
          setFeedback={setFeedback}
          onClose={handleCloseGradeModal}
          onSubmit={handleSubmitGrade}
        />
      )}
    </span>

  )
}
export default StdSubmissionsTable