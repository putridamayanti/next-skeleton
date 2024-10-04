import {
    Box, Button,
    IconButton,
    Menu, MenuItem, Stack, styled,
    Toolbar,
    Tooltip,
    Typography, useMediaQuery
} from "@mui/material";
import {DeleteRounded, FilterListRounded} from "@mui/icons-material";
import {useState} from "react";
import PropTypes from "prop-types";
import CustomTextField from "components/form/CustomTextField";
import {BasicSort} from "constants/constants";
import {HexToRGBA} from "utils/theme";

const FilterBox = styled(Box)(({ theme, optionActive }) => ({
    borderRadius: 10,
    ...(optionActive && {
        padding: '0.5rem 1rem',
        marginBottom: 0,
        background: HexToRGBA(theme.palette.error.light, 0.14),
    }),
}));

const EnhancedTableToolbar = (props) => {
    const {
        children,
        filter,
        handleChange,
        numSelected,
        onDelete,
        sortItems } = props;

    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [tempFilter, setTempFilter] = useState(filter ?? {sort: null});
    const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

    const handleSearch = (e) => {
        setTempFilter({ ...filter, keyword: e.target.value});
        handleChange({...filter, keyword: e.target.value});
    };

    const renderSort = () => {
        return (
            <CustomTextField
                select
                fullWidth
                defaultValue='Sort By'
                sx={{ maxWidth: 200 }}
                SelectProps={{
                    value: tempFilter.sort,
                    displayEmpty: true,
                    onChange: (e) => setTempFilter({...tempFilter, sort: e.target.value})
                }}>
                <MenuItem value={null}>Sort By</MenuItem>
                {Object.keys(sortItems || BasicSort).map(key => (
                    <MenuItem key={key} value={(sortItems || BasicSort)[key].value}>
                        {(sortItems || BasicSort)[key].name}
                    </MenuItem>
                ))}
            </CustomTextField>
        )
    }

    const renderFilter = () => {
        if (mdDown) {
            return (
                <>
                    <Tooltip title="Filter">
                        <IconButton onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
                            <FilterListRounded size="1.2rem" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={filterAnchorEl}
                        id="account-menu"
                        open={Boolean(filterAnchorEl)}
                        onClose={() => setFilterAnchorEl(null)}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    minWidth: 300,
                                    borderRadius: 1,
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                    mt: 1.5,
                                },
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Stack spacing={2} padding={5}>
                            <Box>
                                {renderSort()}
                            </Box>

                            {children}

                            <Button
                                fullWidth
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    handleChange(tempFilter);
                                    setFilterAnchorEl(null);
                                }}>
                                Search
                            </Button>
                        </Stack>
                    </Menu>
                </>
            )
        } else {
            return renderSort();
        }
    };

    return (
        <FilterBox optionActive={numSelected > 0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                {numSelected > 0 ? (
                    <Typography sx={{ flex: '1 1 100%', color: 'error.main' }} variant="subtitle2" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Box sx={{ flex: '1 1 100%' }}>
                        <CustomTextField
                            value={tempFilter.keyword}
                            sx={{ mr: 4 }}
                            placeholder='Type your keyword ...'
                            onChange={(e) => handleSearch(e)}
                        />
                    </Box>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        {!mdDown ? (
                            <Button size="small" color="error" variant="contained">
                                Delete Items
                            </Button>
                        ) : (
                            <IconButton color="error" onClick={onDelete}>
                                <DeleteRounded width="18" />
                            </IconButton>
                        )}
                    </Tooltip>
                ) : renderFilter()}
            </Stack>

            {(numSelected === undefined || numSelected === 0) && (
                <Box paddingTop={3}>
                    {children}
                </Box>
            )}
        </FilterBox>
    )
};

EnhancedTableToolbar.propTypes = {
    onDelete: PropTypes.func
};

export default EnhancedTableToolbar;