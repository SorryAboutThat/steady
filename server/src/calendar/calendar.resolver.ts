import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CalendarResolverBase } from "./base/calendar.resolver.base";
import { Calendar } from "./base/Calendar";
import { CalendarService } from "./calendar.service";

@graphql.Resolver(() => Calendar)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CalendarResolver extends CalendarResolverBase {
  constructor(
    protected readonly service: CalendarService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
