// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    inputTitle: '',
    inputDate: '',
    isFilterActive: false,
  }

  onChangeInputTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeInputDate = event => {
    this.setState({inputDate: event.target.value})
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const formattedDate = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: inputTitle,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {inputTitle, inputDate, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filled-filter' : 'empty-filter'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="appointments-app-container">
        <div className="appointments-responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="appointment-label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={inputTitle}
                  onChange={this.onChangeInputTitle}
                  className="appointment-input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="appointment-label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={inputDate}
                  onChange={this.onChangeInputDate}
                  className="appointment-input"
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
            <hr className="hr-line" />
            <div className="appointments-header-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`starred-button ${filterClassName}`}
                onClick={this.onFilter}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
