import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import fs from 'fs';
import { join } from 'path';
import Card from '../components/Card';
import { Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ todos } : {todos: Array<any>}) {
  return (
    <div>
      <Head>
        <title>Words API Integration </title>
        <meta name="description" content="Todos app with Material UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container>
        {
          todos.length > 0 ? (
            todos.map((todo, index) => (
              <Grid key={index} marginBottom={4} marginTop={4}>
                <Card todo={todo} key={index} />
              </Grid>
            ))
          ) : (
            <p>
              No saved todos yet!!
            </p>
          )
        }
      </Container>
    </div>
  )
}

export async function getServerSideProps() {
  // get all the todos.
  let todos_path = join(__dirname, '..', '..', '..', 'data', 'todos.json');
  let todos = await fs.promises.readFile(todos_path, 'utf8');
  return {
    props: {
      "todos": JSON.parse(todos)
    }
  }
}
