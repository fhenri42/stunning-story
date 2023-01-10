import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';

export default function StroyCard(props) {
  const { story } = props;
  const { data: session, status } = useSession();
  const author = story?.author?.data.attributes;
  console.log(author);
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg  w-full relative">
      {story.publishedAt ? (
        <p className="bg-green-400 px-4 rounded-xl absolute top-3 right-3">Live</p>

      ) : (
        <p className="bg-gray-400 px-4 rounded-xl absolute top-3 right-3">Draft</p>
      )}
      <img className="h-64 w-full object-cover" src={story.cover} alt="" />
      <div className="flex flex-col  bg-white p-6 h-[300px]">
        <div className="flex flex-row">
          {story.tags?.split(',').map((tag) => (
            <p className="text-sm font-medium text-indigo-600 mr-2 capitalize">
              {tag}
            </p>
          ))}
        </div>

        <p className="text-xl font-semibold text-gray-900">{story.title}</p>
        <p className="mt-3 text-base text-gray-500 text-ellipsis line-clamp-4">{story.description}</p>
        <div className="mt-auto flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{author?.username}</span>
            <img className="h-10 w-10 rounded-full" src={author?.image} alt="" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {author?.username}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={
                dayjs(story.publishedAt || story.cretedAt).format('DD/MM/YYYY')
                }
              >

                {
                         dayjs(story.publishedAt || story.cretedAt).format('DD/MM/YYYY')
                }

              </time>
              <span aria-hidden="true">&middot;</span>
              <span>
                30 minute play
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
