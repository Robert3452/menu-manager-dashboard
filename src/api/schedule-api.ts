import { menuManager } from "./httpClient";
import { Weekdays } from "./models/enums/Weekdays";

const httpClient = menuManager;
export interface CreateScheduleDto {
  weekdaySchedules: CreateWeekdayScheduleDto[];
  branchId: number;
}

export interface UpdateScheduleDto extends Partial<CreateScheduleDto> {}

export interface CreateWeekdayScheduleDto {
  weekday: Weekdays;
  openTime?: string;
  endTime?: string;
  closed: boolean;
  id?: number;
  scheduleId: number;
}
export interface UpdateWeekdayScheduleDto
  extends Partial<CreateWeekdayScheduleDto> {}

class SchedulesApi {
  async upsertSchedule(body: CreateScheduleDto) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.post("/schedules", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async updateSchedule(scheduleId: number, body: UpdateScheduleDto) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.put(`/schedules/${scheduleId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getSchedule(scheduleId: number) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get(`/schedules/${scheduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async deleteScheduleWeekday(scheduleId: number, weekday: Weekdays) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.delete(
      `/schedules/${scheduleId}/${weekday}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
}
export const scheduleApi = new SchedulesApi();
