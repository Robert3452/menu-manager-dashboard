import { HttpClient } from "./httpClient";

const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER}/api/schedules`
);
export interface CreateScheduleDto {
  weekdaySchedules: CreateWeekdayScheduleDto[];
  branchId: number;
}

export interface UpdateScheduleDto extends Partial<CreateScheduleDto> {}
export enum Weekdays {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface CreateWeekdayScheduleDto {
  weekday: Weekdays;
  openTime: string;
  endTime: string;
  closed: boolean;
  id?: number;
  scheduleId: number;
}
export interface UpdateWeekdayScheduleDto
  extends Partial<CreateWeekdayScheduleDto> {}

class SchedulesApi {
  async upsertSchedule(body: CreateScheduleDto) {
    const { data } = await httpClient.post("", body);
    return data;
  }

  async updateSchedule(scheduleId: number, body: UpdateScheduleDto) {
    const { data } = await httpClient.put(`/${scheduleId}`, body);
    return data;
  }

  async getSchedule(scheduleId: number) {
    const { data } = await httpClient.get(`/${scheduleId}`);
    return data;
  }

  async deleteScheduleWeekday(scheduleId: number, weekday: Weekdays) {
    const { data } = await httpClient.delete(`/${scheduleId}/${weekday}`);
    return data;
  }
}
export const scheduleApi = new SchedulesApi();
