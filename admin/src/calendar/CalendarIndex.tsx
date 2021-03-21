import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CalendarList } from "./CalendarList";
import { CreateCalendar } from "./CreateCalendar";
import { Calendar } from "./Calendar";

export const CalendarIndex = (): React.ReactElement => {
  useBreadcrumbs("/calendars/", "Calendars");

  return (
    <Switch>
      <PrivateRoute exact path={"/calendars/"} component={CalendarList} />
      <PrivateRoute path={"/calendars/new"} component={CreateCalendar} />
      <PrivateRoute path={"/calendars/:id"} component={Calendar} />
    </Switch>
  );
};
