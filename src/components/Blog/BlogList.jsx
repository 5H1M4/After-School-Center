import BlogCard from './BlogCard';

export default function BlogList() {
  const posts = [
    {
      id: 1,
      title: 'The Importance of Early Childhood Education',
      date: '2023-12-01',
      author: 'Sarah Johnson',
      excerpt: 'Discover why the early years are crucial for child development...',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9'
    },
    {
      id: 2,
      title: 'Learning Through Play: Our Approach',
      date: '2023-12-05',
      author: 'Michael Chen',
      excerpt: 'How we incorporate play-based learning in our curriculum...',
      imageUrl: 'https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3'
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Updates</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stay informed about our activities and educational insights.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}