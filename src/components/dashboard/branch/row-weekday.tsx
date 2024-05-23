import {
    Box,
    Switch,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../store';

const RowWeekday = (props) => {
    const { item, index, formik, arrayHelpers } = props;
    const [minTime, setMinTime] = useState(null);
    const [maxTime, setMaxTime] = useState(null);
    const currentField = `weekdaySchedules[${index}]`;
    const { branches } = useSelector((state) => state.branch);

    const setValidationError = (checked) => {
        if (checked) {
            arrayHelpers.replace(index, {
                ...formik.values.weekdaySchedules[index],
                openTime: null,
                endTime: null
            })
        }
    }
    const onChange = (val, field) => {
        if (val?.target) {
            arrayHelpers.replace(index, {
                ...formik.values.weekdaySchedules[index],
                [field]: val.target.checked,
                openTime: val.target.checked ? null
                    : formik.values.weekdaySchedules[index]?.openTime,
                endTime: val.target.checked ? null
                    : formik.values.weekdaySchedules[index]?.endTime,

            })
            return;
        }
        arrayHelpers.replace(index, {
            ...formik.values.weekdaySchedules[index],
            [field]: val,
            closed: false,
        })
    }
    const handleMinTime = (val) => {
        setMinTime(val);
    }
    const handleMaxTime = (val) => {
        setMaxTime(val);
    }

    // useEffect(() => {
        // //    if(item.weekday.toLowerCase()===)
        // if (!item) return;
        // console.log(item)
        // arrayHelpers.push({
        //     ...item,
        //     endTime: item.endTime ? new Date(item?.endTime) : undefined,
        //     openTime: item.openTime ? new Date(item?.openTime) : undefined
        // })
    // }, [item])


    return (

        <TableRow key={`${item.weekday}`}>
            <TableCell
                sx={{ textTransform: "capitalize" }}
                width="15%">
                {item.weekday}
            </TableCell>
            <TableCell width="35%">
                <DesktopTimePicker
                    ampm
                    fullWidth
                    maxTime={maxTime}
                    onChange={(val) => { onChange(val, "openTime"); handleMinTime(val) }}
                    label="Open Time"
                    value={
                        formik.values.weekdaySchedules[index]?.openTime}
                    name={`${currentField}.openTime`}
                />
                {/* {hasErrors ?
                    formik.errors.weekdaySchedules[index]?.openTime && (
                        <Typography>
                            {formik.errors.weekdaySchedules[index]?.openTime}
                        </Typography>
                    ) : <></>
                } */}
            </TableCell>
            <TableCell width="35%">
                <DesktopTimePicker
                    ampm
                    onChange={(val) => { onChange(val, "endTime"); handleMaxTime(val); }}
                    // value={}
                    minTime={minTime}
                    value={
                        formik.values.weekdaySchedules[index]?.endTime
                    }

                    fullWidth
                    label="End Time"
                    name={`${currentField}.endTime`}
                />
                {/* {hasErrors ?
                    formik.errors.weekdaySchedules[index]?.endTime && (
                        <Typography>
                            {formik.errors.weekdaySchedules[index]?.endTime}
                        </Typography>
                    ) : <></>
                } */}
            </TableCell>
            <TableCell width="15%">
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                >
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        Closed
                    </Typography>
                    <Switch
                        onChange={(val) => { onChange(val, "closed") }}
                        checked={formik.values.weekdaySchedules[index]?.closed || false}
                        edge="start"
                        inputProps={{ 'aria-label': 'controlled' }}
                        name={`${currentField}.closed`}
                    />
                </Box>

            </TableCell>
            {/* <TableCell width="10%">
                <Box
                    display
                    justifyContent={"space-around"}
                    alignItems={"center"}
                >


                    <Button
                        startIcon={<SaveIcon />}
                        onClick={() => { }}
                        sx={{ m: 1 }}
                        type="button"
                        variant="contained"
                    >
                        Update
                    </Button>
                </Box>
            </TableCell> */}
        </TableRow>
    )
}

export default RowWeekday