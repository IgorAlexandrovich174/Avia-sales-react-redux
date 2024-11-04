import styles from "./Ticket.module.css";
import { format } from "date-fns";
import { PropTypes } from "prop-types";

export default function Ticket({ ticket }) {
  function parseTimeToFlightTime(startTime, flightTime) {
    const start = new Date(startTime);
    start.setMinutes(start.getMinutes() + flightTime);
    return start;
  }
  function getTransferLabel(num) {
    switch (num) {
      case 0:
        return "0 пересадок";
      case 1:
        return "1 пересадка";
      case 2:
        return "2 пересадки";
      case 3:
        return "3 пересадки";
      default:
        return `${num} пересадок`;
    }
  }

  return (
    <div className={styles["ticket"]}>
      <div className={styles["header-ticket"]}>
        <span className={styles["price-ticket"]}>{ticket.price + " Р"}</span>
        <img
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt=""
          width="110"
          height="36"
        />
      </div>
      <div className={styles["body-ticket"]}>
        <div className={styles["info-ticket"]}>
          <div className={styles["info-ticket-details"]}>
            <div
              className={styles["info-ticket-from-where"]}
            >{`${ticket.segments[0].origin} – ${ticket.segments[0].destination}`}</div>
            <div
              className={styles["info-ticket-time"]}
            >{`${format(new Date(ticket.segments[0].date), "HH:mm")} – 
            ${format(parseTimeToFlightTime(ticket.segments[0].date, ticket.segments[0].duration), "HH:mm")}`}</div>
          </div>
          <div className={styles["info-ticket-details"]}>
            <div className={styles["info-ticket-from-where"]}>В пути</div>
            <div className={styles["info-ticket-time"]}>
              {format(new Date(ticket.segments[0].duration) * 60000, "HHч mmм")}
            </div>
          </div>
          <div className={styles["info-ticket-details"]}>
            <div className={styles["info-ticket-from-where"]}>
              {getTransferLabel(ticket.segments[0].stops.length)}
            </div>
            <div className={styles["info-ticket-time"]}>
              {ticket.segments[0].stops.join(", ")}
            </div>
          </div>
        </div>
        <div className={styles["info-ticket"]}>
          <div className={styles["info-ticket-details"]}>
            <div
              className={styles["info-ticket-from-where"]}
            >{`${ticket.segments[1].origin} – ${ticket.segments[1].destination}`}</div>
            <div
              className={styles["info-ticket-time"]}
            >{`${format(new Date(ticket.segments[1].date), "HH:mm")} – 
            ${format(parseTimeToFlightTime(ticket.segments[1].date, ticket.segments[1].duration), "HH:mm")}`}</div>
          </div>
          <div className={styles["info-ticket-details"]}>
            <div className={styles["info-ticket-from-where"]}>В пути</div>
            <div className={styles["info-ticket-time"]}>
              {format(new Date(ticket.segments[1].duration) * 60000, "HHч mmм")}
            </div>
          </div>
          <div className={styles["info-ticket-details"]}>
            <div className={styles["info-ticket-from-where"]}>
              {getTransferLabel(ticket.segments[1].stops.length)}
            </div>
            <div className={styles["info-ticket-time"]}>
              {ticket.segments[1].stops.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
};
