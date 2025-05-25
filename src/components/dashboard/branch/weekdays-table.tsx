import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "../../scrollbar";
import RowWeekday from "./row-weekday";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { _ } from "numeral";
import { useAppSelector } from "@/store";
import { WeekdaySchedule } from "@/api/models/schedule";
import { CreateWeekdayScheduleDto } from "@/api/schedule-api";
import { Weekdays } from "@/api/models/enums/Weekdays";
// interface IWeekday extends WeekdaySchedule {
//   weekday: string;
//   openTime: string | null;
//   endTime: string | null;
// }
const defaultWeekday: CreateWeekdayScheduleDto = {
  closed: false,
  endTime: "",
  openTime: "",
} as WeekdaySchedule;
const defaultWeekdays: CreateWeekdayScheduleDto[] = [
  {
    ...defaultWeekday,
    weekday: Weekdays.monday,
  },
  {
    ...defaultWeekday,
    weekday: Weekdays.tuesday,
    // closed: false
  },
  {
    ...defaultWeekday,
    weekday: Weekdays.wednesday,
    // closed: false
  },
  {
    ...defaultWeekday,

    weekday: Weekdays.thursday,
    // closed: false
  },
  {
    ...defaultWeekday,
    weekday: Weekdays.friday,
    // closed: false
  },
  {
    ...defaultWeekday,

    weekday: Weekdays.saturday,
    // closed: false
  },
  {
    ...defaultWeekday,

    weekday: Weekdays.sunday,
    // closed: true
  },
];
interface QueryParams {
  branchId?: number;
}
type WeekdayTableProps = {
  formik: any;
  arrayHelpers: any;
};
const WeekdayTable: React.FC<WeekdayTableProps> = (props) => {
  const { formik, arrayHelpers } = props;
  const [weekdays, setWeekdays] =
    useState<CreateWeekdayScheduleDto[]>(defaultWeekdays);
  const router = useRouter();
  const query = router.query as QueryParams;
  const { branches } = useAppSelector((state) => state.branches);
  useEffect(() => {
    try {
      if (!branches || !query.branchId) return;
      const currBranch = branches?.byId[query.branchId];
      const branchSchedules = currBranch?.schedule?.weekdaySchedules;
      if (!branchSchedules || branchSchedules.length === 0) {
        weekdays.forEach((el) => {
          arrayHelpers.push({
            weekday: el.weekday,
          });
        });
        return;
      }
      setWeekdays(branchSchedules.sort((a, b) => a.id + b.id));
      if (formik.values.weekdaySchedules.length > 0) {
        formik.values.weekdaySchedules.foreach((_: any) => arrayHelpers.pop());
      }
      branchSchedules.forEach((item, index) => {
        arrayHelpers.push({
          ...item,
          endTime: item.endTime ? new Date(item?.endTime) : null,
          openTime: item.openTime ? new Date(item?.openTime) : null,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, [branches]);

  return (
    <Scrollbar>
      <Table
        sx={{
          mx: "auto",
          minWidth: 590,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width="15%">Day</TableCell>
            <TableCell width="35%">Open time</TableCell>
            <TableCell width="35%">End time</TableCell>
            <TableCell width="15%">Status</TableCell>
            {/* <TableCell width="10%">
                            Actions
                        </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {weekdays.map((item, index) => (
            <RowWeekday
              formik={formik}
              key={item.weekday}
              item={item}
              index={index}
              arrayHelpers={arrayHelpers}
            />
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );
};

export default WeekdayTable;
