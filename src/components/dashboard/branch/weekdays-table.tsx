import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Scrollbar } from '../../scrollbar';
import RowWeekday from './row-weekday';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { _ } from 'numeral';
const defaultWeekdays = [
    {
        weekday: "monday",
        openTime: null,
        endTime: null,
    },
    {
        weekday: "Tuesday",
        openTime: null,
        endTime: null,
        // closed: false
    },
    {
        weekday: "wednesday",
        openTime: null,
        endTime: null,
        // closed: false
    },
    {
        weekday: "thursday",
        openTime: null,
        endTime: null,
        // closed: false
    },
    {
        weekday: "friday",
        openTime: null,
        endTime: null,
        // closed: false
    },
    {
        weekday: "saturday",
        openTime: null,
        endTime: null,
        // closed: false
    },
    {
        weekday: "sunday",
        openTime: null,
        endTime: null,
        // closed: true
    },


]

const WeekdayTable = (props) => {
    const { formik, arrayHelpers } = props;
    const [weekdays, setWeekdays] = useState(defaultWeekdays);
    const router = useRouter();
    const { branches } = useSelector((state) => state.branch);
    useEffect(() => {
        try {
            if (!branches) return;
            const currBranch = branches?.byId[router.query.branchId];
            const branchSchedules = currBranch?.schedule?.weekdaySchedules;
            if (!branchSchedules || branchSchedules.length === 0) {
                weekdays.forEach(el => {
                    arrayHelpers.push({
                        weekday: el.weekday,
                    })
                })
                return;
            }
            setWeekdays(branchSchedules.sort((a, b) => a.id + b.id));
            if (formik.values.weekdaySchedules.length > 0) {
                // console.log(formik.values.weekdaySchedules)
                formik.values.weekdaySchedules.foreach(_ => arrayHelpers.pop())
            }
            console.log(branchSchedules)
            branchSchedules.forEach((item, index) => {

                arrayHelpers.push({
                    ...item,
                    endTime: item.endTime ? new Date(item?.endTime) : null,
                    openTime: item.openTime ? new Date(item?.openTime) : null
                })
            })
        } catch (error) {
            console.log(error)
        }


    }, [branches])



    return (
        <Scrollbar>
            <Table sx={{
                mx: "auto",
                minWidth: 590,
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="15%">
                            Day
                        </TableCell>
                        <TableCell width="35%">
                            Open time
                        </TableCell>
                        <TableCell width="35%">
                            End time
                        </TableCell>
                        <TableCell width="15%">
                            Status
                        </TableCell>
                        {/* <TableCell width="10%">
                            Actions
                        </TableCell> */}
                    </TableRow>

                </TableHead>
                <TableBody>
                    {
                        weekdays.map((item, index) => (
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
    )
}

export default WeekdayTable