import { Module } from "@nestjs/common";
import { CalendarModuleBase } from "./base/calendar.module.base";
import { CalendarService } from "./calendar.service";
import { CalendarController } from "./calendar.controller";
import { CalendarResolver } from "./calendar.resolver";

@Module({
  imports: [CalendarModuleBase],
  controllers: [CalendarController],
  providers: [CalendarService, CalendarResolver],
  exports: [CalendarService],
})
export class CalendarModule {}
