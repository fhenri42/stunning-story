import { useEffect, useState } from 'react';
import Answer from '@components/Answer';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Question from '@components/Question';
import qs from 'qs';
import { fetchCMS } from '@lib/cms';
import Link from 'next/link';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Button from '@components/Button';
import { useRouter } from 'next/router';

export default function Page(props: any) {
  const router = useRouter();
  const variables = useStoreState((state) => state.variables);
  const setVariables = useStoreActions((actions) => actions.setVariables);
  const { page } = props;

  console.log('DID NOT RERERANDE =>', variables);
  return (
    <div
      className="w-screnn h-screen flex flex-col items-center justify-between"
      style={{
        backgroundImage: `url(http://localhost:1337${page?.background.data?.attributes?.url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div />
      {variables.length > 0 && (

      <div className="rounded-lg border-[#eaeaea] border-2 p-5 bg-black bg-opacity-60 absolute top-5 left-5">
        { variables.map((v) => (
          <p>
            {Object.keys(v)[0]}
            {': '}
            {v[Object.keys(v)[0]]}
          </p>
        ))}
      </div>
      )}
      <div className="absolute top-3 right-3">

        <Button
          label="Quit"
          type="danger"
          size="small"
          onClick={() => {
            router.replace('/');
          }}
        />
      </div>
      <Question text={page.text} className="w-1/2">
        {page.text}
      </Question>
      <div className="flex flex-row w-full bottom-0 bg-black bg-opacity-60 p-10 ">

        <div className="flex flex-row w-full px-3 justify-evenly flex-wrap">
          {page.answers.map((a: any) => (
            <Link
              className="w-[47%]"
              href={`/story/${a.go_to_page?.data?.attributes?.slug}`}
              key={a.id}
            >

              <Answer
                onClick={() => {
                  if (a.variable) {
                    const key = Object.keys(a.variable)[0];
                    const index = variables.length <= 0 ? -1
                      : variables.findIndex((i) => Object.keys(i)[0] === key);
                    if (index !== -1) {
                      const newVariables = [...variables];
                      newVariables[index][key] = a.variable[key];
                      setVariables([...newVariables]);
                      return;
                    }
                    setVariables([...variables, a.variable]);
                  }
                }}
              >
                {a.answer}
              </Answer>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const cmsQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: query.slug,
        },
      },
      populate: [
        'background',
        'answers',
        'answers.go_to_page',
        'answers.go_to_page.slug',

      ],
    },
    {
      encodeValuesOnly: true,
    },
  );
  console.log(query);
  const result = await fetchCMS(`/api/pages?${cmsQuery}`);
  console.log('result =>', result);

  const [{ attributes }] = result;
  return {
    props: {
      page: attributes,
    },
  };
}
