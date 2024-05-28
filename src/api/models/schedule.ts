import { Weekdays } from "./enums/Weekdays";

export interface Schedule {
  id: number;
  branchId: number;
  weekdaySchedules: WeekdaySchedule[];
}

export interface WeekdaySchedule {
  id: number;
  index: number;
  openTime: string;
  endTime: string;
  closed: boolean;
  scheduleId: number;
  weekday: Weekdays;
}
