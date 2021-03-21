import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Calendar } from "../api/calendar/Calendar";

type Props = { id: string };

export const CalendarTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Calendar,
    AxiosError,
    [string, string]
  >(["get-/api/calendars", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/calendars"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/calendars"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
