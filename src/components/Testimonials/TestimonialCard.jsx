export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{testimonial.name}</h4>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700">{testimonial.content}</p>
    </div>
  );
}