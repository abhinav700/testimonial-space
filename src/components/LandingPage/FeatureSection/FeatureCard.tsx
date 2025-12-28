import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react'

interface FeatureCardProps{
  title: string;
  description: string;
  icon?: ReactNode
};

const FeatureCard = ({title, description, icon}: FeatureCardProps) => {
  return (
    <Card sx={{width:"280px", height:"200px"}}>
      <CardContent sx={{ textAlign:"left"}}>
        {icon}
        <Typography variant='h5' sx={{fontWeight:"900", marginTop: 2 }} gutterBottom>{title}</Typography>
        <Typography component='p'>{description}</Typography>
      </CardContent>
    </Card>
 
  )
}

export default FeatureCard