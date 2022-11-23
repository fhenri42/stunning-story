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
        <Card.Title href={`/articles/${article.slug}`}>
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

export default function ArticlesIndex({ articles }) {
console.log('articles =>',articles)

  return (
    <>
      <Head>
        <title>Articles</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Live news, investigations, opinion, photos and video by the AI of The AI Tribune more than 150 countries around the world."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article.attributes} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getServerSideProps({locale}) {
  const query = qs.stringify(
    {
      locale: locale === 'fr' ? 'fr-FR' : 'en-US',
      populate: [
        'image'
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const data = await fetchCMS(`/api/articles?${query}`)
  console.log('dataYOYO =>',data)
  
  return {
    props: {
      articles: data,
    },
  }
}

//https://twitter.com/Reuters
//bloomberg
//Comparre la source true story 
