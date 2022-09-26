import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    isLoading,
    createJob
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    // while testing
  
    // if (!position || !company || !jobLocation) {
    //   displayAlert()
    //   return
    // }
    if (isEditing) {
      // eventually editJob()
      return
    }
    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          <FormRowSelect
          name='status'
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
          />

          {/* job status */}
          <FormRowSelect
          name='jobType'
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
          />

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
            className='btn btn-block clear-btn'
            onChange={(e)=> {
              e.preventDefault()
              clearValues()
            }
            }>Clear </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob