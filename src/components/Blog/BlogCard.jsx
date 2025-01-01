import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article className="flex flex-col items-start">
      <div className="relative w-full">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
        />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={post.date} className="text-gray-500">{post.date}</time>
          <span className="text-gray-500">{post.author}</span>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            <Link to={`/blog/${post.id}`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{post.excerpt}</p>
        </div>
      </div>
    </article>
  );
}