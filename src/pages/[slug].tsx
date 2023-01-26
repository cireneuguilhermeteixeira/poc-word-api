import Head from 'next/head'
import CardWord from '../components/Card';
import { Box, Container, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Word } from '@/models/Word';
import { Image } from '@/models/Image';
import wordService from '../services/word.service'
import { toast } from 'react-toastify'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useRouter } from 'next/router';
import imageSearch from '../services/image-search-google.service';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Home({ wordByProps, images }: { wordByProps: Word, images: Array<Image> }) {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState<Word>();
  const router = useRouter();

  const getWordDefinition = async () => {
    try {
      setLoading(true)

      const response = await wordService.get(search)
      setWord(response)


    } catch (e) {
      console.log(e)
      toast.error('Erro ao buscar palavra.')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (search) {
      getWordDefinition()
      router.push(`/${search}`, undefined, { shallow: true })
    }
  }, [search])

  useEffect(() => {
    if (wordByProps) {
      setWord(wordByProps)
      console.log('images', images);


    }
  }, [])


  return (
    <div>
      <Head>
        <title>Words API Integration </title>
        <meta name="description" content="Todos app with Material UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setSearch={setSearch} />

      <Container sx={{
        minHeight: '60rem',
      }}>
        {
          word && word.results && word.results.length > 0 ? (
            <>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" sx={{
                    padding: 5,
                    fontFamily: 'Helvetica'
                  }}>

                    {word.word}
                  </Typography>
                </Grid>

                {word.syllables ? (
                  <Grid container>
                    <Grid item>
                      <Typography variant="h6" sx={{
                        padding: 5,
                        fontFamily: 'Helvetica'
                      }}>
                        syllables count: {word.syllables.count}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" sx={{
                        padding: 5,
                        fontFamily: 'Helvetica'
                      }}>
                        syllables list: {word.syllables.list.join(', ')}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : ('')}

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Images:                  </Typography>
                      <ImageList cols={3} rowHeight={164}>
                        {images.map((image) => (
                          <ImageListItem key={image.context}>
                            <img
                              src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={image.thumbnail}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </CardContent>
                  </Card>

                </Grid>
              </Grid>




              {word.results.map((result, index) => (
                <Grid key={index} marginBottom={4} marginTop={4}>
                  <CardWord result={result} key={index} index={index + 1} />
                </Grid>
              ))}
            </>

          ) : (
            <Typography sx={{
              padding: 10,
              fontFamily: 'Helvetica'
            }}>
              Word not found!!
            </Typography>
          )
        }

      </Container>

    </div>
  )
}

export async function getServerSideProps(context: any) {

  try {

    const { slug } = context.params;
    console.log('slug', slug);
    const response = await wordService.get(slug);
    const images = await imageSearch.getImages(slug)

    return {
      props: {
        wordByProps: response,
        images: images
      }
    }
  } catch (e: any) {
    console.log(e.message);
    toast.error('Erro ao buscar palavra.');
    return {
      props: {}
    }
  }



}
