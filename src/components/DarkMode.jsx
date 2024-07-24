import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";

export default function DarkMode() {
    const theme = useTheme();
    
    const [mode, setMode] = useState(theme.palette.mode);
    const [modeText, setModeText] = useState('Light Mode');

    useEffect(() => {
        if(mode === 'dark'){
            setModeText('Light Mode');
        }else{
            setModeText('Dark Mode');
        }
    }, [mode, setModeText]);

    const handleModeChange = () => {
        if(mode === 'dark'){
            setMode('light');
        }else{
            setMode('dark');
        }
    }

    return (
        <div>
            <button onClick={handleModeChange}>{modeText}</button>
        </div>
    )
}