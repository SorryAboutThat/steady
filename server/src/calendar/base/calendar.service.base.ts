import { PrismaService } from "nestjs-prisma";
import {
  FindOneCalendarArgs,
  FindManyCalendarArgs,
  CalendarCreateArgs,
  CalendarUpdateArgs,
  CalendarDeleteArgs,
  Subset,
} from "@prisma/client";

export class CalendarServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyCalendarArgs>(
    args: Subset<T, FindManyCalendarArgs>
  ) {
    return this.prisma.calendar.findMany(args);
  }
  findOne<T extends FindOneCalendarArgs>(args: Subset<T, FindOneCalendarArgs>) {
    return this.prisma.calendar.findOne(args);
  }
  create<T extends CalendarCreateArgs>(args: Subset<T, CalendarCreateArgs>) {
    return this.prisma.calendar.create<T>(args);
  }
  update<T extends CalendarUpdateArgs>(args: Subset<T, CalendarUpdateArgs>) {
    return this.prisma.calendar.update<T>(args);
  }
  delete<T extends CalendarDeleteArgs>(args: Subset<T, CalendarDeleteArgs>) {
    return this.prisma.calendar.delete(args);
  }
}
