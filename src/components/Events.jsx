const events = [
  {
    id: 1,
    title: 'Festat e Kreativitetit dhe Argëtimit',
    description: 'Festat janë një mundësi e shkëlqyer për të festuar mësimet dhe arritjet e fëmijëve në një atmosferë të ngrohtë dhe argëtuese. Me lojëra, këngë, balona dhe aktivitete krijuese si vizatimi dhe piktura,',
    imageUrl: 'https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3',
  },
  {
    id: 2,
    title: 'Ekskursione nëpër Muzeume dhe Parqe',
    description: 'Çdo fëmijë do të ndjehet si një zbulues i historisë në ekskursionet nëpër muze! Kjo aktivitet do ti njohë ata me pasuritë kulturore dhe historike, duke zhvilluar kuriozitetin dhe dashurinë për artin dhe shkencën.',
    imageUrl: 'https://media.istockphoto.com/id/165974884/photo/museum-display-cabinet.webp?a=1&b=1&s=612x612&w=0&k=20&c=tdjHWvNKMoLMX5iWZijKiQzAj9teLC5cCLOfBP82tGA=',
  },
  {
    id: 3,
    title: 'Kampi Veror "Aventura e Mësimit"',
    description: 'Ky kamp veror ofron një mundësi të shkëlqyer për fëmijët për të kaluar një verë të mbushur me aktivitete argëtuese dhe edukative. Nga lojërat në natyrë, te mësimi i aftësive të reja si piktura, kërcimi dhe ndihma e parë, Kampi Veror "Aventura e Mësimit" është vendi ku fëmijët mund të zhvillojnë krijimtarinë dhe të bëhen më të fortë fizikisht dhe emocionalisht.',
    imageUrl: 'https://media.istockphoto.com/id/505936027/photo/children-having-sack-race-at-campsite.webp?a=1&b=1&s=612x612&w=0&k=20&c=OxegFDFjRhtuyL18a3FDdZcnM5cIuFkCt-rq70IVDOU=',
  },  
  {
    id: 4,
    title: 'Eksplorim dhe Lojëra në Natyrë',
    description: 'Ky aktivitet është i përkryer për fëmijët që duan të eksplorojnë dhe të zbulojnë bukurinë e natyrës. Me aktivitete të tilla si ndërtimi i strehimores, kërkimi për thesar, dhe lojëra të ekipit, Eksplorimi dhe Lojëra në Natyrë i ndihmon fëmijët të zhvillojnë aftësi bashkëpunimi dhe orientimi, ndërkohë që argëtohen në një mjedis të sigurt dhe natyral.',
    imageUrl: 'https://media.istockphoto.com/id/2152720090/photo/happy-friends-children-and-running-with-grass-field-in-nature-for-fun-playful-day-or-sunshine.webp?a=1&b=1&s=612x612&w=0&k=20&c=vKwn0-LHYDDojbx3-knzPw5CMBLGGQ0Omnf-wG-Mx6M=',
  },
];

export default function Events() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Evente</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Bashkohuni me ne për aktivitete emocionuese që janë krijuar për zhvillimin dhe argëtimin e fëmijës suaj.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <div className="max-w-xl">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  {event.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
