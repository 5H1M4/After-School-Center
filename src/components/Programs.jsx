import { CheckIcon } from '@heroicons/react/24/outline'

const programs = [
  {
  name: 'Programi Bazik',
  price: '150€',
  description: 'për nxënësit e shkollës fillore që kanë nevojë për mbështetje bazike pas-shkollore.',
  features: [
    'Ndihmë në detyrat e shtëpisë',
    'Kohë studimi e mbikëqyrur',
    'Mbështetje për lëndët bazike',
    'Snacks të shëndetshme të ofruara',
    'Mjedis i sigurt dhe mbështetës',
    'E hënë deri të premte (2-4 PM)',
  ],
},

{
    name: 'Shkëlqimi Akademik',
    price: '250€',
    description: 'Program i plotë mbështetjeje akademike dhe pasuruese.',
    features: [
      'Të gjitha veçoritë bazike të përfshira',
      'Mësimdhënie e avancuar në të gjitha lëndët',
      'Përgatitje për provime',
      'Zhvillim aftësish për studim',
      'Raporte të progresit',
      'Orar i zgjatur (2-6 PM)',
      'Mësim në grupe të vogla',
    ],
  },
  {
    name: 'Zhvillimi i Plotë',
    price: '350€',
    description: 'Program zhvillimi holistik që kombinohet me aktivitete akademike dhe jashtëshkollore.',
    features: [
      'Të gjitha veçoritë e Shkëlqimit Akademik',
      'Aktivitete artizanale dhe krijuese',
      'Aktivitete sportive dhe fizike',
      'Mësime gjuhe',
      'Klasat e muzikës dhe vallëzimit',
      'Përkujdesje të plotë pasdite (2-8 PM)',
      'Aktivitete gjatë fundjavës të përfshira',
      'Akses në programet e pushimeve',
    ],
  }
  
]

export default function Programs() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Programet Tona</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Zgjidhni programin pas-shkollor që i përshtatet nevojave të fëmijës suaj. Të gjithë programet përfshijnë mbikëqyrje profesionale dhe një mjedis mbështetës për mësim.          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="grid max-w-lg gap-8 mx-auto grid-cols-1 lg:max-w-none lg:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.name}
                className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">{program.name}</h3>
                    <p className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Monthly
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{program.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{program.price}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {/*<a
                  href="#"
                  className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register for {program.name}
                </a>*/}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 