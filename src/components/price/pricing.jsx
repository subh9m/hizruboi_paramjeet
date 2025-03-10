import './pricing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Pricing(){
    return(
        <div className="ver3">
      <div className="heading3">
        <h1>Choose the plan that's right for you.</h1>
      </div>

      <div className="cards3">

        {/* Basic Plan */}
        <div className="c1">
          <h1>$7/month</h1>
          <h2>Basic</h2>
          <ul>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Track up to 50 reminders</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Expiry alerts for groceries, medicines & more</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Custom notifications via email</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Simple dashboard for managing tasks</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Limited cloud backup</li>
          </ul>
          <button>Select Plan</button>
        </div>

        {/* Standard Plan */}
        <div className="c2">
          <h1>$12/month</h1>
          <h2>Standard</h2>
          <ul>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Track up to 250 reminders</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Smart notifications via email & push alerts</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Recurring reminders for bills & subscriptions</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Priority support for quick assistance</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Full cloud backup & sync across devices</li>
          </ul>
          <button>Select Plan</button>
        </div>

        {/* Premium Plan */}
        <div className="c3">
          <h1>$19/month</h1>
          <h2>Premium</h2>
          <ul>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Unlimited reminders tracking</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> AI-powered suggestions for setting reminders</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Integration with Google Calendar & Outlook</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Advanced analytics & insights on your habits</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> Exclusive early access to new features</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="check-icon" /> 24/7 priority customer support</li>
          </ul>
          <button>Select Plan</button>
        </div>

      </div>
    </div>

    );
}

export default Pricing;