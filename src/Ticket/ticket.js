import React from 'react';
import {useNavigate} from 'react-router-dom';
// import {ContentWrap, HeaderWrap} from './ticket.styles';
import './ticket.css';

export default function Ticket({ticket, date, user, code}) {
  const [switchTimeWithCode, setSwitchTimeWithCode] = React.useState(true);
  const [timeState, setTimeState] = React.useState(0);

  const timerRefreshTimeMilli = 200;  // time for timer in milliseconds

  const navigate = useNavigate();

  // ticket props
  const time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  const time_left = ticket.getTimes();
  const hours_left = time_left["hours"] !== 0 ? time_left["hours"] : undefined;
  const minutes_left = time_left["minutes"] !== 0 ? time_left["minutes"] : undefined;
  const seconds_left = time_left["seconds"];
  const expiry_date = ticket.expiry_date_string;
  const current_time = switchTimeWithCode ? time : code;
  const passenger = `${user.attributes.name} ${user.attributes.family_name}`;

  // timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onTimerTick();
    }, timerRefreshTimeMilli);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div className={"content-wrap-2"}>
      <Header
        title={ticket.title}
        onBackButtonClick={() => navigate('/tickets')}
      />
      <div className="body-2">
        <LogoAndTime
          current_time={current_time}
        />
        <TimeLeft
          hours_left={hours_left}
          minutes_left={minutes_left}
          seconds_left={seconds_left}
        />
        <div className="date">
          {expiry_date}
        </div>
        <TicketDetails
          title={ticket.title}
        />
        <PassengerDetails
          purchased_date={ticket.purchase_date}
          passenger={passenger}
        />
      </div>
    </div>
  );

  /*
  Handles everything to do on the timer tick. This includes checking if the ticket has expired
  and setting switch time with code
  */
  function onTimerTick() {
    if (ticket !== undefined) {
      if (ticket.isExpired(new Date())) {
        handleExpired();
        return;
      }
      const num_states = 1000 / timerRefreshTimeMilli;
      setTimeState((timeState + 1) % num_states);
      if (timeState === (num_states - 1)) {
        setSwitchTimeWithCode(!switchTimeWithCode);
      }
    }
  }

  function handleExpired() {
    navigate("/tickets");
  }

}

function Header({title, onBackButtonClick}) {
  return (
    <>
      <div className="header">
        <img src="assets/images/back-button.png" alt="back button" onClick={() => onBackButtonClick()}/>
        <div className="ticket-type">{title}</div>
      </div>
    </>
  )
}

function LogoAndTime({current_time}) {
  /* contains all the containers for the icon and the code */
  return (
    <div className="icon_code">
      <div className="overlap-container">
        <img className={"image1"} src="assets/images/mticketicon.jpg" alt="ticket Icon"/>
        <img className={"image2"} src="assets/images/mticketicon.jpg" alt="ticket Icon"/>
      </div>
      <div className="code_gif">
        <img src="assets/images/red_grey_start.gif" alt="red grey gif"/>
        <div className="code_text" id={"changeText"}><b>{current_time}</b></div>
      </div>
    </div>
  )
}

function TimeLeft({hours_left, minutes_left, seconds_left}) {
  return (
    <table className="a">
      <tbody>
      <tr>
        <th>
          <div className="grid-item-text">Hours</div>
        </th>
        <th>
          <div className="grid-item-text">Minutes</div>
        </th>
        <th>
          <div className="grid-item-text">Seconds</div>
        </th>
      </tr>
      <tr>
        <th>
          <div className="grid-item-patch">{hours_left}</div>
        </th>
        <th>
          <div className="grid-item-patch">{minutes_left}</div>
        </th>
        <th>
          <div className="grid-item-seconds">
            <img src="assets/images/spinner_second_countdown.png" className="rotate" alt="seconds animation"
                 height={"120%"}/>
            <div className="second-text">{seconds_left}</div>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  );
}

function TicketDetails({title}) {
  return (
    <div className="ticket">
      {title}
    </div>
  );
}

function PassengerDetails({purchased_date, passenger}) {
  return (
    <div className="infoGrid-1">
      <div className="grid-info-item-left">Provider</div>
      <div className="grid-info-item-right">Transport for Edinburgh</div>
      <div className="grid-info-item-left">Purchased</div>
      <div className="grid-info-item-right">{purchased_date}</div>
      <div className="grid-info-item-left">Passenger</div>
      <div className="grid-info-item-right">{passenger}</div>
    </div>
  );
}