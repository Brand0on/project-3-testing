import React from "react";
import { useState, useEffect } from "react";
import EventContent from "../components/EventContent";
import { useParams, Link } from "react-router-dom";
import { eventLoadSingle } from "../services/quotes";
import { useAuthContext } from "../context/authentication";

const EventDisplaySinglePage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    eventLoadSingle(id).then((data) => setEvent(data.event));
  }, [id]);

  return (
    <div className="flex flex-col space-x-12">
      {event && <EventContent event={event} />}
      <div className="">
        {user && (
          <Link className="btn-primary" to={`/events/${id}/edit`}>
            Edit and Delete
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventDisplaySinglePage;
