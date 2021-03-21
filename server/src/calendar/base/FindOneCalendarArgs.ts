import { ArgsType, Field } from "@nestjs/graphql";
import { CalendarWhereUniqueInput } from "./CalendarWhereUniqueInput";

@ArgsType()
class FindOneCalendarArgs {
  @Field(() => CalendarWhereUniqueInput, { nullable: false })
  where!: CalendarWhereUniqueInput;
}

export { FindOneCalendarArgs };
