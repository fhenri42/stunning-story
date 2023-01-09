import { useSession } from 'next-auth/react';

export default function StroyCard(props) {
  const { story } = props;
  const { data: session, status } = useSession();

  const author = session?.user;
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img className="h-64 w-full object-cover" src={story.storyGraph[0].bgUrl} alt="" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            {story.tags}
          </p>
          <p className="text-xl font-semibold text-gray-900">{story.title}</p>
          <p className="mt-3 text-base text-gray-500">{story.description}</p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{author?.name}</span>
            <img className="h-10 w-10 rounded-full" src={author?.image} alt="" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {author?.name}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={story.publishedAt}>{story.publishedAt}</time>
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
