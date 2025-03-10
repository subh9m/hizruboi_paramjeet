import './flashcard.css'; // Ensure correct CSS import path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClock, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

function Flashcard() {
  return (
    <div className="flash-container">

      <div className="flashcard">
        <p className="flashcard-title">
          <FontAwesomeIcon icon={faBell} className="flash-icon" /> Stay Notified
        </p>
        <p className="flashsmall-desc">
          Never let groceries, medicines, or subscriptions go to waste. Get timely reminders before they expire, helping you save money, reduce waste, and stay organized effortlessly.
        </p>
        <div className="flashgo-corner">
          <div className="flashgo-arrow">→</div>
        </div>
      </div>

      <div className="flashcard">
        <p className="flashcard-title">
          <FontAwesomeIcon icon={faClock} className="flash-icon" /> Smart Reminders
        </p>
        <p className="flashsmall-desc">
          Manage all your tasks in one place. Create, categorize, and set recurring reminders to stay on top of deadlines, bills, and important events without any hassle.
        </p>
        <div className="flashgo-corner">
          <div className="flashgo-arrow">→</div>
        </div>
      </div>

      <div className="flashcard">
        <p className="flashcard-title">
          <FontAwesomeIcon icon={faCalendarCheck} className="flash-icon" /> Smarter Planning
        </p>
        <p className="flashsmall-desc">
          Boost productivity with AI-powered insights and seamless calendar integration. Sync with Google Calendar and track habits to manage your time efficiently.
        </p>
        <div className="flashgo-corner">
          <div className="flashgo-arrow">→</div>
        </div>
      </div>

    </div>
  );
}

export default Flashcard;
