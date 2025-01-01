import TestimonialCard from './TestimonialCard';

export default function TestimonialList() {
  const testimonials = [
    {
      id: 1,
      name: 'Emily Thompson',
      role: 'Parent',
      content: "The teachers are amazing and my daughter loves coming here every day!",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Parent',
      content: "We have seen incredible growth in our son's social skills and learning.",
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Parents Say
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hear from our community of parents and guardians.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}