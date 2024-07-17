import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFilePdf } from "react-icons/bs";
import { useTheme } from "@mui/material";
import TooltipCustom from "./TooltipCustom";
import { useTranslation } from "react-i18next";


export default function PDFPrint({document, fileName="report", title="Download PDF"}) {
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const {t} = useTranslation();
    return (
        <div>
            <PDFDownloadLink document={document} fileName={`${t(fileName)}.pdf`} style={{textDecoration:"none"}}>
            {({ blob, url, loading, error }) =>
                loading ? `${t('Loading document')}...` : <>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <BsFilePdf color={primaryMainColor}/> <p style={{color:"gray",fontSize:"14px",paddingInlineStart:"8px"}}>{t(title)}</p>
                </div>
            </>
            }
            </PDFDownloadLink>
        </div>
    )
}