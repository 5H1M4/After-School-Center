import { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Aty Ku Mësimi dhe Argëtimi Bashkohen
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Mirësevini në qendrën pas shkolle Ameli, ku çdo hap është një mundësi për të mësuar, zbuluar dhe rritur. Në një ambient të ngrohtë dhe mbështetës, ne ndërthurim lojën dhe edukimin për të krijuar përvoja që zgjojnë kuriozitetin dhe ndërtojnë besimin tek vetja. Çdo ditë këtu është një hap drejt formimit të individëve të pavarur, kreativë dhe të përgatitur për sfidat e së ardhmes. Qendra Ameli nuk është thjesht një hapësirë edukimi — është një vend ku fëmijët lulëzojnë.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Regjistrohu tani
              </button>
              <Link
                to="/programs"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Zbulo programet tona <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Happy children playing and learning"
          />
        </div>
      </div>

      <RegistrationModal 
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}