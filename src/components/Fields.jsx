import TextField from '@mui/material/TextField';
import { Autocomplete, FormControl, FormLabel, InputBase, MenuItem, Select } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@emotion/react';
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';


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
                style={{width: "300px"}} 
                value={viewValue}
            />
        </div>
    )
}

export function SelectFieldCustom({label, setValue, viewValue, id, required, disabled, items, itemFields, styles={}}) {
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel>
            <FormControl fullWidth size="small">
                <Select
                    variant="standard"
                    labelId={"select-label-" + id}
                    id={id}
                    value={viewValue}
                    defaultValue={viewValue}
                    disabled={disabled}
                    style={styles} 
                    onChange={(e) => setValue(e.target.value)}
                >
                    {items&&items.map((item) => (
                        <MenuItem value={item.id}>{
                            itemFields.map((field) => field.indexOf('.')>=0? item[field.split(".")[0]][field.split(".")[1]]:item[field]).join(' ')
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

export function NumberFieldCustom({label, placeholder, setValue, viewValue, id, required, disabled, styles={}, computedValue=0}) {
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
                variant="standard" onChange={(e) => setValue(computedValue ||e.target.value)}
                style={styles} 
                value={viewValue}
            />
        </div>
    )
}

export function HtmlFieldCustom({label, placeholder, setValue, viewValue, id, required, disabled}) {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];
      
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            {/* <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel> */}
            <ReactQuill 
                required={required}
                //disabled={disabled}
                id={id}
                //label="First Name"
                placeholder={placeholder}
                theme="snow"
                variant="standard" onChange={setValue}
                value={viewValue} 
                readOnly={disabled}
                modules={{toolbar: toolbarOptions}}
            
            />
        </div>
    )
}

export function AttachmentFieldCustom({label, placeholder, setValue, viewValue, id, required, disabled}) {
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel>
            <TextField
                required={required}
                disabled={disabled}
                id={id}
                //label="First Name"
                placeholder={placeholder} 
                type='file'
                variant="standard" onChange={(e) => setValue(e.target.files[0])}
                style={{width: "300px"}} 
                value={viewValue} sx={{display: disabled && 'none'}}
            />
        </div>
    )
}

export function SearchableSelect({label, placeholder, setValue, viewValue, id, required, disabled, items, itemFields, styles={}}) {
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px"}}>
            <FormLabel htmlFor='firstName' style={{width:"140px"}}>{label}</FormLabel>
            <Autocomplete 
                options={items}
                getOptionLabel={(option) => itemFields.map((field) => field.indexOf('.')>=0? option[field.split(".")[0]][field.split(".")[1]]:option[field]).join(' ')}
                style={{width: "100%", ...styles}}
                renderInput={(params) => <TextField {...params} label={label} variant="standard" />}
                onChange={(e, value) => setValue(value)}
                value={viewValue}
                defaultValue={viewValue} 
                disabled={disabled}
                required={required}
                id={id}
            />
        </div>
    )
}

export function DisplayField({label, value, postValue}){
    const {t} = useTranslation();
    return (
        <div style={{width: "600px",display:"inline-flex", alignItems:"center", paddingTop:"20px", color: "rgba(0, 0, 0, 0.6)"}}>
            <div style={{width:"118px"}}>{t(label)}</div>
            <div>{value} {postValue}</div>
        </div>
    )
}
    