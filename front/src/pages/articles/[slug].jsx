import React, { useEffect } from 'react'

import Head from 'next/head'
import qs from 'qs';

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import {fetchCMS} from '@/lib/cms'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.id}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        {/*<Card.Description>{article.body}</Card.Description>*/}
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.publishedAt}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.publishedAt)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ article }) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta
          name="description"
          content={article.body}        
      />
      </Head>
      <SimpleLayout
        title={article.title}
        intro={article.body}
      >
      <div className='flex justify-center items-center'>
      <img className='w-1/3 rounded-lg' src={`http://localhost:1337${article.image.data.attributes.url}`}/>
      </div>
      </SimpleLayout>
      </>
  )
}
export async function getServerSideProps({ locale, query }) {
    const cmsQuery = qs.stringify(
      {
        filters: {
          slug: {
            $eq: query.slug,
          },
        },
        populate: [
          "image",
   
        ],
      },
      {
        encodeValuesOnly: true,
      }
    );
  
    const result = await fetchCMS(`/api/articles?${cmsQuery}`)
    console.log('dataYOYO =>',result)
    const [{ attributes, id }] = result;
    return {
      props: {
        article: attributes,
      },
    }
  }
  
