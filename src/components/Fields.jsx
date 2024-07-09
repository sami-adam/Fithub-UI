import TextField from '@mui/material/TextField';
import { Button, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@emotion/react';

export default function TextFieldCustom({label, placeholder, setValue, viewValue, id, required, disabled}) {
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel>
            <TextField
                required={required}
                disabled={disabled}
                id={id}
                //label="First Name"
                placeholder={placeholder}
                variant="standard" onChange={(e) => setValue(e.target.value)}
                style={{ }} 
                value={viewValue}
            />
        </div>
    )
}

export function SelectFieldCustom({label, setValue, viewValue, id, required, disabled, items, itemFields}) {
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel>
            <FormControl fullWidth size="small">
                <Select
                    variant="standard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={viewValue}
                    defaultValue={viewValue}
                    disabled={disabled}
                    onChange={(e) => setValue(e.target.value)}
                >
                    {items.map((item) => (
                        <MenuItem value={item.id}>{
                            itemFields.map((field) => item[field]).join(' ')
                        }</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export function DateFieldCustom({label, setValue, viewValue, id, required, disabled}) {
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel>
            <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        slotProps={{
                            popper: {
                              sx: {
                                ".MuiPaper-root": { border: "1px solid " + primaryMainColor, borderRadius: "10px" },
                              },
                            },
                            textField: {variant: "standard", style: {width: "100%"}}
                          }}
                        required={required}
                        disabled={disabled}
                        id={id}
                        value={viewValue}
                        defaultValue={viewValue}
                        onChange={(date) => setValue(date)}
                    />
                </LocalizationProvider>
            </FormControl>
        </div>
    )
}

export function NumberFieldCustom({label, placeholder, setValue, viewValue, id, required, disabled}) {
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"118px"}}>{label}</FormLabel>
            <TextField
                required={required}
                disabled={disabled}
                inputProps={{ type: 'number'}}
                id={id}
                //label="First Name"
                placeholder={placeholder}
                variant="standard" onChange={(e) => setValue(e.target.value)}
                style={{ }} 
                value={viewValue}
            />
        </div>
    )
}