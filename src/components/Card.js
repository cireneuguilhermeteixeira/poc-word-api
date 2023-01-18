import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
export default function TodosCard({ todo }) {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {todo['title']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {todo['description']}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}