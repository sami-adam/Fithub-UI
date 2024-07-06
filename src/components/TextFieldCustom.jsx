import TextField from '@mui/material/TextField';
import { Button, FormControl, FormLabel } from '@mui/material';

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