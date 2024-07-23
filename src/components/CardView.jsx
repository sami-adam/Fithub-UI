import React from 'react';
import { Card, CardContent, CardMedia, Avatar, Grid, CardHeader, IconButton, Box } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function CardView({ title, subheader, avatarUrl, coverImageUrl, children }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const primaryLightColor = theme.palette.primary.light;
    const primaryMainColor = theme.palette.primary.main;
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          avatar={avatarUrl && <Avatar src={avatarUrl} alt={title} />}
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={title}
          subheader={subheader}
        />
        {coverImageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={coverImageUrl}
            alt="Cover Image"
          />
        )}
        <CardContent>
          <Box>
            {children}
          </Box>
        </CardContent>
      </Card>
    );
}