import { useEffect, useState } from "react";
import { fetchTicketsList, fetchUserId } from "../../slice/ticketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Ticket from "../Ticket/Ticket.jsx";
import styles from "./TicketList.module.css";
import { FourSquare } from "react-loading-indicators";

export default function TicketList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.tickets.userId);
  const tickets = useSelector((state) => state.tickets.tickets);
  const error = useSelector((state) => state.tickets.error);
  const status = useSelector((state) => state.tickets.status);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(5);
  const { selectAllOptions, selectedTransfers } = useSelector(
    (state) => state.filter.transferSettings,
  );
  const qualityFilter = useSelector((state) => state.filter.qualityFilter);

  function ticketsFilter() {
    if (tickets && selectAllOptions) return [...tickets];
    return tickets.filter((ticket) =>
      ticket.segments.some(
        (segment) => selectedTransfers[segment.stops.length],
      ),
    );
  }

  function calculateTotalDuration(ticket) {
    return ticket.segments[0].duration + ticket.segments[1].duration;
  }

  function ticketsSort(inputTickets) {
    if (qualityFilter === "cheapest") {
      return [...inputTickets].sort((prev, next) => prev.price - next.price);
    }
    if (qualityFilter === "fastest") {
      return [...inputTickets].sort((prev, next) => {
        return calculateTotalDuration(prev) - calculateTotalDuration(next);
      });
    }
    return [...inputTickets];
  }

  useEffect(() => {
    if (!userId) {
      dispatch(fetchUserId());
    } else {
      dispatch(fetchTicketsList());
    }
  }, [userId, tickets, error]);

  useEffect(() => {
    setList(ticketsSort(ticketsFilter()));
  }, [tickets, selectedTransfers, selectAllOptions, qualityFilter]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {status === "loading" && (
          <FourSquare
            color="#2196F3"
            size="medium"
            text=""
            textColor=""
            speedPlus={2}
            style={{ textAlign: "center" }}
          />
        )}
      </div>
      {list.length === 0 && (
        <div style={{ textAlign: "center" }}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      )}
      {list.length > 0 && (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {list.slice(0, show).map((ticket) => (
              <li key={ticket.id}>
                <Ticket ticket={ticket} />
              </li>
            ))}
          </ul>
          <button
            className={styles["show-button"]}
            onClick={() => setShow((val) => val + 5)}
          >
            Показать еще 5 билетов!
          </button>
        </>
      )}
    </>
  );
}
