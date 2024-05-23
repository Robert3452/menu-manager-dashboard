import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Button,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Image as ImageIcon } from '../../../icons/image';

const StoreListItem = (props) => {
    const { store } = props;
    return (
        <Fragment key={store.id}>
            <TableRow
                hover
                key={store.id}
            >
                <TableCell />
                <TableCell
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        {store.logo
                            ? (
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor: 'background.default',
                                        backgroundImage: `url(${store.logo})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        borderRadius: 1,
                                        display: 'flex',
                                        height: 80,
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        width: 80
                                    }}
                                />
                            )
                            : (
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor: 'background.default',
                                        borderRadius: 1,
                                        display: 'flex',
                                        height: 80,
                                        justifyContent: 'center',
                                        width: 80
                                    }}
                                >
                                    <ImageIcon fontSize="small" />
                                </Box>
                            )}
                    </Box>
                    <Box
                        sx={{
                            padding: "10px",
                            display: "flex",
                            flex: 1,
                            justifyContent: "flex-start"
                        }}
                    >

                        <Typography
                            variant='h3'
                        >
                            {store.name}

                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align='right' >
                    <NextLink
                        href={`/dashboard/stores/${store.id}`}
                        passHref
                    >

                        <Button
                            // onClick={handleDeleteStore}
                            endIcon={<SettingsIcon />}
                            sx={{ m: 1 }}
                            color='info'
                            variant="text"
                        >
                            Settings
                        </Button>
                    </NextLink>

                </TableCell>
            </TableRow>
        </Fragment>
    )
}

StoreListItem.propTypes = {
    store: PropTypes.object,
    handleOpenStore: PropTypes.func,
    open: PropTypes.bool
}

export default StoreListItem