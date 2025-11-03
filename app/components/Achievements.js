import Image from 'next/image';
import Link from 'next/link';
import { achievements } from '../data/achievements';

export default function Achievements() {
  return (
    <section className="my-20">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12">
        <header className="text-center space-y-4">
          <span className="inline-flex items-center px-4 py-2 text-sm font-semibold uppercase tracking-wider text-purple-600 bg-purple-100/70 rounded-full">
            Achievements & Journey
          </span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Milestones
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A snapshot of recognitions, global competitions, and community impact moments that shaped my path.
          </p>
        </header>

        <div className="mt-12 space-y-10">
          {achievements.map((achievement) => (
            <article
              key={achievement.title}
              className="grid gap-8 rounded-3xl border border-white/60 bg-white/90 shadow-xl p-6 md:p-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-purple-600">
                  <span className="inline-flex items-center rounded-full bg-purple-100/70 px-4 py-1">
                    {achievement.organization}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100/70 px-4 py-1 text-blue-600">
                    {achievement.location}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-cyan-100/70 px-4 py-1 text-cyan-600">
                    {achievement.period}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.summary}</p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {achievement.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/achievements/${achievement.proofs[0]}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-center">
                {achievement.proofs.slice(0, 4).map((proof) => (
                  <Link
                    key={proof}
                    href={`/achievements/${proof}`}
                    target="_blank"
                    className="relative block aspect-square overflow-hidden rounded-2xl border border-purple-100 shadow-md transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={`/achievements/${proof}`}
                      alt={`${achievement.title} proof`}
                      fill
                      sizes="(min-width: 768px) 20vw, 40vw"
                      className="object-cover"
                      priority={false}
                    />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
