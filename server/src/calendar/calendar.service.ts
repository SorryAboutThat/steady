import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CalendarServiceBase } from "./base/calendar.service.base";

@Injectable()
export class CalendarService extends CalendarServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
