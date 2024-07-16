import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, FormControl, InputLabel, useTheme, Stack, ToggleButtonGroup, ToggleButton, styled, toggleButtonGroupClasses, Paper } from '@mui/material';
import GTranslateIcon from '@mui/icons-material/GTranslate';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
    },
    [`& .${toggleButtonGroupClasses.selected}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.light
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
      {
        //marginLeft: -1,
        borderLeft: '1px solid transparent',
      },
  }));

const LanguageSelector = () => {
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const {t, i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: "none",
          flexWrap: 'wrap',
        }}
      >
      <Stack direction="row" spacing={4}>
      <StyledToggleButtonGroup
          size="small"
          value={i18n.language}
          exclusive
          onChange={handleChange} 
          sx={{height:"30px"}}
          aria-label="change language">
            <ToggleButton value="en" aria-label="left aligned">
                {t("English")}
            </ToggleButton>
            <ToggleButton value="ar" aria-label="centered">
                {t("Arabic")}
            </ToggleButton>
        </StyledToggleButtonGroup>
        </Stack>
    </Paper>
    </div>
  );
};

export default LanguageSelector;
