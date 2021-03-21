import { ArgsType, Field } from "@nestjs/graphql";
import { CalendarWhereUniqueInput } from "./CalendarWhereUniqueInput";

@ArgsType()
class DeleteCalendarArgs {
  @Field(() => CalendarWhereUniqueInput, { nullable: false })
  where!: CalendarWhereUniqueInput;
}

export { DeleteCalendarArgs };
