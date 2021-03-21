import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteCalendarArgs } from "./DeleteCalendarArgs";
import { FindManyCalendarArgs } from "./FindManyCalendarArgs";
import { FindOneCalendarArgs } from "./FindOneCalendarArgs";
import { Calendar } from "./Calendar";
import { CalendarService } from "../calendar.service";

@graphql.Resolver(() => Calendar)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CalendarResolverBase {
  constructor(
    protected readonly service: CalendarService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Calendar])
  @nestAccessControl.UseRoles({
    resource: "Calendar",
    action: "read",
    possession: "any",
  })
  async calendars(
    @graphql.Args() args: FindManyCalendarArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Calendar[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Calendar",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Calendar, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Calendar",
    action: "read",
    possession: "own",
  })
  async calendar(
    @graphql.Args() args: FindOneCalendarArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Calendar | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Calendar",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Calendar)
  @nestAccessControl.UseRoles({
    resource: "Calendar",
    action: "delete",
    possession: "any",
  })
  async deleteCalendar(
    @graphql.Args() args: DeleteCalendarArgs
  ): Promise<Calendar | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
