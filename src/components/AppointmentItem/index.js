// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-header-container">
        <p className="appointment-title">{title}</p>
        <button
          className="appointment-star-button"
          onClick={onClickStarButton}
          type="button"
        >
          <img
            src={starImageUrl}
            className="appointment-star-image"
            alt="star"
          />
        </button>
      </div>
      <p className="appointment-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
