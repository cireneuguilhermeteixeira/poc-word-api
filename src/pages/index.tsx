import Head from 'next/head'
import {  Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Home() {

  const [search, setSearch] = useState('');
  const router = useRouter();




  useEffect(() => {
    if (search) {
      router.push(`/${search}`);
    }


  }, [search])


  return (
    <div>
      <Head>
        <title>Words API Integration </title>
        <meta name="description" content="Todos app with Material UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setSearch={setSearch} />

      <Container sx={{
        minHeight: '60rem'
      }}>

        <Typography sx={{
          padding: 10,
          fontFamily: 'Helvetica'
        }}>
          Type your word above!!
        </Typography>

      </Container>

    </div>
  )
}
