import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Result } from '@/models/Word';
import parse from 'html-react-parser';


export default function WordCard({ result, index }: { result: Result; index: number }) {

    const definitionSplited = result.definition.split(' ');
    const finalDefinition = definitionSplited.map(d=>`<a style="text-decoration: underline" href="${d}">${d}</a>` ).join(' ')
    return (
        <Card>
            <CardContent>
                <Typography  gutterBottom variant="h5" component="div">
                    {index}: {parse(finalDefinition)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Synonyms:
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {result.synonyms ? result.synonyms.map((synonym, index) => (
                        <ListItem key={`synonyms${index}`} >
                            <Typography variant="body2" color="text.secondary">
                                <Link href={`/${synonym}`} variant="body2">
                                    {synonym}
                                </Link>
                            </Typography>
                        </ListItem>
                    )): ('')}

                </List>
            </CardContent>
        </Card>
    );
}