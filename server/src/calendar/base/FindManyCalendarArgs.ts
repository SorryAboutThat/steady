import { ArgsType, Field } from "@nestjs/graphql";
import { CalendarWhereInput } from "./CalendarWhereInput";

@ArgsType()
class FindManyCalendarArgs {
  @Field(() => CalendarWhereInput, { nullable: true })
  where?: CalendarWhereInput;
}

export { FindManyCalendarArgs };
