import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CalendarService } from "./calendar.service";
import { CalendarControllerBase } from "./base/calendar.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("calendars")
@common.Controller("calendars")
export class CalendarController extends CalendarControllerBase {
  constructor(
    protected readonly service: CalendarService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
